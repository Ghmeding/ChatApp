package chatService

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("size of connection pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "New user joined..."})
			}
			break
		case client := <-pool.Unregister:
			message := Message{
				Type: 0,
				User: client.ID,
				Body: "client disconnected",
			}
			go func() {
				pool.Broadcast <- message
			}()
			delete(pool.Clients, client)
			fmt.Println("size of connection pool: ", len(pool.Clients))
			break

		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients")
			for client, _ := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					break
				}
			}
		}
	}
}

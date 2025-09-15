import React, {FC, useEffect, useState} from 'react';
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory/ChatHistory';
import ChatInput from './components/ChatInput/ChatInput';
import {connect, sendMsg} from './api';

interface AppState{
    chatHistory: any[];
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        chatHistory: [],
    });

    //componentDidMount
    useEffect(() => {
        connect((msg: Object) => {
            console.log("New message: " + msg);
            setState((prevState => ({
                ...prevState,
                chatHistory: [...prevState.chatHistory, msg]
            })))
            console.log(state);
        });
    });

    const send = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            sendMsg(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    };

    return(
        <div className='App'>
            <Header/>
            <ChatHistory chatHistory={state.chatHistory}></ChatHistory>
            <ChatInput send={send}/>
        </div>
    );
}   

export default App;
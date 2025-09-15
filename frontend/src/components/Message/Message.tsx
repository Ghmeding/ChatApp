import React from "react";
import './Message.scss'

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className='Message'>
        <span>{message}</span>
    </div>
  );
};

export default Message;
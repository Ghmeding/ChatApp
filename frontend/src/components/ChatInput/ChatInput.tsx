import React, {FC} from 'react';
import './ChatInput.scss'

interface ChatInputProps {
    send: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ send }) => { 
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { 
        if(event.key === 'Enter'){
            send(event);
        }
    };

    return (
        <div className='ChatInput'>
            <input 
                onKeyDown={handleKeyDown} 
                placeholder="Type a message... Hit Enter to send"
            />
        </div>
    );
};

export default ChatInput;
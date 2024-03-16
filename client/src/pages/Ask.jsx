import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import '@chatscope/chat-ui-kit-react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const Ask = ({name, setName}) => {
    
    const [prompt, setPrompt] = useState('');
    const [storedName, setStoredName] = useState('');
    const [showResponse, setShowResponse] = useState(false);
    const [assistantResponse, setAssistantResponse] = useState(false);
    const [typing, setTyping] = useState(false);

    // retrieve name from local storage 
    const [messages, setMessages] = useState([
        {
            message: "Hello! How can I help you today?",
            sender: "ChatGPT"
        }
    ])

    useEffect(() => {
        const savedName = localStorage.getItem('savedName');
        if (savedName !== null) {
            setStoredName(savedName);
        }
    }, [messages]); 

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage]; // all the old messages + new nessages
        // update message state
        setMessages(newMessages);
        // set typing indicator (model is typing)
        setTyping(true); 
        //process message to chatGPT
        await processMessage(newMessages);
    }

    async function processMessage(chatMessages) {
        let processedApiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            } return {
                role: role,
                content: messageObject.message,
                //sentTime: new Date()
            }
        });

        const systemMessage = {
            role: "system",
            content: "Explain all concepts clearly and concisely."
        }
        const apiRequestBody = {
            "messages": [
                systemMessage,
                ...processedApiMessages
            ]
        }
    
        await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) => {
            console.log("Data", data);
            setMessages(
                [...chatMessages, {
                    message: data.response,
                    sender: "ChatGPT"
                }]);
            setTyping(false);
        });

        console.log("Messages:", messages);

        await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages),
        });
    }

    return (
    <section style={{ position:"relative", height: "500px" }}>
        <MainContainer>
            <ChatContainer>
                    <MessageList
                        scrollBehavior='smooth'
                        typingIndicator={typing ? <TypingIndicator content="typing" /> : null}>
                    {messages.map((message, i) => (
                        <Message
                        key={i}
                        model={{
                            role: message.sender === "ChatGPT" ? "assistant" : "user",
                            message: message.message,
                            //sentTime: new Date(),
                        }}
                        />
                    ))}
                </MessageList>
                <MessageInput placeholder='Ask me anything' onSend={(message) => handleSend(message)}/>
            </ChatContainer>
        </MainContainer>
    </section>
    )
};

export default Ask;
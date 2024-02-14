import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const Ask = ({name, setName}) => {
    
    const [prompt, setPrompt] = useState('');
    const [storedName, setStoredName] = useState('');

    // retrieve name from local storage 
    useEffect(() => {
        const savedName = localStorage.getItem('savedName');
        if (savedName !== null) {
            setStoredName(savedName);
        }
    }, []); 

    const submitPrompt = () => {
        // use the userName and prompt variables to interact with the OpenAI API
        // make API call to send prompt and get a response.

        // For demonstration purposes, let's just log the values for now:
        console.log('Name:', name);
        console.log('Prompt:', prompt);
    };


    return (
    <section className="grid place-items-center justify-items-center mt-24">
		<div className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-8 mb-4 shadow-lg mx-auto text-center'>
            <div>Hello, {storedName}. How can I help you today?</div>
        </div>  
        <div>
            <input
                className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-2 shadow-lg mx-auto text-center'
                placeholder="ask me anything"
                name="prompt"
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                />
           <IconButton className="rounded hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10" onClick={submitPrompt}>
                <FontAwesomeIcon
                    icon={faArrowAltCircleUp} className="text-white size-5 mt-2 ml-3"/>
            </IconButton>
        </div>    
        <div className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-3 m-4 shadow-lg mx-auto text-center'>
            <div>response</div>
        </div> 
    </section>
    )
};

export default Ask;
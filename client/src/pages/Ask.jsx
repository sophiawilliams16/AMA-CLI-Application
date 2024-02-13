import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const Ask = ({userName, setUserName}) => {
    const [prompt, setPrompt] = useState('');

    const submitPrompt = () => {
        // use the userName and prompt variables to interact with the OpenAI API
        // make API call to send prompt and get a response.

        // For demonstration purposes, let's just log the values for now:
        console.log('User Name:', userName);
        console.log('User Prompt:', prompt);
    };


    return (
    <section className="grid place-items-center justify-items-center mt-24">
		<div className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-8 mb-4 shadow-lg mx-auto text-center'>
            <div>Good evening, {userName}. How can I help you today?</div>
        </div>    
            <input
                className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-2 shadow-lg mx-auto text-center'
                placeholder="ask me anything"
                name="prompt"
                id="prompt"
                value={prompt}
                onChange={submitPrompt}
                required
            />
           <IconButton variant="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
                <FontAwesomeIcon
                    icon={faArrowAltCircleUp} className="text-white size-5 mt-2 ml-3" onClick={submitPrompt} />
            </IconButton>
    </section>
    )
};

export default Ask;
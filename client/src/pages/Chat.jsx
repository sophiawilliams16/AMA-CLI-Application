import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
    return (
    <section className="grid place-items-center justify-items-center mt-24">
		<div className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-8 mb-4 shadow-lg mx-auto text-center'>
            <div>Good {time}, {userName}. How can I help you today?</div>
            <input
                className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-2 shadow-lg mx-auto text-center'
                placeholder="ask me anything"
                name="prompt"
                id="prompt"
                value={prompt}
                onChange={handleNameChange}
                required
            />
           <IconButton variant="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
                <FontAwesomeIcon
                    icon={faArrowAltCircleUp} className="text-white size-5 mt-2 ml-3" onClick={submitPrompt} />
            </IconButton>
        </div>    
    </section>
    )
};

export default Chat;
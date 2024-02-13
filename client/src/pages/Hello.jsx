import { useState, useEffect, useHistory } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Hello = () => {
	const [userName, setUserName] = useState('');
	
	const navigate = useNavigate();

    useEffect(() => {
        const savedUserName = localStorage.getItem('savedUserName');
        if (savedUserName !== null) {
            setUserName(savedUserName);
        }
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setUserName(value);
    };

    const saveUserName = () => {
        try {
            localStorage.setItem('savedUserName', userName);
			console.log("Name saved successfully");
			navigate('/ask');
        } catch (error) {
			console.error('Error saving username to local storage:', error);
        }
    };

    return (
        <section className="grid place-items-center justify-items-center mt-24">
            <div className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-8 mb-4 shadow-lg mx-auto text-center'>
                <h1>Welcome to Gravity! What's your name?</h1>
            </div>
            <div>
                <input
                    className='max-w-xs bg-white bg-opacity-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-2 shadow-lg mx-auto text-center'
                    placeholder="enter your first name"
                    name="name"
                    id="name"
                    value={userName}
                    onChange={handleNameChange}
                    required
                />
                <IconButton variant="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10" onClick={saveUserName}>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} className="text-white size-5 mt-2 ml-3" />
                </IconButton>
            </div>
        </section>
    );
};

export default Hello;
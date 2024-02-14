import { useState, useEffect, useHistory } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Hello = () => {
	const [name, setName] = useState('');
	
	const navigate = useNavigate();

    useEffect(() => {
        const savedName = localStorage.getItem('savedName');
        if (savedName !== null) {
            setName(savedName);
        }
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const saveName = () => {
        try {
            localStorage.setItem('savedName', name);
			console.log("Name saved successfully");
			navigate('/ask');
        } catch (error) {
			console.error('Error saving name to local storage:', error);
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
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <IconButton className="rounded hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10" onClick={saveName}>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} className="text-white size-5 mt-2 ml-3" />
                </IconButton>
            </div>
        </section>
    );
};

export default Hello;

    const Intro = () => {
        return (
            <section className="grid grid-cols-6 gap-4">
                <div className="col-start-2 col-span-4">
                    <div>
                        <h1>Welcome to Gravity</h1>
                    </div>
                    <div>
                        <input
                            className=""
                            placeholder="enter your first name"
                            name="name"
                            id="name"
                            value={userName}
                            required
                        />
                    </div>
                     {/* Button to save user's name */}
                    <button onClick={saveUserName}>Save Name</button>

                    {/* Display the saved user's name */}
                    <div>Saved Name: {userName}</div>
                </div>
            </section>
        );
    };


export default Intro;

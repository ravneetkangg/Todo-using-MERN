import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ email: "", username: "", password: "" });

    function handleChange(event) {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/register`, inputs);
            if (response.data.message === "User already exists") {
                alert(response.data.message);
            } else {
                alert("Registration successful");
                setInputs({ email: "", username: "", password: "" });
                navigate('/signin');
            }
        } catch (error) {
            console.error("There was an error registering:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={inputs.email}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={inputs.username}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={inputs.password}
                        required
                    />
                </div>
                <button className="btn btn-primary" onClick={submit}>Sign Up</button>
            </div>
        </div>
    );
}

export default Signup;

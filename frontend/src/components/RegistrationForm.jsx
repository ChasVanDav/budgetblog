// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', { username, email, password });
            console.log(response.data);
        } catch (error) {
            console.error('Registration failed', error);
        }
        onClose();
    };

    return (
        <div className="modal">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
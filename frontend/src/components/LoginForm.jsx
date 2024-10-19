import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', { email, password });            console.log(response.data);
        } catch (error) {
            console.error('Login failed', error);
        }
        onClose();
    };

    return (
        <div className="modal">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default LoginForm;

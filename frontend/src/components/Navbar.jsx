// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogin, onRegister }) => {
    return (
        <nav>
            <h1>Budget Blog</h1>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/budget">Budget</Link>
                </li>
                <li>
                    <Link to="/spending">Spending</Link>
                </li>
                <li>
                    <button onClick={onLogin}>Login</button>
                </li>
                <li>
                    <button onClick={onRegister}>Register</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

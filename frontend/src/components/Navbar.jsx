import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentTripDestination, setToken, token }) => {
    const [isWeatherModalOpen, setWeatherModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken();
        navigate('/login'); // Redirect to login after logout
    };

    const openWeatherModal = () => {
        if (!currentTripDestination) {
            alert("Please set a trip destination to get the weather.");
            return;
        }
        setWeatherModalOpen(true);
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {token ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/budgets">Budgets</Link>
                    <Link to="/spendings">Spendings</Link>
                    
                    <button onClick={openWeatherModal}>Get Weather</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;

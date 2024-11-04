import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken, token }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/">Dashboard</Link>
            {token ? (
                <>
                    <Link to="/trips">My Trips</Link> 
                    <Link to={`/budget/${1}`}>My Budget</Link>
                    <Link to={`/spendings/${1}`}>My Spending</Link>
                    <Link to="/new-trip">New Trip</Link>
                    <Link to={`/new-spending/${1}`}>New Spending</Link>
                    <Link to="/profile">Profile</Link>
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


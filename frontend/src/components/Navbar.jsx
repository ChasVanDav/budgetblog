import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken, token }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from storage
        setToken(null); // Update the app's state to reflect logout
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img 
                    src="/bblogo.png" 
                    alt="cute cartoon character flying in the clouds" 
                    className="navbar-logo" 
                    style={{ height: '120px', marginRight: '10px' }} 
                />
            </Link>
            {token ? (
                // Links displayed only when the user is logged in
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
                // Links for unauthenticated users
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;


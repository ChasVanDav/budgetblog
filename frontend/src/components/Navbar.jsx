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
                    <Link to="/profile">Profile</Link>
                    <Link to="/budgets/budget/1">Budget</Link> 
                    <Link to="/spendings/spending/1">Spending</Link>
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



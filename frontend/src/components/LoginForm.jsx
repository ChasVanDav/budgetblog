import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { email, password });
      console.log('Login response:', response);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        navigate('/');
      } else {
        console.error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} aria-labelledby="loginHeading">
      <h1 id="loginHeading">Login</h1>

      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email"
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        aria-required="true"
      />
      <br />
      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        id="password"
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        aria-required="true"
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
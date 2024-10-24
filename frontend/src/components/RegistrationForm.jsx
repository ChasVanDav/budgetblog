import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeCountry, setHomeCountry] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [homeCurrency, setHomeCurrency] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/register', {
        username,
        email,
        password,
        home_country: homeCountry,
        home_city: homeCity,
        home_currency: homeCurrency,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Home Country" value={homeCountry} onChange={(e) => setHomeCountry(e.target.value)} required />
      <input type="text" placeholder="Home City" value={homeCity} onChange={(e) => setHomeCity(e.target.value)} required />
      <input type="text" placeholder="Home Currency" value={homeCurrency} onChange={(e) => setHomeCurrency(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;

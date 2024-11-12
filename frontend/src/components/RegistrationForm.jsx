import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  // State variables to store user input for registration fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeCountry, setHomeCountry] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [homeCurrency, setHomeCurrency] = useState('');
  
  const navigate = useNavigate(); // For redirecting after successful registration

  // Form submit handler: posts user data to the server
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request with registration details
      await axios.post('/users/register', {
        username,
        email,
        password,
        home_country: homeCountry,
        home_city: homeCity,
        home_currency: homeCurrency,
      });
      navigate('/login'); // Redirect to login page on success
    } catch (error) {
      console.error('Registration failed:', error); // Log any errors
    }
  };

  // Render form with labeled inputs for each registration field
  return (
    <form onSubmit={handleRegister} aria-labelledby="registerHeading">
      <h1 id="registerHeading">Register</h1>

      <label htmlFor="username">Username</label>
      <input 
        type="text" 
        id="username"
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
        aria-required="true"
      />
      <br />
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
      <label htmlFor="homeCountry">Home Country</label>
      <input 
        type="text" 
        id="homeCountry"
        placeholder="Home Country" 
        value={homeCountry} 
        onChange={(e) => setHomeCountry(e.target.value)} 
        required 
        aria-required="true"
      />
      <br />
      <label htmlFor="homeCity">Home City</label>
      <input 
        type="text" 
        id="homeCity"
        placeholder="Home City" 
        value={homeCity} 
        onChange={(e) => setHomeCity(e.target.value)} 
        required 
        aria-required="true"
      />
      <br />
      <label htmlFor="homeCurrency">Home Currency</label>
      <input 
        type="text" 
        id="homeCurrency"
        placeholder="Home Currency" 
        value={homeCurrency} 
        onChange={(e) => setHomeCurrency(e.target.value)} 
        required 
        aria-required="true"
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
// Import necessary tools and styles
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

// Component to fetch and display weather info
const Weather = () => {
  // State variables for user input, weather data, loading, and errors
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get weather data when the form is submitted
  const handleGetWeather = async (event) => {
    event.preventDefault(); // Stops page refresh on form submit

    // Simple validation to check if a city name is entered
    if (!city) {
      setError('Please enter a city.');
      return;
    }

    // Clear previous errors and set loading state
    setLoading(true);
    setError(null);

    try {
      // Fetch weather data for the specified city
      const response = await axios.get(`http://localhost:5000/api/weather?city=${encodeURI(city)}`);
      console.log('Weather API response:', response.data); // For debugging

      // Check if the response was successful
      if (response.data.cod === 200) {
        setWeather(response.data); // Store weather data
      } else {
        throw new Error(response.data.message); // Trigger error if response is unsuccessful
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      setError('Could not fetch weather data. Please try again later.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={handleGetWeather}>
        <label htmlFor="city">Enter City Name</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g., 'Paris' or 'New York City' "
          required
          aria-required="true"
        />
        <button type="submit">Get Weather</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div>
          <img
            id="icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`Icon representing ${weather.weather[0].description}`}
          />
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h2>{weather.main.temp.toFixed(0)}°F</h2>
          <h2>{weather.weather[0].description}</h2>
          <h2>Humidity: {weather.main.humidity}%</h2>
          <h2>Wind Speed: {weather.wind.speed} m/s</h2>
        </div>
      )}
    </div>
  );
};

export default Weather;

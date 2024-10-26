import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetWeather = async (event) => {
    event.preventDefault();

    if (!city) {
      setError('Please enter a city.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${encodeURI(city)}`);
      console.log('Weather API response:', response.data); 
      
      if (response.data.cod === 200) {
        setWeather(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      setError('Could not fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={handleGetWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
          required
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
            alt={`An icon representing ${weather.weather[0].description}`}
          />
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h2>Temp: {weather.main.temp.toFixed(2)}°F</h2>
          <h2>Condition: {weather.weather[0].description}</h2>
          <h2>Humidity: {weather.main.humidity}%</h2>
          <h2>Wind Speed: {weather.wind.speed} m/s</h2>
        </div>
      )}
    </div>
  );
};

export default Weather;

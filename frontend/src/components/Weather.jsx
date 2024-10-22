import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [destination, setDestination] = useState('');
  const [weather, setWeather] = useState(null);

  const handleGetWeather = async () => {
    try {
      const response = await axios.get(`/api/weather?destination=${destination}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    }
  };

  return (
    <div>
      <h2>Today's Weather</h2>
      <input
        type="text"
        placeholder="Enter Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleGetWeather}>Get Weather</button>
      {weather && (
        <div>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;


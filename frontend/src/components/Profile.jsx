import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null); // Holds the user's profile data

  useEffect(() => {
    // Function to fetch user profile from backend
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Gets the token for authorization
      try {
        // API call to fetch profile data with the token
        const response = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data); // Store fetched profile data in state
      } catch (error) {
        console.error('Failed to fetch profile:', error); // Log if any error occurs
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {/* Display a static image for the profile page */}
      <img src="/blackwomantraveling.jpg" alt="image of a fashionable black woman vacationing at a hot weather destination" style={{ width: '20%', height: 'auto', marginBottom: '10px' }} />

      {/* Display user's profile data if it is loaded */}
      {user ? (
        <div>
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Home Country: {user.home_country}</p>
          <p>Home City: {user.home_city}</p>
          <p>Currency: {user.home_currency}</p>
        </div>
      ) : (
        <p>Loading profile...</p> // Loading message while fetching
      )}
    </div>
  );
};

export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <img src="/blackwomantraveling.jpg" alt="image of a fashionable black woman vacationing at a hot weather destination" style={{ width: '20%', height: 'auto', marginBottom: '10px' }} />

      {user ? (
        <div>
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Home Country: {user.home_country}</p>
          <p>Home City: {user.home_city}</p>
          <p>Currency: {user.home_currency}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;


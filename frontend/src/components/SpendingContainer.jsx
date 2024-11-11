import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SpendingContainer = () => {
  const { tripId } = useParams();
  const [spendings, setSpendings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpendings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/spendings/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpendings(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch spendings:', error);
        setError('Could not load spending data. Please try again later.');
      }
    };

    fetchSpendings();
  }, [tripId]);

  return (
    <div>
        {/* <img src="/shoppingbags.jpg" alt="image of shopping bags" style={{ width: '30%', height: 'auto', marginBottom: '10px' }} /> */}
      {error ? (
        <p className="error">{error}</p>
      ) : (
        spendings.map((spending) => (
          <div key={spending.spend_id} className="spending-item">
            <h4>Category: {spending.category}</h4>
            <h2>Amount: ${parseFloat(spending.amount).toFixed(2)}</h2>
            
            <p>Timestamp: {new Date(spending.timestamp).toLocaleString()}</p>
            <p>Date: {new Date(spending.date).toLocaleDateString()}</p>
            <p>Currency: {spending.currency}</p>
            <h3>Note: {spending.note}</h3>
            <p>Location: {spending.location}</p>
            {/* <p>Rating: {spending.star_rating} out of 5</p> */}
            {/* {spending.photo && (
              <img src={spending.photo} alt={spending.note} className="spending-photo" />
            )} */}
          </div>
        ))
      )}
    </div>
  );
};

export default SpendingContainer;


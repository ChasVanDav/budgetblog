import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpendingContainer = () => {
  const [spendings, setSpendings] = useState([]);

  useEffect(() => {
    const fetchSpendings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/spendings/spending', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSpendings(response.data);
      } catch (error) {
        console.error('Failed to fetch spendings:', error);
      }
    };

    fetchSpendings();
  }, []);

  return (
    <div>
      <h2>My Spending</h2>
      {spendings.map(spending => (
        <div key={spending.spend_id}>
          <h3>Category: {spending.category}</h3>
          <p>Amount: {spending.amount}</p>
          <p>Note: {spending.note}</p>
        </div>
      ))}
    </div>
  );
};

export default SpendingContainer;

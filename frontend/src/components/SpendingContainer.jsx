import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SpendingContainer = () => {
  const { budgetId } = useParams();
  const [spendings, setSpendings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpendings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/spendings/spending/${budgetId}`, {
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
  }, [budgetId]);

  return (
    <div>
      <h2>My Spending</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        spendings.map((spending) => (
          <div key={spending.spend_id} className="spending-item">
            <h3>Category: {spending.category}</h3>
            <p>Amount: ${parseFloat(spending.amount).toFixed(2)}</p>
            <p>Note: {spending.note}</p>
            {spending.photo && (
              <img src={spending.photo} alt={spending.note} className="spending-photo" />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SpendingContainer;
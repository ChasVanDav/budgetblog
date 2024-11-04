import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BudgetContainer = () => {
  const { tripId } = useParams();
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found");
        setError('Authentication token is missing.');
        return;
      }

      try {
        const response = await axios.get(`/budgets/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBudgets(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
        setError('Could not load budget data. Please try again later.');
      }
    };

    if (tripId) {
      fetchBudgets();
    }
  }, [tripId]);

  return (
    <div>
      <h1>My Budget</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        budgets.map(budget => (
          <div key={budget.budget_id}>
            <h3>Destination Country: {budget.destination_country}</h3>
            <h3>Starting Budget: ${parseFloat(budget.starting_budget).toFixed(2)}</h3>
            <h2>Remaining Budget: ${parseFloat(budget.remaining_budget).toFixed(2)}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default BudgetContainer;
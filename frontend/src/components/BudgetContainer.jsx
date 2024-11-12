import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BudgetContainer = () => {
  const { tripId } = useParams(); // Get tripId from URL params
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      try {
        // Make API request to fetch budgets based on tripId
        const response = await axios.get(`/budgets/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBudgets(response.data); // Set the fetched budgets
        setError(null); // Clear error if request succeeds
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
        setError('Could not load budget data. Please try again later.');
      }
    };

    if (tripId) {
      fetchBudgets(); // Trigger budget fetching if tripId exists
    }
  }, [tripId]); // Re-run if tripId changes

  return (
    <div>
      {/* Display error message if exists */}
      {error ? (
        <p className="error">{error}</p>
      ) : (
        // Display budgets if available
        budgets.map(budget => (
          <div key={budget.budget_id}>
            <h1>My Budget for: {budget.destination_country}</h1>
            <h3>Starting Budget: ${parseFloat(budget.starting_budget).toFixed(2)}</h3>
            <h3>Remaining Budget: ${parseFloat(budget.remaining_budget).toFixed(2)}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default BudgetContainer;

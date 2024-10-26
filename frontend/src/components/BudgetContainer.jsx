import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BudgetContainer = () => {
  const { tripId } = useParams();
  console.log("Retrieved tripId:", tripId);
  
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token');
      console.log("Retrieved Token:", token);

      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await axios.get(`/budgets/budget/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("API Response:", response.data);

        setBudgets(response.data);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      }
    };

    if (tripId) {
      fetchBudgets();
    }
  }, [tripId]);

  return (
    <div>
      <h2>My Budget</h2>
      {budgets.map(budget => (
        <div key={budget.budget_id}>
          <h3>{budget.place_name}</h3>
          <p>{budget.notes}</p>
          <p>Remaining Amount: {budget.new_amount} {budget.currency}</p>
          <p>Category: {budget.category}</p>
          <p>Star Rating: {budget.star_rating}</p>
        </div>
      ))}
    </div>
  );
};

export default BudgetContainer;
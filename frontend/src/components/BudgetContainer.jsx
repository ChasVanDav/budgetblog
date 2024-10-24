import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetContainer = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/users/budgets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBudgets(response.data);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

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


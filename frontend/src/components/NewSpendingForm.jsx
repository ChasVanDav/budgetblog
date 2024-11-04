import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get budgetId

const NewSpendingForm = () => {
    const { budgetId } = useParams(); // Get the budgetId from the URL
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        note: '',
        date: '',
        location: '',
        currency: 'USD' // Default currency
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Ensure you get the token

        try {
            const response = await fetch(`/spendings/${budgetId}`, { // Update URL here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Add authorization header
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create spending');
            }

            const result = await response.json();
            console.log('Spending created:', result);

            // Clear the form after successful submission
            setFormData({
                amount: '',
                category: '',
                note: '',
                date: '',
                location: '',
                currency: 'USD'
            });

        } catch (error) {
            console.error('Error creating spending:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Spending</h2>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Note:</label>
                <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Currency:</label>
                <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="GBP">GBP</option>
                </select>
            </div>
            <button type="submit">Add Spending</button>
        </form>
    );
};

export default NewSpendingForm;
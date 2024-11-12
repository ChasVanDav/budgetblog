import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SpendingContainer = () => {
  const { tripId } = useParams();
  const [spendings, setSpendings] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpending, setCurrentSpending] = useState(null);

  useEffect(() => {
    fetchSpendings();
  }, [tripId]);

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

  const handleDelete = async (spendId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/spendings/${spendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpendings(spendings.filter((spending) => spending.spend_id !== spendId));
      alert('Spending deleted successfully');
    } catch (error) {
      console.error('Failed to delete spending:', error);
      setError('Could not delete the spending. Please try again later.');
    }
  };

  const openEditModal = (spending) => {
    setCurrentSpending(spending);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentSpending(null);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/spendings/${currentSpending.spend_id}`, currentSpending, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSpendings();
      alert('Spending updated successfully');
      handleModalClose();
    } catch (error) {
      console.error('Failed to update spending:', error);
      setError('Could not update the spending. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSpending({ ...currentSpending, [name]: value });
  };

  return (
    <div>
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
            <div className="spending-actions">
              <button onClick={() => openEditModal(spending)}>Edit</button>
              <button onClick={() => handleDelete(spending.spend_id)}>Delete</button>
            </div>
          </div>
        ))
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Spending</h2>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={currentSpending.category || ''}
              onChange={handleInputChange}
            />
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={currentSpending.amount || ''}
              onChange={handleInputChange}
            />
            <label>Note:</label>
            <textarea
              name="note"
              value={currentSpending.note || ''}
              onChange={handleInputChange}
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={currentSpending.location || ''}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingContainer;



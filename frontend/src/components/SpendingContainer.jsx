import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SpendingContainer = () => {
  // Get the current trip ID from the URL
  const { tripId } = useParams();

  // State for spending data, error handling, and modal functionality
  const [spendings, setSpendings] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpending, setCurrentSpending] = useState(null);

  // Load spendings data when the tripId changes
  useEffect(() => {
    fetchSpendings();
  }, [tripId]);

  // Fetch spendings associated with this trip from the server
  const fetchSpendings = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/spendings/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpendings(response.data); // Store spendings in state
      setError(null); // Clear errors on success
    } catch (error) {
      console.error('Failed to fetch spendings:', error);
      setError('Could not load spending data. Please try again later.');
    }
  };

  // Delete a specific spending and update the list
  const handleDelete = async (spendId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/spendings/${spendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted item from spendings list
      setSpendings(spendings.filter((spending) => spending.spend_id !== spendId));
      alert('Spending deleted successfully');
    } catch (error) {
      console.error('Failed to delete spending:', error);
      setError('Could not delete the spending. Please try again later.');
    }
  };

  // Open modal to edit a specific spending item
  const openEditModal = (spending) => {
    setCurrentSpending(spending);
    setIsModalOpen(true);
  };

  // Close modal without saving changes
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentSpending(null);
  };

  // Save edits to the currently selected spending
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/spendings/${currentSpending.spend_id}`, currentSpending, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSpendings(); // Refresh list with updated spending
      alert('Spending updated successfully');
      handleModalClose();
    } catch (error) {
      console.error('Failed to update spending:', error);
      setError('Could not update the spending. Please try again later.');
    }
  };

  // Update the current spending data as user edits in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSpending({ ...currentSpending, [name]: value });
  };

  return (
    <div>
      {error ? (
        // Show error if data fetch failed
        <p className="error">{error}</p>
      ) : (
        // Display each spending item with options to edit or delete
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

      {/* Modal to edit a selected spending item */}
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



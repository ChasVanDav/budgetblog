import React, { useState } from 'react';
import axios from 'axios';

const NewTripForm = () => {
    const [destinationCountry, setDestinationCountry] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [startingBudget, setStartingBudget] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const userId = localStorage.getItem('user_id');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('/trips', {
                user_id: userId,
                destination_country: destinationCountry,
                destination_city: destinationCity,
                arrival_date: arrivalDate,
                departure_date: departureDate,
                starting_budget: parseFloat(startingBudget),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccessMessage(response.data.message);
            setError(null);
            // Clear form fields
            setDestinationCountry('');
            setDestinationCity('');
            setArrivalDate('');
            setDepartureDate('');
            setStartingBudget('');
        } catch (err) {
            console.error('Failed to create trip:', err);
            setError('Could not create trip. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h1>Create a New Trip</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Destination Country:</label>
                    <input
                        type="text"
                        value={destinationCountry}
                        onChange={(e) => setDestinationCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Destination City:</label>
                    <input
                        type="text"
                        value={destinationCity}
                        onChange={(e) => setDestinationCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Arrival Date:</label>
                    <input
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Departure Date:</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Starting Budget:</label>
                    <input
                        type="number"
                        value={startingBudget}
                        onChange={(e) => setStartingBudget(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Trip</button>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
        </div>
    );
};

export default NewTripForm;

// Import React tools and axios for data fetching
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TripContainer = () => {
    // State to hold list of trips and any error message
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);

    // Fetch trips data when the component loads
    useEffect(() => {
        const fetchTrips = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage

            if (!token) {
                console.error("No token found"); // Basic check if user is logged in
                setError('Authentication token is missing.');
                return;
            }

            try {
                // Fetch trips using the token for authorization
                const response = await axios.get('/trips', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTrips(response.data); // Store fetched trips
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Failed to fetch trips:', error);
                setError('Could not load trip data. Please try again later.');
            }
        };

        fetchTrips(); // Call function to load trips data
    }, []);

    return (
        <div>
            {/* <img src="/stylized-map-of-world-vector-12563537.jpg" alt="world map" style={{ width: '40%', height: 'auto', marginBottom: '10px' }} /> */}
            <h1>My Trips</h1>
            {error ? (
                <p className="error">{error}</p> // Display error if data fetch fails
            ) : (
                <ul>
                    {/* Loop through trips and show basic details for each */}
                    {trips.map(trip => (
                        <li key={trip.trip_id}>
                            <h2>{trip.destination_city}, {trip.destination_country}</h2>
                            <p>{new Date(trip.arrival_date).toLocaleDateString()} ~ {new Date(trip.departure_date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TripContainer;

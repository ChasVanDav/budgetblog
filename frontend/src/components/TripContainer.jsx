import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TripContainer = () => {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error("No token found");
                setError('Authentication token is missing.');
                return;
            }

            try {
                const response = await axios.get('/trips', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTrips(response.data); // Assuming response.data is an array of trips
                setError(null);
            } catch (error) {
                console.error('Failed to fetch trips:', error);
                setError('Could not load trip data. Please try again later.');
            }
        };

        fetchTrips();
    }, []);

    return (
        <div>
            <h1>My Trips</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <ul>
                    {trips.map(trip => (
                        <li key={trip.trip_id}>
                            <h3>Destination: {trip.destination_city}, {trip.destination_country}</h3>
                            <p>Arrival Date: {new Date(trip.arrival_date).toLocaleDateString()}</p>
                            <p>Departure Date: {new Date(trip.departure_date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TripContainer;
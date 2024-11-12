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
                setTrips(response.data);
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
                   {/* <img src="/stylized-map-of-world-vector-12563537.jpg" alt="image of world map" style={{ width: '40%', height: 'auto', marginBottom: '10px' }} /> */}
            <h1>My Trips</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <ul>
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
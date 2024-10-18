// Express is the framework we use to handle HTTP requests and responses.
const express = require('express'); 
// CORS allows different domains (e.g., frontend and backend) to communicate.
const cors = require('cors'); 
// dotenv lets us use environment variables from a .env file.
const dotenv = require('dotenv'); 

// Load environment variables from the .env file.
dotenv.config(); 

// Create an instance of the Express application.
const app = express(); 

// Enable CORS, so the frontend can talk to the backend.
app.use(cors()); 
// This middleware parses incoming JSON data in request bodies.
app.use(express.json()); 

// Import the routes for user registration, login, and profile.
const userRoutes = require('./routes/users'); 
// Use these routes and prefix them with '/api/users'.
app.use('/api/users', userRoutes); 

// Start the server and listen for requests on the specified port.
// Use the PORT defined in the .env file or default to 4000.
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  // Once the server is running, print this message.
  console.log(`Vanessa's Server is running on port ${PORT}`); 
});


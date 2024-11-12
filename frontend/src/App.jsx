// Bringing in necessary tools and components from libraries and local files
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // For routing/navigation
import { useState } from 'react'; // For handling state in functional components
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import BudgetContainer from './components/BudgetContainer';
import SpendingContainer from './components/SpendingContainer';
import CurrencyConverter from './components/CurrencyConverter';
import Weather from './components/Weather';
import NewTripForm from './components/NewTripForm';
import NewSpendingForm from './components/NewSpendingForm';
import TripContainer from './components/TripContainer';
import './App.css'; // Importing styles

// Dashboard component that shows weather and currency converter on the dashboard page
function Dashboard() {
    return (
        <div>
            <div className="dashboard">
                <div className="dashboard-item">
                    <Weather /> {/* Weather widget */}
                </div>
                
                <div className="dashboard-item">
                    <CurrencyConverter /> {/* Currency converter widget */}
                </div>
            </div>
        </div>
    );
}

// Main App component which sets up routing and manages authentication token state
function App() {
    // Initializing token state (for tracking user login session) from localStorage
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className="app-container">
            <Router> {/* Setting up the main router for our app */}
                <Navbar setToken={setToken} token={token} /> {/* Navbar component, which has access to setToken and token */}

                <div className="content">
                    <Routes> {/* Define different routes for the app */}
                        <Route path="/" element={<Dashboard />} /> {/* Main dashboard route */}
                        <Route path="/profile" element={<Profile />} /> {/* User profile page */}
                        <Route path="/register" element={<RegistrationForm />} /> {/* Registration form */}
                        <Route path="/login" element={<LoginForm setToken={setToken} />} /> {/* Login form, passing setToken to update token */}
                        <Route path="/budget/:tripId" element={<BudgetContainer />} /> {/* Budget page for specific trip */}
                        <Route path="/spendings/:tripId" element={<SpendingContainer />} /> {/* Spending page for specific trip */}
                        <Route path="/new-trip" element={<NewTripForm />} /> {/* New trip form */}
                        <Route path="/new-spending/:budgetId" element={<NewSpendingForm />} /> {/* New spending form */}
                        <Route path="/trips" element={<TripContainer />} /> {/* Trips list page */}
                        <Route path="/*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to dashboard */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App; // Exporting the App component so it can be used elsewhere in the app
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import BudgetContainer from './components/BudgetContainer';
import SpendingContainer from './components/SpendingContainer';
import CurrencyConverter from './components/CurrencyConverter';
import Weather from './components/Weather';
import './App.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <Weather />
      </div>
      <div className="dashboard-item">
        <CurrencyConverter />
      </div>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="app-container">
      <Router>
        <Navbar setToken={setToken} token={token} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm setToken={setToken} />} />
            <Route path="/budgets/budget/:tripId" element={<BudgetContainer />} />
            <Route path="/spendings/spending/:budgetId" element={<SpendingContainer />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
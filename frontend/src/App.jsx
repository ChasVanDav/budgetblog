import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  const [currentTripDestination, setCurrentTripDestination] = useState('');

  return (
    <div className="app-container">
      <Router>
        <Navbar currentTripDestination={currentTripDestination} />
        <div className="content">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/budgets" element={<BudgetContainer />} />
            <Route path="/spendings" element={<SpendingContainer />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

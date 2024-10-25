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

function App() {
  const [currentTripDestination, setCurrentTripDestination] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="app-container">
      <Router>
        <Navbar currentTripDestination={currentTripDestination} setToken={setToken} token={token} />
        <div className="content">
          <Routes>
            {
              token && (
                <>
                  <Route path="/" element={<Profile />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/budgets" element={<BudgetContainer />} />
                  <Route path="/spendings" element={<SpendingContainer />} />
                  <Route path="/currency" element={<CurrencyConverter />} />
                  <Route path="/weather" element={<Weather />} />
                  <Route path="/*" element={<Navigate  to="/" />} /> 
                </>
              ) || (
                  <>
                    <Route path="/" element={<LoginForm setToken={setToken} />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={<LoginForm setToken={setToken} />} />
                    <Route path="/*" element={<Navigate  to="/" />} /> 
                  </>
              )
            }
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

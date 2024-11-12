import React, { useState } from 'react';

const CurrencyConverter = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [rate, setRate] = useState(null);
    const [error, setError] = useState(null);

    // Handle currency conversion request
    const handleConvert = async () => {
        setError(null);
        setResult(null);
        setRate(null);

        try {
            const response = await fetch(`http://localhost:5000/api/currency?from=${from}&to=${to}&amount=${amount}`);
            const data = await response.json();

            if (response.ok) {
                const roundedResult = Math.round(data.result); // Round result
                setResult(roundedResult); // Set conversion result
                setRate(data.info.rate); // Set exchange rate
            } else {
                setError(data.error); // Handle API error
            }
        } catch (error) {
            setError('Failed to fetch data.'); // Handle network error
        }
    };

    // Format number into currency format
    const formatCurrency = (num, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(num);
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleConvert(); }}>
                <label htmlFor="fromCurrency">From</label>
                <input 
                    type="text" 
                    id="fromCurrency"
                    placeholder="e.g., USD" 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)} 
                    required
                />
                
                <label htmlFor="toCurrency">To</label>
                <input 
                    type="text" 
                    id="toCurrency"
                    placeholder="e.g., EUR" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)} 
                    required
                />
                
                <label htmlFor="amount">Amount</label>
                <input 
                    type="number" 
                    id="amount"
                    placeholder="Enter number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required
                />
                
                <button type="submit">Convert</button>
            </form>
    
            {result !== null && (
                <div>
                    <h2>{formatCurrency(result, to)}</h2>
                </div>
            )}
    
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;

    


import React, { useState } from 'react';

const CurrencyConverter = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [rate, setRate] = useState(null);  // To store the exchange rate
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        setError(null);
        setResult(null);
        setRate(null);  // Clear previous rate

        try {
            const response = await fetch(`http://localhost:5000/api/currency?from=${from}&to=${to}&amount=${amount}`);
            const data = await response.json();

            if (response.ok) {
                // Accessing result and rate directly from the JSON response structure
                setResult(data.result); // This is the converted amount
                setRate(data.info.rate); // This is the exchange rate
            } else {
                const errorMessage = data.error && typeof data.error === 'object'
                    ? `${data.error.code}: ${data.error.message}`
                    : data.error;
                setError(errorMessage);
            }
        } catch (error) {
            setError('Failed to fetch data.');
        }
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <input 
                type="text" 
                placeholder="From Currency (e.g., USD)" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="To Currency (e.g., EUR)" 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={handleConvert}>Convert</button>

            {result !== null && (
                <div>
                    <h2>Converted Amount: {result}</h2>
                    {rate && <p>Exchange Rate: {rate}</p>}
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;


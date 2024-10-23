import React, { useState } from 'react';

const CurrencyConverter = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        setError(null);
        setResult(null);

        try {
            const response = await fetch(`http://localhost:5000/currency/convert?from=${from}&to=${to}&amount=${amount}`);
            const data = await response.json();

            if (response.ok) {
                setResult(data.result);
            } else {
                setError(data.error);
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

            {result && <h2>Converted Amount: {result}</h2>}
            {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        </div>
    );
};

export default CurrencyConverter;

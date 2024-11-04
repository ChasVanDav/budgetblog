import React, { useState } from 'react';

const CurrencyConverter = () => {
    // State to keep track of user input: 'from' currency, 'to' currency, and amount to convert.
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    // State for storing the conversion result (converted amount) and the exchange rate.
    const [result, setResult] = useState(null);
    const [rate, setRate] = useState(null);

    // State to store any errors from the API or the fetch request.
    const [error, setError] = useState(null);

    // This function handles the currency conversion request when the user clicks "Convert".
    const handleConvert = async () => {
        // Reset any previous error or result each time we start a new conversion.
        setError(null);
        setResult(null);
        setRate(null); 

        try {
            // Make a GET request to the server API with the 'from' currency, 'to' currency, and amount.
            const response = await fetch(`http://localhost:5000/api/currency?from=${from}&to=${to}&amount=${amount}`);
            const data = await response.json();

            // Check if the response from the server is successful.
            if (response.ok) {
                // If the request was successful, extract the conversion result from the response data.
                const roundedResult = Math.round(data.result); // Round the result to the nearest whole number.
                setResult(roundedResult); // Update state with the rounded result.
                setRate(data.info.rate); // Update state with the exchange rate from the response.
            } else {
                // If there's an error, set an appropriate error message.
                const errorMessage = data.error && typeof data.error === 'object'
                    ? `${data.error.code}: ${data.error.message}` // Detailed error message if available
                    : data.error; // Generic error if detailed info isn't available
                setError(errorMessage);
            }
        } catch (error) {
            // If the fetch request fails (e.g., network issue), set a general error message.
            setError('Failed to fetch data.');
        }
    };

    // Function to format numbers into currency, adding commas and symbols as needed.
    const formatCurrency = (num, currency) => {
        // Intl.NumberFormat helps us format the number with the right currency symbol and commas.
        return new Intl.NumberFormat('en-US', {
            style: 'currency',  // This style adds a currency symbol
            currency: currency, // Uses the currency code passed in ('to' currency)
            maximumFractionDigits: 0 // Rounds to the nearest whole number
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
              aria-required="true"
            />
            
            <label htmlFor="toCurrency">To</label>
            <input 
              type="text" 
              id="toCurrency"
              placeholder="e.g., EUR" 
              value={to} 
              onChange={(e) => setTo(e.target.value)} 
              required
              aria-required="true"
            />
            
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount"
              placeholder="Amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required
              aria-required="true"
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
    


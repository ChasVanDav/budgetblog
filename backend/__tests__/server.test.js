// __tests__/server.test.js

import request from 'supertest';
import app from '../server.js';

// Set up environmental variables for the tests
const { WEATHER_API_TOKEN, EXCHANGE_API_KEY } = process.env;

describe("Express Routes", () => {
  
  // Test for root route
  it("GET / should respond with a welcome message", async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello from Vanessa's server");
  });

  // Test for weather API route
  it("GET /api/weather should return weather data", async () => {
    const cityName = 'Honolulu';
    const response = await request(app).get(`/api/weather?city=${cityName}`);
    
    // Expecting a successful response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('main');
    expect(response.body.name).toBe(cityName);
  });

  // Test for currency API route with valid parameters
  it("GET /api/currency should return conversion data", async () => {
    const from = 'USD';
    const to = 'EUR';
    const amount = 100;
    const response = await request(app).get(`/api/currency?from=${from}&to=${to}&amount=${amount}`);

    // Expecting a successful response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('result');
  });

  // Test for currency API route with missing parameters
  it("GET /api/currency should return a 400 error if parameters are missing", async () => {
    const response = await request(app).get('/api/currency?from=USD&to=EUR');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please complete from, to, and amount fields.' });
  });
});

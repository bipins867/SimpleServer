const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Set up middleware to parse JSON requests
app.use(express.json());

// Basic GET route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the simple Express server!' });
});

// GET route with parameters
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ 
    message: `Fetched detail for user ${userId}`,
    data: { id: userId, name: `User ${userId}` }
  });
});

// Basic POST route
app.post('/api/data', (req, res) => {
  const requestData = req.body;
  
  if (!requestData || Object.keys(requestData).length === 0) {
    return res.status(400).json({ error: 'No data provided in the request body' });
  }

  res.status(201).json({
    message: 'Data received successfully',
    receivedData: requestData
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Import required dependencies
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');

// Create an Express app instance
const app = express();

// Enable CORS middleware for handling cross-origin requests
app.use(cors());

// Use the helmet middleware to add security-related headers
app.use(helmet());

// Set the server port, either from environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Create a server instance, listening on the specified port
// If running in test environment, use a random available port (0)
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  server = app.listen(0);
}

// Export the app and server instances for use in other modules (e.g., testing)
module.exports = { app, server };

// Define a simple "Hello, world!" route for testing purposes
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

// Define the main API route for searching iTunes content
app.get('/api/search', async (req, res, next) => {
  // Extract search term and media type from the query parameters
  const searchTerm = req.query.term;
  const mediaType = req.query.media;

  try {
    // Build the iTunes API request URL with the provided search term and media type
    const requestUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`;
    // Send a GET request to the iTunes API using axios
    const response = await axios.get(requestUrl);

    // Check if the response contains an array of results
    if (response.data && Array.isArray(response.data.results)) {
      // Map the response data to a simplified format
      const results = response.data.results.map((result) => ({
        trackId: result.trackId,
        trackName: result.trackName,
        artistName: result.artistName,
      }));

      // Send the mapped results as a JSON response
      res.json(results);
    } else {
      // If the response data is not as expected, send a 500 error response
      res.status(500).json({ message: 'An error occurred while fetching data from the iTunes API.' });
    }
  } catch (error) {
    // Log the error details and pass the error to the next middleware
    console.error('Error details:', error.response && error.response.data);
    next(error);
  }
});

// Define a generic error handling middleware for the app
app.use((error, req, res, next) => {
  // Log the error message and send a 500 error response with a generic message
  console.error('Error:', error.message);
  res.status(500).json({ message: 'An internal server error occurred.' });
});

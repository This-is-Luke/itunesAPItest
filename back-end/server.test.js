// Import the required libraries and modules
const request = require('supertest');
const axios = require('axios');
const { server } = require('./server');

// Mock the axios library to prevent actual API calls during testing
jest.mock('axios');

// Main test suite for the server
describe('server', () => {
  // Variables to store the spies for console.error
  let consoleErrorSpy;

  // Before each test, mock the console.error function to suppress error messages
  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // After each test, restore the original console.error function
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // Test for the /hello route
  it('should return "Hello, world!" on /hello route', (done) => {
    request(server)
      .get('/hello')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello, world!');
        done();
      });
  });

  // Test for the /api/search route when iTunes API returns search results
  it('should return search results on /api/search', (done) => {
    // Mock the search results returned by the iTunes API
    const mockResults = [
      {
        trackId: 1,
        trackName: 'Test Track',
        artistName: 'Test Artist',
      },
    ];

    // Mock the axios.get function to return the mocked search results
    axios.get.mockResolvedValue({ data: { results: mockResults } });

    request(server)
      .get('/api/search?term=test&media=all')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResults);
        expect(axios.get).toHaveBeenCalledWith('https://itunes.apple.com/search?term=test&media=all');
        done();
      });
  });

  // Test for the /api/search route when iTunes API returns an error
  it('should return 500 error when iTunes API returns an error', (done) => {
    // Mock the axios.get function to reject with an error
    axios.get.mockRejectedValue(new Error('iTunes API error'));

    request(server)
      .get('/api/search?term=test&media=all')
      .then(response => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ message: 'An internal server error occurred.' });
        done();
      });
  });
});

// Close the server after all tests are completed
afterAll(done => {
  if (server) {
    server.close(done);
  } else {
    done();
  }
});

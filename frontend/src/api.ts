import axios from 'axios';

// Make a request to a route without authentication
axios.get('/api/protected')
  .then(response => {
    console.log('Response from protected route:', response.data);
  })
  .catch(error => {
    console.error('Error accessing protected route:', error.response?.data);
  });

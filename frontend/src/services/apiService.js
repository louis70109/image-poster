import axios from 'axios';

// API base URL - change this in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Default request timeout
const TIMEOUT = 30000; // 30 seconds

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Send a URL to generate an image
 * @param {string} url - The URL to process
 * @returns {Promise<object>} - Response with image data
 */
export const generateImage = async (url) => {
  try {
    const response = await api.post('/generate-image', { url });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with an error status
      return {
        success: false,
        message: error.response.data.message || `Error: ${error.response.status}`
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: 'No response from server. Please check your internet connection.'
      };
    } else {
      // Error setting up the request
      return {
        success: false,
        message: error.message || 'An unexpected error occurred'
      };
    }
  }
};

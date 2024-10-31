// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // Return the response data if needed
  } catch (error) {
    // Log error details for debugging
    console.error('Signup API error:', error);
    throw error.response ? error.response.data : new Error('Network error'); // Throw the error for handling in the frontend
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Login API error:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data; // Return the response data if needed
  } catch (error) {
    // Enhanced error handling
    console.error('Forgot Password API error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { token, new_password: newPassword });
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Reset Password API error:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};
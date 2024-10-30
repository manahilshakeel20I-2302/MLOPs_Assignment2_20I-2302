// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Backend URL

export const signup = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

export const login = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const forgotPassword = async (email) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

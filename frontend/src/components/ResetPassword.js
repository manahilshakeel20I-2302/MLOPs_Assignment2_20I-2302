// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api'; // Import your API call function

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams(); // Get query parameters from URL
  const token = searchParams.get('token'); // Extract token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword(token, newPassword); // Assuming you have an API function for this
      setMessage(response.message || 'Password reset successfully');
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPassword;

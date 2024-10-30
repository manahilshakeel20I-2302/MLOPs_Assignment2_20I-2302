// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { forgotPassword } from '../api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('Password reset link sent to your email');
    } catch (err) {
      setMessage('Error sending reset link');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPassword;

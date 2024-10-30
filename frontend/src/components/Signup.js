// src/components/Signup.js
import React, { useState } from 'react';
import { signup } from '../api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, password });
      // Redirect to login or perform other actions
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;

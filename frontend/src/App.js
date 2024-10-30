import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Optionally, you can add a catch-all route */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;


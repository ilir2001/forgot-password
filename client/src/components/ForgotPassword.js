// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:5000/forgot-password', { email });
      alert('Password reset email sent');
    } catch (error) {
      console.error(error.response.data.message);
      alert('Error sending reset email');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Email</button>
    </div>
  );
};

export default ForgotPassword;

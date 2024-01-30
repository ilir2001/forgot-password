import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams(); // Use useParams to get the token from the URL

  const handleResetPassword = async () => {
    try {
      console.log('Reset token:', token);

      // Send the reset password request
      await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });

      // If the request is successful, show an alert
      alert('Password reset successful');
    } catch (error) {
      // If there's an error, log the details to the console
      console.error('Error:', error);

      // Check if there is a response and a data property in the error object
      if (error.response && error.response.data) {
        console.error('Response data:', error.response.data);
        console.error('Error message:', error.response.data.message);
      }

      // Show an alert indicating an error occurred
      alert('Error resetting password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;

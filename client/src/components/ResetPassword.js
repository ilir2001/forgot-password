// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordReset, setPasswordReset] = useState(false);
  const { token } = useParams(); // Use useParams to get the token from the URL

  const handleResetPassword = async () => {
    try {
      // Send the reset password request
      await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
      setPasswordReset(true);
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
    <div className="container mt-5">
      <div className="card border-info p-5">
        <h2 className="text-center mb-4 text-info">Reset Password</h2>
        {!passwordReset ? (
          <>
            <p className="text-center text-muted">Enter your new password to reset your account.</p>
            <div className="form-group">
              <label className="text-info">New Password:</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <button onClick={handleResetPassword} className="btn btn-info btn-block mt-3">
              Reset Password
            </button>
          </>
        ) : (
          <p className="text-center text-success">Password reset successful. You can now login.</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

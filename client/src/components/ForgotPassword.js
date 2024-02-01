// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:5000/forgot-password', { email });
      setEmailSent(true);
    } catch (error) {
      console.error(error.response.data.message);
      alert('Error sending reset email');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card border-primary p-5">
        <h2 className="text-center mb-4 text-primary">Forgot Password</h2>
        {!emailSent ? (
          <>
            <p className="text-center text-muted">Enter your email to receive a password reset link.</p>
            <div className="input-group mb-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <div className="input-group-append">
                <button onClick={handleForgotPassword} className="btn btn-primary">
                  Send Reset Email
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-success">
            Password reset email sent. Check your inbox for further instructions.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

import React from 'react'
import { useState } from "react"
import {  useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/UserContext';
import "./Login.css"
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isRegistering, setRegistering] = useState(false);
  const { login } = useUser();
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setRegistering(true);
      const response = await fetch('http://localhost:3001/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "ok") {
          // Login successful, navigate to the dashboard or set user authentication state
          console.log('Login successful');
          setRegistering(false);
          const userName = data.userName;
          login(userName);
          navigate('/home');
      } else {
          // Login failed, display an error message
          setRegistering(false);
          alert(data.message);
          console.error(data.message);
      }
  } catch (error) {
    setRegistering(false);
      alert("An error occurred during login:", error);
      console.error('An error occurred during login:', error);
  }
  }
  return (
    <div className="cont">
      <div className="Login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="email-box">
            <div className="email-title">Email</div>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-box">
            <div className="password-title">Password</div>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="off"
              className="password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
      </div>
      {isRegistering && (
        <div className="registration-modal">
          <p>Logging...</p>
        </div>
      )}
    </div>
  );
}


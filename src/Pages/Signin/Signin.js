import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role is 'patient'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Choose the endpoint based on the selected role
      const endpoint = role === 'patient' ? '/auth/patient/signin' : '/auth/doctor/signin';
      
      const response = await axios.post(`https://ehrs-backend.onrender.com${endpoint}`, { name, password });
      console.log('Login successful:', response.data);

      // Assuming the backend returns a session token and user ID
      const { sessionToken, userId } = response.data;

      // Store the session token and user ID in local storage
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('userId', userId);

      // Redirect the user to a profile page based on their role
      navigate(`/${role}profile`);
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="signin-heading">Sign in</h1>
        <div className='form-content'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="label-signin-username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="name" 
              className="input-signin-username" 
              placeholder="Enter your username" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password" className="label-signin-password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="input-signin-password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='role'>
              <label htmlFor="role">Role:</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className='btn_container_login'>
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

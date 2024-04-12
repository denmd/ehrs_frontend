import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

import './Register-patient.css';

const Registerpatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    password: '',
    EthereumAddress: '', // Make sure the name matches the backend
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    if (!validateEmail(emailValue)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    console.log("heyy")
    e.preventDefault();
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://127.0.0.1:8000/auth/patient/signup', formData);
      console.log('Registration successful:', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='registration-image1'>
      <div className="registration-container1">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group1">
            <label className="label-full-name">Full Name:</label>
            <input
              type="text-regpatient"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group1">
            <label className="label-email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="form-group1">
            <label className="label-age">Age:</label>
            <input
              type="tel" 
              name="age"
              min="1"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group1">
            <label className="label-gender">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group1">
            <label className="label-password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group1">
            <label className="etherum-address">Ethereum Address</label>
            <input
              type="address"
              name="EthereumAddress"
              value={formData.EthereumAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className='btn_container_register'>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerpatient;

import React, { useState } from 'react';
import './Register-patient.css';

const Registerpatient = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group1">
            <label className="label-email">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
            />
            {error && <p className="text-danger p-2 m-2">{error}</p>}
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
            <label className="label-confirm-password">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Register-medicalprofessional.css';

const Registermedicalprofessional = () => {
  const navigate = useNavigate()

  const Navigatetopatientprofile = () => {
    navigate('/patientprofile')
  }

  const [formData, setFormData] = useState({
    fullName: '',
    specialization: '',
    phnno: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkEmail = (e) => {
    const emailValue = e.target.value;
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(emailValue)) {
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

  const [error, setError] = useState("");

  return (
    <div className='registration-image'>
      <div className="registration-container">
        <h2>Doctor Registration</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="registration-label">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="registration-input"
            />
          </div>

          <div className="form-group">
            <label className="registration-label">Phone Number:</label>
            <input
              type="tel"
              name="phnno"
              minLength="10"
              maxLength="10"
              value={formData.phnno}
              onChange={handleChange}
              required
              className="registration-input"
            />
          </div>

          <div className="form-group">
            <label className="registration-label">Specialization:</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="registration-select"
            >
              <option value="">Select</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="dermatology">Dermatology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="radiology">Radiology</option>
              <option value="ophthalmology">Ophthalmology</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="registration-label">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={checkEmail}
              required
              className="registration-input"
            />
            {error && <p className="text-danger p-2 m-2">{error}</p>}
          </div>

          <div className="form-group">
            <label className="registration-label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="registration-input"
            />
          </div>

          <div className="form-group">
            <label className="registration-label">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="registration-input"
            />
          </div>
          <div className='btn_container_register'>
            <button type="submit" onClick={Navigatetopatientprofile} className="registration-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registermedicalprofessional;

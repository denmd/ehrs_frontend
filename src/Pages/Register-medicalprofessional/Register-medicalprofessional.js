import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Register-medicalprofessional.css';

const Registermedicalprofessional = () => {
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phnno: '',
    email: '',
    password: '',
    EthereumAddress: '', 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ehrs-backend.onrender.com/auth/doctor/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/signin')
      
       
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to register doctor');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register doctor');
    }
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
              name="name"
              value={formData.name}
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
            <label className="registration-label">Ethereum Address:</label>
            <input
              type="text"
              name="EthereumAddress"
              value={formData.EthereumAddress}
              onChange={handleChange}
              required
              className="registration-input"
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

export default Registermedicalprofessional;

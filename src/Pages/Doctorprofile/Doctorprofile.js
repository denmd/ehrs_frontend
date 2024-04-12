import React, { useState, useEffect } from 'react';
import './Doctorprofile.css';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch session token from localStorage
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken || !userId) {
      console.error('Session token or user ID not found');
      return;
    }
    fetch('http://localhost:8000/patientprofile/user-profile', {
      headers: {
        'Authorization': sessionToken, // Include session token in Authorization header
        'X-UserId': userId, // Include user ID in custom header
      },
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, [userId]);

  return (
    <div className="doctor-profile-container">
      <div className="sidebar">
        <ul>
  
          <li>Profile</li>
          <li onClick={()=>{navigate('/findmypatient')}}>Find Patients</li>
          <li onClick={()=>{navigate('/mypatient')}}>My Patients</li>
         
        </ul>
      </div>
      <div className="main-content">
        <h1>My Profile</h1> 
        {profileData && (
          <div className="profile-info">
            <div className="profile-picture">
              <img src={profileData.photo} alt="Profile" />
              <input type="file" accept="image/*" />
            </div>
            <div className="doctor-details">
              <h2>Name: {profileData.name}</h2>
              <h2>Email: {profileData.email}</h2>
              <h2>Specialization: {profileData.specialization}</h2>
              <h2>EthereumAddress: {profileData.EthereumAddress}</h2>
              {/* Additional doctor-specific information */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;

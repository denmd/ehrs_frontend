import React, { useState, useEffect } from 'react';
import './PatientProfile.css';

const PatientProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
   
    fetch('https://api.example.com/patient-profile')
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  return (
    <div className="patient-profile-container">
      <div className="sidebar">
        <ul>
          <li>Profile</li>
          <li>Add Doctor</li>
          <li>Add Record</li>
        </ul>
      </div>
      
     
      <div className="main-content">
        <h1>My Profile</h1> 
        
        <div className="profile-picture">
          <img src={profileData?.photo} alt="Profile" />
          <input type="file" accept="image/*" />
        </div>
        
        
        <div className="patient-info">
          <h2>Name: {profileData?.name}</h2>
          <h2>Age: {profileData?.age}</h2>
          <h2>Gender: {profileData?.gender}</h2>
          <h2>Blood Group: {profileData?.bloodGroup}</h2>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
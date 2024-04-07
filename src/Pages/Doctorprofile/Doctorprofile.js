import React, { useState, useEffect } from 'react';
import './Doctorprofile.css';

const DoctorProfile = () => {
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
          <li>My Patient</li>
        </ul>
      </div>
      
     
      <div className="main-content">
        <h1>My Profile</h1> 
        
        <div className="profile-picture">
          <img src={profileData?.photo} alt="Profile" />
          <input type="file" accept="image/*" />
        </div>
        
        
        <div className="doctor-info">
          <h2>Name: {profileData?.name}</h2>
          <h2>Doctor ID: {profileData?.id}</h2>
          <h2>Specialization: {profileData?.specialization}</h2>
         
         
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
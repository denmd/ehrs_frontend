import React, { useState, useEffect } from 'react';
import './PatientProfile.css';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
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

    // Fetch patient profile data with session token and user ID included in headers
    fetch('http://localhost:8000/patientprofile/user-profile', {
      headers: {
        'Authorization': sessionToken, // Include session token in Authorization header
        'X-UserId': userId, // Include user ID in custom header
      },
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, [userId]); // Trigger useEffect when userId changes
  const handleRecordsClick = () => {
    navigate('/addnewrecord'); // Navigate to '/records' route
  };
  const handledoctorsClick = () => {
    navigate('/adddoctor'); // Navigate to '/records' route
  };

  return (
    <div className="patient-profile-container">
      <div className="sidebar">
        <ul>
          <li>My Profile</li>
          <li onClick={handledoctorsClick}>My Doctors</li>
          <li onClick={handleRecordsClick}>My Records</li>
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
          <h2>email: {profileData?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
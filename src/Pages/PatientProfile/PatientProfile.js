import React, { useState, useEffect } from 'react';
import './PatientProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const PatientProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
   
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken || !userId) {
      console.error('Session token or user ID not found');
      return;
    }

    
    fetch('http://localhost:8000/patientprofile/user-profile', {
      headers: {
        'Authorization': sessionToken, 
        'X-UserId': userId, 
      },
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, [userId]); 
  const handleRecordsClick = () => {
    navigate('/addnewrecord'); 
  };
  const handledoctorsClick = () => { 
    navigate('/adddoctor');
  };
  const handleSignOut = async () => {
    try {
     
      await axios.post('http://localhost:8000/auth/signout');
      navigate('/')
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  return (
    <div className="patient-profile-container">
      <div className="sidebar-patient-profile">
        <ul>
          <li>My Profile</li>
          <li onClick={handledoctorsClick}>My Doctor</li>
          <li onClick={handleRecordsClick}>My Records</li>
          <li  onClick={handleSignOut}>Log out</li>
        </ul>
      </div>
      
     
      <div className="main-content-patient-profile">
        <h1>My Profile</h1> 
      
        
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
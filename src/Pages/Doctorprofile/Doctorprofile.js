import React, { useState, useEffect } from 'react';
import './Doctorprofile.css';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/user_3237472.png';
import axios from 'axios';


const DoctorProfile = () => {
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
  const handleSignOut = async () => {
    try {

      await axios.post('http://localhost:8000/auth/signout');
      navigate('/')
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="doctor-profile-container">
      <div className="sidebar-doctor-profile-container">
        <ul>
  
          <li>Profile</li>
          <li onClick={()=>{navigate('/findmypatient')}}>Find Patients</li>
          <li onClick={()=>{navigate('/mypatient')}}>My Patients</li>
          <li onClick={handleSignOut}>Log Out</li>
          

         
        </ul>
      </div>
      <div className="main-content">
        <h1>My Profile</h1> 
        {profileData && (
          <div className="profile-info">
            <div className="profile-picture">
              <img src={profileIcon} alt="Profile" />
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

import React, { useState, useEffect } from 'react';
import './PatientProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3'; // Import Web3 library

const PatientProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken || !userId) {
      console.error('Session token or user ID not found');
      return;
    }

    fetch('https://ehrs-backend.onrender.com/patientprofile/user-profile', {
      headers: {
        'Authorization': sessionToken, 
        'X-UserId': userId, 
      },
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));

    // Check if MetaMask is installed
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
     
    } else {
      console.log('MetaMask not found!');
    }
  }, [userId]);

  const handleRecordsClick = () => {
    navigate('/addnewrecord');
  };

  const handledoctorsClick = () => {
    navigate('/adddoctor');
  };

  const handleSignOut = async () => {
    try {
      await axios.post('https://ehrs-backend.onrender.com/auth/signout');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const connectMetaMask = async () => {
    if (!web3) {
      console.error('Web3 not initialized!');
      return;
    }
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div className="patient-profile-container">
      <div className="sidebar-patient-profile">
        <ul>
          <li>My Profile</li>
          <li onClick={handledoctorsClick}>My Doctor</li>
          <li onClick={handleRecordsClick}>My Records</li>
          <li onClick={handleSignOut}>Log out</li>
          <li>
            <button onClick={connectMetaMask} disabled={accounts.length > 0}>
              {accounts.length > 0 ? 'Connected to MetaMask' : 'Connect to MetaMask'}
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content-patient-profile">
        <h1>My Profile</h1>

        <div className="patient-info">
          <h2>Name: {profileData?.name}</h2>
          <h2>Age: {profileData?.age}</h2>
          <h2>Gender: {profileData?.gender}</h2>
          <h2>Email: {profileData?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

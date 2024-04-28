import React, { useState, useEffect } from 'react';
import './PatientProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useWeb3 from '../../components/Metamaskbtn';

const PatientProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const { connectMetaMask, account } = useWeb3();
  const [showMetaMaskMessage, setShowMetaMaskMessage] = useState(false);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken || !userId) {
      console.error('Session token or user ID not found');
      return;
    }

    const storedShowMetaMaskMessage = localStorage.getItem('showMetaMaskMessage');
    if (storedShowMetaMaskMessage) {
      setShowMetaMaskMessage(JSON.parse(storedShowMetaMaskMessage));
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

    console.log('dnd');
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
      localStorage.setItem('showMetaMaskMessage', JSON.stringify(true));
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Function to handle MetaMask connection and store the value
  const handleConnectMetaMask = () => {
    connectMetaMask();
    localStorage.setItem('showMetaMaskMessage', JSON.stringify(false)); // Store the value in local storage
  };

  return (
    <div className="patient-profile-container">
      <div className="sidebar-patient-profile">
        <ul>
          <li>My Profile</li>
          <li onClick={handledoctorsClick}>My Doctor</li>
          <li onClick={handleRecordsClick}>My Records</li>
          <li onClick={handleSignOut}>Log out</li>
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

      {/* Modal for MetaMask connection prompt */}
      {showMetaMaskMessage && (
        <div className="modal">
          <div className="modal-content">
            <h2>Please connect to MetaMask</h2>
            <div className='metamask-container'>
              {account.length > 0 ? (
                <button onClick={() => setShowMetaMaskMessage(false)}>Close</button>
              ) : (
                <button onClick={handleConnectMetaMask}>Connect to MetaMask</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;

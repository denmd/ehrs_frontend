import React, { useState, useEffect } from 'react';
import './Doctorprofile.css';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/user_3237472.png';
import axios from 'axios';
import useWeb3 from '../../components/Metamaskbtn';

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');
  const { web3, contract, connectMetaMask, account } = useWeb3();
  const [showMetaMaskMessage, setShowMetaMaskMessage] = useState(false);

  const navigate = useNavigate();
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
  }, [userId]);
  const handleSignOut = async () => {
    try {

      await axios.post('https://ehrs-backend.onrender.com/auth/signout');
      localStorage.setItem('showMetaMaskMessage', JSON.stringify(true));
      navigate('/')
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  const handleConnectMetaMask = () => {
    connectMetaMask();
    localStorage.setItem('showMetaMaskMessage', JSON.stringify(false)); // Store the value in local storage
  };

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

export default DoctorProfile;

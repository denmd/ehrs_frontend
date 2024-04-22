import React, { useState, useEffect } from 'react';
import './adddoctor.css';
import { useNavigate } from 'react-router-dom';
const Adddoctor = () => {
  const [searchValue, setSearchValue] = useState('');
  const [addedDoctors, setAddedDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAddedDoctors();
  }, []);

  const fetchAddedDoctors = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:8000/Doctorlist/mydoctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-userid': userId
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch added doctors');
      }
      const data = await response.json();
      setAddedDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching added doctors:', error);
    }
  };
  const handleAccessClick = async ( EthereumAddress) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:8000/contractRoutes/allow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userid': userId
        },
        body: JSON.stringify({ user : EthereumAddress }) // Include Ethereum address in the request body
      });
      if (!response.ok) {
        throw new Error('Failed to update access');
      }
    
    } catch (error) {
      console.error('Error updating access:', error);
    }
  };
  const handleRevokeClick = async (EthereumAddress) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:8000/contractRoutes/disallow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userid': userId
        },
        body: JSON.stringify({ user: EthereumAddress }) // Include Ethereum address in the request body
      });
      if (!response.ok) {
        throw new Error('Failed to revoke access');
      }
     
    } catch (error) {
      console.error('Error revoking access:', error);
    }
  };
  
  const handleSearch = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:8000/Doctorlist/doctors?query=${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-userid': userId // Add the user ID to the headers
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
       
      } else if (data && data.name) {
      
      } else {
        setErrorMessage('No doctors found.');
      }
    } catch (error) {
      console.error('Error searching doctors:', error);
      setErrorMessage('Failed to search doctors. Please try again.');
    }
  };

 

  return (
    <div className="adddoctor-container">
      <div className="sidebar-adddoctor-container">
        <ul>
          <li onClick={()=>{navigate('/patientprofile')}}>Profile</li>
          <li>My Doctor</li>
          <li onClick={()=>{navigate('/addnewrecord')}}>Add Record</li>
          <li onClick={()=>{navigate('/')}}>Log Out</li>
          

        </ul>
      </div>
      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Doctor..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">Add</button>
        </div>

        <div className="added-doctors-container">
  <h2>Added Doctors:</h2>
  {addedDoctors.length === 0 ? (
    <p>No doctors in the list</p>
  ) : (
    addedDoctors.map((doctor, index) => (
      <div className="added-doctor-box" key={index}>
        <div className="added-doctor-content">
          <p>Name: {doctor.name}</p>
          <p>Specialty: {doctor.specialization}</p>
          <p>Ethereum Address: {doctor.EthereumAddress}</p>
        </div>
        
        {doctor.hasAccess ? (
                  <button className='added-revoke-button ' onClick={() => handleRevokeClick(doctor.EthereumAddress)}>Revoke</button>
                ) : (
                  <button className='added-acess-button' onClick={() => handleAccessClick(doctor.EthereumAddress)}>Allow Access</button>
                )}
              
      </div>
    ))
  )}
  {errorMessage && <p className="error-message">{errorMessage}</p>}
</div>
</div>
</div>

  );
};

export default Adddoctor;

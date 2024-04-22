import React, { useState, useEffect } from 'react';
import './FindMyPatient.css';
import profileIcon from '../../assets/user_3237472.png';

const FindMyPatient = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch list of all patients from backend
    fetch('https://ehrs-backend.onrender.com/patientlist/patients') // Assuming backend runs on localhost:8000
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleAddToMyPatient = (patientId) => {
    const userId = localStorage.getItem('userId');
    fetch('https://ehrs-backend.onrender.com/patientlist/add-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-userid': userId // Include the user ID from local storage
      },
      body: JSON.stringify({ patientId })
    })
      .then(response => response.json())
      .then(data => {
        setSuccessMessage(data.message);
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
        // Optionally update the UI or perform other actions upon successful addition
      })
      .catch(error => console.error('Error adding patient:', error));
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="findmypatient-container">
      <h1>Find My Patient</h1>
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
       {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="patient-list">
        {filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          filteredPatients.map(patient => (
            <div key={patient.id} className="patient-box">
              <div className="profile-icon">
                <img src={profileIcon} alt="Profile Icon" />
              </div>
              <div className="patient-content">
                <h2>Name: {patient.name}</h2>
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
                <button onClick={() => handleAddToMyPatient(patient._id)}>Add to My Patient</button>
              </div>
            </div>
          ))
        )}
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default FindMyPatient;

import React, { useState, useEffect } from 'react';
import './Mypatient.css';

const MypatientProfile = () => {
  const [patients, setPatients] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/patientlist/get-patients', {
          headers: {
            'x-userid': userId // Include the user ID from local storage as a header
          }
        });
        const jsonData = await response.json();
        setPatients(jsonData.patients);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleViewRecords = (patientId) => {
    // Implement functionality to view records for the selected patient
    console.log('View records for patient with ID:', patientId);
  };

  return (
    <div className="mypatient-container">
      <div className="sidebarmypatient">
        <ul>
          <li>Profile</li>
          <li onClick={()=>{}}>Find Patients</li>
          <li>My Patient</li>
        </ul>
      </div>
     
      <div className="main-content-mypatient">
        <h1>My Patients</h1> 
        
        <div className="patient-list">
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            patients.map(patient => (
              <div key={patient._id} className="patient-box">
                <h2>NAME:{patient.name}</h2>
                <h2>Age:{patient.age}</h2>
                <h2>Gender:{patient.gender}</h2>
                <h2>Email:{patient.email}</h2>
                
                <button onClick={() => handleViewRecords(patient.id)}>View Records</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MypatientProfile;

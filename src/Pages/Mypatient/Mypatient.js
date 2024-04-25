  import React, { useState, useEffect } from 'react';
  import './Mypatient.css';
  import { Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import profileIcon from '../../assets/user_3237472.png';
  import useWeb3 from '../../components/Metamaskbtn';
  const MypatientProfile = () => {
    const [patients, setPatients] = useState([]);
    const userId = localStorage.getItem('userId');
    const [accessError, setAccessError] = useState(false);
    const [account, setAccount] = useState('');
    const navigate = useNavigate();
    const { web3, contract, connectMetaMask } = useWeb3();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://ehrs-backend.onrender.com/patientlist/get-patients', {
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

    // const handleViewRecords = async (EthereumAddress) => {
    //   try {
    //     const userId = localStorage.getItem('userId');
    //     const owner = EthereumAddress; // Replace this with the actual patient Ethereum address
    
    //     const response = await fetch('https://ehrs-backend.onrender.com/contractRoutes/display', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type':'application/json',
    //         'x-userid': userId
    //       },
    //       body: JSON.stringify({ owner: owner })
    //     });
    
    //     if (response.ok) {
    //       const recordsData = await response.json();
    //       console.log(recordsData)
    //       navigate('/records', { state: recordsData });
    //     } else {
    //       setAccessError(true);
    //       setTimeout(() => {
    //         setAccessError('');
    //       }, 3000);
    //       console.log('You do not have access to view records for this patient.');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching records:', error);
    //   }
    // };
    const handleViewRecords = async (EthereumAddress) => {
      try {
        const userId = localStorage.getItem('userId');
        const owner = EthereumAddress; // Replace this with the actual patient Ethereum address
        if (!web3) {
          console.error('Web3 not initialized!');
          return;
        }
  
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        const accoun=accounts[0]
        console.log(accoun)
        console.log("Connected account:", accoun);
        if (!contract) {
          console.error('Contract not initialized!');
          return;
        }
  
       const result= await contract.methods.display(owner).send({ from: accoun });
       console.log("r1")
        console.log(result)
        const hexString = result.logs[0].data;
        console.log(hexString)
        const strippedString = hexString.slice(2);

        // Convert hex string to ASCII string
        const decodedString = web3.utils.hexToAscii(strippedString);
        console.log(decodedString)
        
        // if (response.ok) {
        //   const recordsData = await response.json();
        //   console.log(recordsData)
        //   navigate('/records', { state: recordsData });
        // } else {
        //   setAccessError(true);
        //   setTimeout(() => {
        //     setAccessError('');
        //   }, 3000);
        //   console.log('You do not have access to view records for this patient.');
        // }
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };
    

    return (
      <div className="mypatient-container">
        <div className="sidebarmypatient">
          <ul>
            <li onClick={()=>{navigate('/doctorprofile')}}>Profile</li>
            <li onClick={()=>{navigate('/findmypatient')}}>Find Patients</li>
            <li onClick={()=>{navigate('/mypatient')}}>My Patients</li>
            <li onClick={()=>{navigate('/')}}>Log Out</li>

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
      <div className="profile-icon">
        {/* Include the profile icon here */}
        <img src={profileIcon} alt={`Profile icon of ${patient.name}`} />
      </div>
      <div className="patient-info">
        <h2>NAME: {patient.name}</h2>
        <h2>Age: {patient.age}</h2>
        <h2>Gender: {patient.gender}</h2>
        <h2>Email: {patient.email}</h2>
        <div className='link'><Link to="#" onClick={() => handleViewRecords(patient.EthereumAddress)}>View Records</Link></div>
      </div>
    </div>
      
  ))
)}

          </div>
           {accessError &&<div className="access-error-message-container">
          <p className="access-error-message">You do not have access to view records for this patient.</p>
        </div>}
        </div>
       
      </div>
    );
  };

  export default MypatientProfile;

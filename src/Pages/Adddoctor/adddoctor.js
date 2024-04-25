import React, { useState, useEffect } from 'react';
import './adddoctor.css';
import { useNavigate } from 'react-router-dom';

//import Web3 from 'web3';
//import Configration from "../../Contractabi/Upload.json"
import useWeb3 from '../../components/Metamaskbtn';
const Adddoctor = () => {
  const [searchValue, setSearchValue] = useState('');
  const [addedDoctors, setAddedDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
 const [account, setAccount] = useState('');
  //const [web3, setWeb3] = useState(null);
 // const [contract, setContract] = useState(null);
  const { web3, contract, connectMetaMask } = useWeb3();
  const navigate = useNavigate();
  // const MyContractAddress='0x205CAB2b1ADC1af2Eca5Efb2f421F182ef4d2709'
  // const ContractABI=Configration.abi
  useEffect(() => {
    fetchAddedDoctors();
  }, []);
  // useEffect(() => {
  //   if (window.ethereum) {
  //     const web3Instance = new Web3(window.ethereum);
  //     setWeb3(web3Instance);
  //     console.log(web3Instance);
  //   }
  // }, []);
  // // useEffect(() => {
  //   if (web3) {
  //     const contractInstance = new web3.eth.Contract(ContractABI, MyContractAddress);
  //     setContract(contractInstance);
  //   }// eslint-disable-next-line
  // },[web3]);
  const fetchAddedDoctors = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://ehrs-backend.onrender.com/Doctorlist/mydoctors', {
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
  const handleAccessClick = async (EthereumAddress) => {
    try {
      console.log(account)
      if (!web3) {
        console.error('Web3 not initialized!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      const data=accounts[0]
      console.log(data)
      console.log("Connected account:", account);
      // const web3Instance = new Web3(window.ethereum);
      // setWeb3(web3Instance);

      if (!contract) {
        console.error('Contract not initialized!');
        return;
      }

      await contract.methods.allow(EthereumAddress).send({ from: data });
      console.log("Access granted successfully!");
      await updateHasAccess(EthereumAddress, true);
      
    } catch (error) {
      console.error('Error updating access:', error);
    }
  };
  const handleRevokeClick = async (EthereumAddress) => {
    try {
      console.log(account)
      if (!web3) {
        console.error('Web3 not initialized!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      const data=accounts[0]
      console.log(data)
      console.log("Connected account:", account);
      // const web3Instance = new Web3(window.ethereum);
      // setWeb3(web3Instance);

      if (!contract) {
        console.error('Contract not initialized!');
        return;
      }

      await contract.methods.disallow(EthereumAddress).send({ from: data });
      console.log("Access Revoked v successfully!");
      await updateHasAccess(EthereumAddress, false);
      
    } catch (error) {
      console.error('Error updating access:', error);
    }
  };

  // const handleAccessClick = async ( EthereumAddress) => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     const response = await fetch('https://ehrs-backend.onrender.com/contractRoutes/allow', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-userid': userId
  //       },
  //       body: JSON.stringify({ user : EthereumAddress }) // Include Ethereum address in the request body
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to update access');
  //     }
    
  //   } catch (error) {
  //     console.error('Error updating access:', error);
  //   }
  // };
  // const handleRevokeClick = async (EthereumAddress) => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     const response = await fetch('https://ehrs-backend.onrender.com/contractRoutes/disallow', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-userid': userId
  //       },
  //       body: JSON.stringify({ user: EthereumAddress }) // Include Ethereum address in the request body
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to revoke access');
  //     }
     
  //   } catch (error) {
  //     console.error('Error revoking access:', error);
  //   }
  // };
  
  const handleSearch = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`https://ehrs-backend.onrender.com/Doctorlist/doctors?query=${searchValue}`, {
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

  // const connectMetaMask = async () => {
  //   try {
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     if (!accounts[0]) throw new Error("No metamask account found!");
  //     console.log(accounts[0]);
  //     const data= accounts[0]
  //     setAccount(data);
  //     console.log(account)
  //     const web3Instance = new Web3(window.ethereum);
  //     setWeb3(web3Instance);
  //     console.log(web3Instance)
  //     console.log(web3)

  //     const contractInstance = new web3Instance.eth.Contract(ContractABI, MyContractAddress);
  //     setContract(contractInstance);
  //   } catch (error) {
  //     console.error('Error connecting to MetaMask:', error);
  //   }
  // };
  const updateHasAccess = async (EthereumAddress, hasAccess) => {
    try {
      console.log("1")
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://ehrs-backend.onrender.com/Doctorlist/updateHasAccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userid': userId
        },
        body: JSON.stringify({ EthereumAddress, hasAccess }) // Include Ethereum address and hasAccess in the request body
      });
      console.log("2")
      if (!response.ok) {
        throw new Error('Failed to update hasAccess');
      }
      console.log("3")
      // Fetch the updated list of doctors
      await fetchAddedDoctors();
    } catch (error) {
      console.error('Error updating access:', error);
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
          <li>
          <button onClick={connectMetaMask} disabled={account.length > 0}>
              {account.length > 0 ? 'Connected to MetaMask' : 'Connect to MetaMask'}
            </button>
          </li>
          

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

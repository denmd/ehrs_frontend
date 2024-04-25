import { React ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './addnewrecord.css';
import useWeb3 from '../../components/Metamaskbtn';
const Addnewrecord = () => {
  const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] =useState('');
  const { web3, contract, connectMetaMask } = useWeb3();
  const [account, setAccount] = useState('');
  const handleViewAllRecords = async () => {
    const patientId = userId;
    try {
      const response = await fetch(`https://ehrs-backend.onrender.com/medical-record/files/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        navigate('/records', { state: data });
      } else {
        console.error('Error fetching records:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      if (!sessionToken || !userId) {
        console.error('Session token or user ID not found');
        return;
      }

      const title = e.target.elements.title.value;
      const description = e.target.elements.description.value;
      const file = e.target.elements.document.files[0];

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);

      const response = await fetch('https://ehrs-backend.onrender.com/medical-record/upload', {
        method: 'POST',
        headers: {
          'Authorization': sessionToken,
          'X-UserId': userId, // Include user ID in custom header
        },
        body: formData, // Pass form data object
      });
      const data = await response.json();
      const { patientId } = data;
      console.log(patientId); //
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
      // const web3Instance = new Web3(window.ethereum);
      // setWeb3(web3Instance);

      if (!contract) {
        console.error('Contract not initialized!');
        return;
      }
      const url=userId
      await contract.methods.add(accoun,url).send({ from: accoun });
      console.log("recorder added to blockchain");
      if (response.ok) {
        setSuccessMessage('Record added successfully');
       
      } else {
        setSuccessMessage('Record added failed');
        console.error('Error adding record:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className="addnewrecord-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => { navigate('/patientprofile') }}>My Profile</li>
          <li onClick={() => { navigate('/adddoctor') }}>My Doctor</li>
          <li>Add Record</li>
          <li onClick={() => { navigate('/') }}>Log Out</li>
        </ul>
      </div>
      <div className="main-content-newrecord">
        <h1>Add New Record</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" /><br />
          <input type="text" name="description" placeholder="Description" /> <br />
          <input type="file" id="document-upload" name="document" accept=".pdf,.doc,.docx" /> <br />
          <button type="submit" className='done-button'>Done</button>
        </form>
        
        <button type="submit" className='all-records' onClick={handleViewAllRecords}> View All records</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Addnewrecord;

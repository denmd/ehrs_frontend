import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Configration from "../Contractabi/Upload.json"
import axios from 'axios';
const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const MyContractAddress='0x205CAB2b1ADC1af2Eca5Efb2f421F182ef4d2709'
  const ContractABI=Configration.abi

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const contractInstance = new web3Instance.eth.Contract(ContractABI, MyContractAddress);
      setContract(contractInstance);
    }
  }, []);

  const connectMetaMask = async () => {
    try {
       const  userId= localStorage.getItem('userId')
       console.log(userId)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts[0]) throw new Error("No metamask account found!");
      const data = String(accounts[0]);
      console.log(accounts[0])
      setAccount(data);
      const response = await axios.post('https://ehrs-backend.onrender.com/auth/check-account', {
        address: accounts[0],
       userId: String(userId),  
      });
      console.log(response)
      if (!response.data.exists) {
        throw new Error('Connected account or user ID does not exist in the patient schema.');
      }

      
    
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return { web3, contract, connectMetaMask, account };
};

export default useWeb3;

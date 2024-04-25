import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Configration from "../Contractabi/Upload.json"

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
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts[0]) throw new Error("No metamask account found!");
      const data = accounts[0];
      setAccount(data);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return { web3, contract, connectMetaMask, account };
};

export default useWeb3;

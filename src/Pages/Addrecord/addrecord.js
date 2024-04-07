import React from 'react';
import './addrecord.css';
import { useNavigate } from "react-router-dom"
import Sidebar from '../../components/Sidebar';

const Addrecord = () => {
  const navigate = useNavigate()

  const Addnewrecord = () => {
    navigate('/addnewrecord')
  }

  return (
    <div className="addrecord-container">
      <Sidebar />
      <div className="main-content-record">
        <h1>Add Record</h1>
        <input type="text3" defaultValue="Record1" readOnly /><br />
        <input type="text3" defaultValue="Record2" readOnly />
        <button className='add-button-record' onClick={Addnewrecord}>Add New Record</button>
      </div>
    </div>
  );
};

export default Addrecord;

import React from 'react';
import './addnewrecord.css';

const Addnewrecord = () => {
  return (
    <div className="addnewrecord-container">
     <div className="sidebar">
        <ul>
          <li>Profile</li>
          <li>Add Doctor</li>
          <li>Add Record</li>
        </ul>
      </div>
      <div className="main-content-newrecord">
        <h1>Add New Record</h1>
        <input type="text-addnewrecord" placeholder="Description" /><br />
        <input type="text-addnewrecord" placeholder="Date" /> <br />
        <input type="file" id="document-upload" accept=".pdf,.doc,.docx" /> <br />
        <button className='done-button'>Done</button>
      </div>
    </div>
  );
};

export default Addnewrecord;

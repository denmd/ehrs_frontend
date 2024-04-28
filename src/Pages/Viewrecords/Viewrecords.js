import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Viewrecords.css';

const Viewrecords = () => {
  const location = useLocation();
  const records = location.state && location.state.data ? location.state.data : location.state;

  const [showPDF, setShowPDF] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  
  const handleClick = (recordId) => {
    setSelectedRecord(recordId);
    setShowPDF(recordId);
  };


  const handleClosePDF = () => {
    setShowPDF(null);
  };

  const renderFile = (record) => {
    if (record.data) {
    
      const fileBlob = new Blob([Uint8Array.from(record.data.data)], { type: 'application/pdf' });

  
      const fileUrl = URL.createObjectURL(fileBlob);
      return <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />;
    } else {
      return null;
    }
  };

  return (
    <div className='record-list'>
      <h1> Medical Records  </h1>
      {records ? (
        <ul>
        
          {records.map(record => (
             <div className='record-lists'>
            <li key={record._id}>
              <h3>Title: {record.title}</h3>
              <p>Description: {record.description}</p>
         
              {!showPDF && (
                <button onClick={() => handleClick(record._id)}>View PDF</button>
              )}
              {showPDF === record._id && renderFile(record)}
              {showPDF === record._id && (
                <button onClick={handleClosePDF}>Close PDF</button>
              )}
            </li>
              </div>
          ))}
           
        </ul>
       
      ) : (
        <p>Loading records...</p>
      )}
    </div>
  );
  
};

export default Viewrecords;

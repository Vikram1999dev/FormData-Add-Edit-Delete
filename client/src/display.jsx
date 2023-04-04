import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';

const Display = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/grabformdata');
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFormData();
  }, []);

  return (
    <div className='card-grid'>
      {formData.length > 0 ? (
        formData.map((singleData) => (
          <Card
            key={singleData._id}
            id={singleData._id}
            firstName={singleData.firstName}
            lastName={singleData.lastName}
            email={singleData.email}
            url={singleData.imageUrl}
          />
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Display;

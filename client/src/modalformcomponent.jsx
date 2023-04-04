import React, { useState } from 'react';
import axios from 'axios';

const ModalFormComponent = ({ id, firstName, lastName, email, toggle }) => {
  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [em, setEm] = useState(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:3001/makechange/${id}`,
        {
          firstName: fname,
          lastName: lname,
          email: em,
        },
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3001/itemdelete/${id}`,
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='modal'>
      <button className='modal-close' onClick={toggle}>
        X
      </button>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Edit Contact</h2>
        </div>
        <div className='modal-body'>
          <form>
            <input
              type='text'
              value={fname}
              placeholder='First Name'
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type='text'
              value={lname}
              placeholder='Last Name'
              onChange={(e) => setLname(e.target.value)}
            />
            <input
              type='email'
              value={em}
              placeholder='Email'
              onChange={(e) => setEm(e.target.value)}
            />

            <div className='button-row'>
              <button className='save-button' onClick={handleSubmit}>
                Save
              </button>

              <button className='save-button' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFormComponent;

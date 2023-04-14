import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Test() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState([]);
  const navigate = new useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const selectedIndex = qualification.indexOf(value);

    setQualification((prevSelectedCheckboxes) => {
      if (selectedIndex === -1) {
        return [...prevSelectedCheckboxes, value];
      }

      const newSelectedCheckboxes = [...prevSelectedCheckboxes];
      newSelectedCheckboxes.splice(selectedIndex, 1);
      return newSelectedCheckboxes;
    });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Invalid Email Type');
    } else {
      if (password !== confirmPassword) {
        alert('Password do not Match');
      } else {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('dob', dob);
        formData.append('image', selectedFile);
        formData.append('gender', gender);
        qualification.forEach((value) => {
          formData.append('qualification', value);
        });
        try {
          const response = await axios.post(
            'http://localhost:3001/upload',
            formData,
          );
          console.log('Form Data uploaded successfully!', response.data);
          navigate('/display');
        } catch (error) {
          if (error.response.status === 400) {
            alert(error.response.data.message);
          } else {
            alert('Failed to upload Form Data');
          }
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type='password'
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type='date'
          value={dob}
          placeholder='Date of Birth'
          onChange={(e) => setDob(e.target.value)}
        />
        <input type='file' onChange={handleFileChange} accept='image/*' />
        <div>
          <div>
            <label>
              <input
                type='radio'
                value='Male'
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
          </div>
          <div>
            <label>
              <input
                type='radio'
                value='Female'
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <div>
            <label>
              <input
                type='checkbox'
                value='Engineering'
                checked={qualification.includes('Engineering')}
                onChange={handleCheckboxChange}
              />
              Engineering
            </label>
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                value='Doctor'
                checked={qualification.includes('Doctor')}
                onChange={handleCheckboxChange}
              />
              Doctor
            </label>
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                value='Accountant'
                checked={qualification.includes('Accountant')}
                onChange={handleCheckboxChange}
              />
              Accountant
            </label>
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Test;

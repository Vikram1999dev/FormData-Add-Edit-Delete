import React, { useState } from 'react';
import ModalFormComponent from './modalformcomponent';

const Card = ({ id, firstName, lastName, email, url }) => {
  const [showComponent, setShowComponent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowComponent(!showComponent);
  };
  return (
    <div className='card'>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{email}</p>
      <img
        src={url}
        alt='Image123'
        style={{ width: '100%', maxWidth: '200px' }}
      />
      <button onClick={handleSubmit}>Edit</button>
      {showComponent ? (
        <ModalFormComponent
          key={id}
          id={id}
          firstName={firstName}
          lastName={lastName}
          email={email}
          toggle={handleSubmit}
        />
      ) : null}
    </div>
  );
};

export default Card;

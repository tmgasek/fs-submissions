import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const handleSubmit = (event) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  useEffect(() => {
    // console.log(result);
    if (result.data && result.data.editNumber === null) {
      setError('person not found');
    }
  }, [result.data]); //eslint-disable-line

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>
        <div>
          phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          ></input>
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;

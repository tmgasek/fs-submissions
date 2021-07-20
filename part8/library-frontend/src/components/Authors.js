import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR_BIRTH } from '../queries';

const Authors = ({ show, authors }) => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const [changeBirth, result] = useMutation(EDIT_AUTHOR_BIRTH);

  useEffect(() => {
    if (result.data && result.data.editAuthorBirth === null) {
      console.log('person not found');
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    changeBirth({ variables: { name, birthYear } });

    setName('');
    setBirthYear('');
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>change birth year</h2>
        <form onSubmit={handleSubmit}>
          <label>
            author:
            <select value={name} onChange={onNameChange}>
              <option label=""></option>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          birth year
          <input
            required
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(Number(target.value))}
          ></input>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;

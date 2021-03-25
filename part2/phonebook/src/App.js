import React, { useState } from 'react';

<<<<<<< HEAD
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
=======
const Person = (props) => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNum] = useState('');
  const [filterValue, setNewFilterValue] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    if (checkDuplicate(newName)) {
      window.alert(`${newName} is already on the list!`);
      setNewName('');
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNum('');
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNum(e.target.value);
  };

  const checkDuplicate = (name) => {
    const found = persons.find((p) => p.name === name);
    return found ? true : false;
  };

  const handleFilterChange = (e) => {
    setNewFilterValue(e.target.value);
  };

  const filterName = () => {
    if (filterValue) {
      const filtered = persons.filter((p) => {
        return p.name.includes(filterValue);
      });
      return filtered;
    } else {
      return persons;
    }
  };
>>>>>>> af731fc090230b3af1619180133d8b58808701e4

  return (
    <div>
      <h2>Phonebook</h2>
<<<<<<< HEAD
      <form>
        <div>
          name: <input />
=======
      <div>
        filter shown with{' '}
        <input value={filterValue} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <h1>Add a new </h1>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
>>>>>>> af731fc090230b3af1619180133d8b58808701e4
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
<<<<<<< HEAD
      ...
=======
      {filterName().map((p) => {
        return <Person key={p.name} name={p.name} number={p.number} />;
      })}
>>>>>>> af731fc090230b3af1619180133d8b58808701e4
    </div>
  );
};

export default App;

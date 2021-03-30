import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = (props) => {
  return (
    <div>
      search names:{' '}
      <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{' '}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.filter().map((p) => {
        return (
          <p key={p.name}>
            {p.name} {p.number}
          </p>
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (checkDuplicates()) {
      showAlert(`${newName} already exists in phonebook.`);
      setNewName('');
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const checkDuplicates = () => {
    return persons.find((p) => p.name === newName);
  };

  const showAlert = (message) => {
    return window.alert(message);
  };

  const filter = () => {
    if (newFilter) {
      return persons.filter((p) =>
        p.name.toLowerCase().includes(newFilter.toLowerCase())
      );
    }
    return persons;
  };
  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons filter={filter} />
    </div>
  );
};

export default App;

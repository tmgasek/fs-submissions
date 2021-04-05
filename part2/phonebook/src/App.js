import React, { useEffect, useState } from 'react';
import personService from './services/persons';

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

const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (checkDuplicates()) {
      if (
        window.confirm(
          `${newPerson.name} already exists in phonebook. do you want to update ${newPerson.name}'s number?`
        )
      ) {
        const id = checkDuplicates().id;
        const changedPerson = { ...newPerson, number: newNumber };
        personService.update(id, changedPerson).then((changedPerson) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : changedPerson))
          );
        });

        emptyInputs();
        return;
      } else {
        showAlert(`${newName} already exists in phonebook.`);
        emptyInputs();
        return;
      }
    }

    personService.create(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      emptyInputs();
    });
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

  const emptyInputs = () => {
    setNewName('');
    setNewNumber('');
  };

  const checkDuplicates = () => {
    return persons.find((p) => p.name === newName);
  };

  const showAlert = (message) => {
    return window.alert(message);
  };

  const deletePerson = (id) => {
    personService.remove(id);
    setPersons(persons.filter((p) => p.id !== id));
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
      {filter().map((person, i) => {
        return (
          <Person
            key={i}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        );
      })}
    </div>
  );
};

export default App;

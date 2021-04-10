import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import { Notification } from './components/Notification';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Person } from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [className, setClassName] = useState('');

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
        personService
          .update(id, changedPerson)
          .then((changedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : changedPerson
              )
            );
          })
          .catch((error) => {
            setMessage(
              `${changedPerson.name} was already removed from the server`
            );
            setClassName('error');
            timeOutMessage(3000);
            setPersons(persons.filter((p) => p.id !== id));
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
      setMessage(`${newPerson.name} has been added.`);
      setClassName('success');
      timeOutMessage(3000);
    });
  };

  const timeOutMessage = (length) => {
    setTimeout(() => {
      setMessage(null);
    }, length);
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
    setMessage('entry removed');
    setClassName('success');
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
      <Notification message={message} className={className} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <br />
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

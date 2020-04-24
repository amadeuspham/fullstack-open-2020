import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Person = ({name, number}) => {
  return (
    <p>{name}: {number}</p>
  );
}

const Persons = ({filtering, filteredContacts, persons}) => {
  return (
    <div>
      {filtering 
        ? filteredContacts.map(person => <Person key={person.name} name={person.name} number={person.number}/>)
        : persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)
      }
    </div>
  );
}

const FilterBar = ({filterStatus, setFilterStatus, filterByName}) => {
  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setFilterStatus({
        filterName: '',
        filtering: false,
      });
    } else {
      setFilterStatus({
        filterName: event.target.value,
        filtering: true,
      });
      filterByName(event.target.value);
    }
  }

  return (
    <div>
      <p>Filter by name: </p>
      <input value={filterStatus.filterName} onChange={handleFilterChange}/>
    </div>
  );
}

const PersonForm = (props) => {
  const {handleSubmit, newName, handleNameChange, newPhone, handlePhoneChange} = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterStatus, setFilterStatus ] = useState({
    filterName: '',
    filtering: false,
  })
  const [ filteredContacts, setFilteredContacts ] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const findExisting = (persons, checkPerson) => {
    return persons.find(person => person.name === checkPerson.name);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone,
    }

    const existing = findExisting(persons, nameObject)

    if (existing) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const filterByName = (nameInput) => {
    const filtered = persons.filter(person => person.name.includes(nameInput))
    setFilteredContacts(filtered);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterByName={filterByName}/>
      <h2>Add a new contact</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons filtering={filterStatus.filtering} filteredContacts={filteredContacts} persons={persons}/>
    </div>
  )
}

export default App
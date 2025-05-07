import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterText = (e) => {
        setFilterText(e.target.value)
    }

    const handleAddPerson = (e) => {
        e.preventDefault()

        // Check for all fields
        if (newName == '' || newNumber == '') {
            alert("Complete all fields")
        } else {
            // Check for repeated names
            const foundRepeated = persons.some(person => person.name.includes(newName))

            if (foundRepeated) {
                alert(`${newName} is already added to phonebook`)
            } else {
                setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }))
                setNewName('')
                setNewNumber('')
            }
        }

    }

    const personsShow = filterText == '' ?
        persons :
        persons.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onFilterTextChange={handleFilterText} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                onNumberChange={handleNumberChange}
                onNameChange={handleNameChange}
                onSubmitForm={handleAddPerson} />
            <h3>Numbers</h3>
            <Persons persons={personsShow} />
        </div>
    )
}

export default App
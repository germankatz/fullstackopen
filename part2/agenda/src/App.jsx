import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'
import Notification from './components/Notification'

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')
    const [messageType, setMessageType] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        personsServices.getAll().then((response) => {
            setPersons(response)
        })
    }, [])

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
            const existing = persons.find(p => p.name === newName)

            if (existing) {
                if (window.confirm(`${newName} is already added to your phonebook, replace the old number with a new one?`)) {
                    updatePerson(existing).catch(error => {
                        if (error.status == 404) {
                            showMessage(`${newName} has already been removed from server`, 'error')
                        }
                    })
                }
            } else {
                createPerson()
            }
        }
    }

    const showMessage = (message, type) => {
        setMessageType(type)
        setMessage(message)
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    }

    const createPerson = () => {
        const toCreate = { name: newName, number: newNumber }
        return personsServices.create(toCreate)
            .then(created => {
                // Message
                showMessage(`${newName} has been added`, 'success')
                // Add to persons
                setPersons(ps => ps.concat(created))
                setNewName(""); setNewNumber("");
            })
    }

    const updatePerson = (existing) => {
        const updated = { ...existing, number: newNumber }
        return personsServices.update(existing.id, updated)
            .then(returned => {
                // Message
                showMessage(`${newName} has been updated`, 'success')
                // Update persons
                setPersons(ps => ps.map(p => p.id !== returned.id ? p : returned))
                setNewName(""); setNewNumber("");
            })
    }

    const handleDeletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personsServices.deleteById(id).then(response => {
                // Message
                // showMessage(`${name} has been deleted`, 'success')
                // Delete persons
                setPersons(persons.filter(p => p.id != id))
            }).catch(error => {
                if (error.status == 404) {
                    showMessage(`${name} has already been removed from server`, 'error')
                }
            })
        }
    }

    const personsShow = filterText == '' ?
        persons :
        persons.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification type={messageType} message={message} />
            <Filter onFilterTextChange={handleFilterText} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                onNumberChange={handleNumberChange}
                onNameChange={handleNameChange}
                onSubmitForm={handleAddPerson} />
            <h3>Numbers</h3>
            <Persons
                persons={personsShow}
                onClickDelete={handleDeletePerson} />
        </div>
    )
}

export default App
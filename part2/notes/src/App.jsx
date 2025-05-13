import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'



const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [message, setMessage] = useState(null)
    const [typeMessage, setTypeMessage] = useState("success")


    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])


    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const showMessage = (message, type, time = 5000) => {
        setTypeMessage(type)
        setMessage(
            `Note '${message}' was already removed from server`
        )
        setTimeout(() => {
            setMessage(null)
        }, time)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                showMessage(`Added new note`, "success")
                setNewNote('')
            })
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                showMessage(`Note '${note.content}' was already removed from server`, "error")
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={message} type={typeMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    )
}

export default App 
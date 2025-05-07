const PersonForm = ({ onNameChange, onNumberChange, onSubmitForm, newName, newNumber }) => (
    <form onSubmit={onSubmitForm}>
        <div>name: <input onChange={onNameChange} value={newName} /></div>
        <div>number: <input onChange={onNumberChange} value={newNumber} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm
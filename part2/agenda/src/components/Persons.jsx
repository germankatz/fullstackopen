const Persons = ({ persons, onClickDelete }) => (
    <ul>
        {persons.map(p => <li key={p.id}>{p.name} {p.number} <button onClick={() => onClickDelete(p.id, p.name)}>delete</button></li>)}
    </ul>
)

export default Persons
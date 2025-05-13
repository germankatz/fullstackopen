const Country = ({ name, onShowClick }) => (
    <>
        <div>{name} <button onClick={onShowClick}>Show</button></div>
    </>
)

export default Country
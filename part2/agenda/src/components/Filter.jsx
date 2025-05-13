const Filter = ({ filterText, onFilterTextChange }) => (
    <div>
        filter <input onChange={onFilterTextChange} value={filterText} />
    </div>
)

export default Filter
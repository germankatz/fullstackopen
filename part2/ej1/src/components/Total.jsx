const Total = ({ parts }) => {
    const number = parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return <b>total of {number} exercises</b>
}

export default Total
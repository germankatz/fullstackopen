import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => {

    const finalValue = text == 'positive' ? (value + '%') : value
    return (
        <tr>
            <td>{text}</td>
            <td>{finalValue}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad
    const average = total ? (good - bad) / total : 0
    const positive = total ? (good * 100) / total : 0

    if (total == 0) return <p>No feedback given</p>

    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive} />
            </tbody>
        </table>
    )
}

const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h1>Give feedback</h1>
            <div>
                <Button handleClick={() => setGood(good + 1)} text="good" ></Button>
                <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" ></Button>
                <Button handleClick={() => setBad(bad + 1)} text="bad" ></Button>
            </div>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
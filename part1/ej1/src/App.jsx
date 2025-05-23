const Header = (props) => {
    console.log(props);
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    return <p>Number of exercises {props.number}</p>
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    let acc = 0
    const total = course.parts.forEach(val => {
        acc += val.exercises
    })

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total number={total} />
        </div>
    )
}

export default App
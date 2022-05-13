import React from 'react'
import { useSelector } from 'react-redux'

const Quizzes = () => {
    const { quizzes } = useSelector(state=>state)

    console.log(quizzes)

    return (
        <div>
            <p>yezzur</p>
            {quizzes.value.map(element => {
                return (
                    <div>
                        <p>{element.prompt}</p>
                        <p>{element.question}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Quizzes;
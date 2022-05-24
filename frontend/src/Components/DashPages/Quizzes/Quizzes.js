import React from "react"
import { useSelector } from "react-redux"

const Quizzes = props => {
    const { quizzes } = useSelector(state=>state)

    const renderQuizzes = () => {
        console.log("quizzes: ", quizzes)
        return quizzes.value.map(quiz => {
            return (
                <div>
                    <p>{quiz.prompt}</p>
                    <p>{quiz.text}</p>
                </div>
            )
        })
    }

    return (
        <div>
            {renderQuizzes()}
        </div>
    )
}

export default Quizzes
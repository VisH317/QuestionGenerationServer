import React from "react"

const Quizzes = props => {
    const { quizzes } = useSelector(state=>state)

    const renderQuizzes = () => {
        return quizzes.map(quiz => {
            <div>
                <p>{quiz.prompt}</p>
                <p>{quiz.text}</p>
            </div>
        })
    }

    return (
        <div>
            {renderQuizzes()}
        </div>
    )
}

export default Quizzes
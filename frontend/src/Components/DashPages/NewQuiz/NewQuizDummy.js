import React, { useState } from 'react'
import { createQuiz } from '../../../State/Api/QuizSlice'
import { useDispatch, useSelector } from 'react-redux'

const NewQuizDummy = () => {

    const { user } = useSelector(state=>state)

    const [ prompt, setPrompt ] = useState("")
    const [ question, setQuestion ] = useState("")
    
    const submitHandler = event => {
        event.preventDefault();
        createQuiz(user.value.id, prompt, question)
    }

    const handlePromptChange = event => {
        setPrompt(event.target.value)
    }

    const handleQuestionChange = event => {
        setQuestion(event.target.value)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Prompt:</label>
                <input type="text" value={prompt} onChange={handlePromptChange}/>
                <label>Question:</label>
                <input type="text" value={question} onChange={handleQuestionChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewQuizDummy

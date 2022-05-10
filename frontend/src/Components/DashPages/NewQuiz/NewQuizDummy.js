import React from 'react'
import { useDispatch } from 'react-redux'
import { createQuiz } from '../../../State/Api/QuizSlice'

const NewQuizDummy = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state)
    const [prompt, setPrompt] = useState("")
    const [text, setText] = useState("")

    const promptHandler = event => {
        setPrompt(event.target.value)
    }

    const textHandler = event => {
        setText(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault();
        dispatch(createQuiz(user.value.id, prompt, text))
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Input:</label>
                <input type='text' value={prompt} onChange={promptHandler}/>
                <label>Text:</label>
                <input type='text' value={text} onChange={textHandler}/>
            </form>
        </div>
    )
}

export default NewQuizDummy

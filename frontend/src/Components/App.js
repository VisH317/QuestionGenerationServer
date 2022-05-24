import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'

import { getUser } from '../State/Auth/GoogleAccSlice'
import { getQuizzes } from '../State/Api/QuizSlice'

import Landing from './Landing/Landing'
import Navbar from './Navbar/Navbar'
import Dashboard from './DashPages/DashBoard/Dashboard'
import Quizzes from './DashPages/Quizzes/Quizzes'
import NewQuizDummy from './DashPages/NewQuiz/NewQuizDummy'

// import NewQuiz from './NewQuiz/NewQuiz'

// What is the use of "NavLink"? Wouldn't it be just better just to write the full form?
//     - Why don't we use react-router-dom's link instead of <a href>

const App = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state)

    useEffect(() => {
        const func = async () => {
            if(Object.keys(user.value).length!==0) {
                console.log(user.value.id)
                dispatch(getQuizzes(user.value.id))
            } else {
                dispatch(getUser())
            }
        }
        func()
    }, [user, dispatch])

    if(Object.keys(user.value).length===0) {
        return (
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Landing />} exact/>
                </Routes>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Dashboard/>} exact/>
                    <Route path="/quiz" element={<Quizzes/>} exact/>
                    <Route path="/quiz/new" element={<NewQuizDummy/>} exact/>
                </Routes>
            </BrowserRouter>            
        )
    }
}

export default App


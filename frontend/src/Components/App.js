import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'

import { getUser } from '../State/Auth/GoogleAccSlice'

import Landing from './Landing/Landing'
import Navbar from './Navbar/Navbar'
import Dashboard from './DashPages/DashBoard/Dashboard'
import Quizzes from './DashPages/NewQuiz/Quizzes'
import NewQuizDummy from './DashPages/NewQuiz/NewQuizDummy'

// import NewQuiz from './NewQuiz/NewQuiz'

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        console.log('ran')
    }, [dispatch])

    const { user } = useSelector(state=>state)

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
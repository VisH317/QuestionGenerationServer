import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'

import { getUser } from '../State/Auth/GoogleAccSlice'

import Landing from './Landing/Landing'
import Navbar from './Navbar/Navbar'

// import NewQuiz from './NewQuiz/NewQuiz'

// What is the use of "NavLink"? Wouldn't it be just better just to write the full form?
//     - Why don't we use react-router-dom's link instead of <a href>

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
    }

    if(Object.keys(user.value).length!==0) {
        console.log(user)
        return (
            <div>
                <p>Poggers ure logged in</p>
                <p>{user.value.name}</p>
                <a href="/auth/logout">logout</a>
            </div>
            
        )
    }
}

export default App


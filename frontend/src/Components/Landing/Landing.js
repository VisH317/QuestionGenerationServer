import React from 'react'
import { Link } from 'react-router-dom' 

const Landing = props => {

    return (
        <div>
            <h1>Welcome to GenQ!</h1>
            <a href="/auth/login">click to login</a>
        </div>
    )
}

export default Landing;
import React from "react"
import "./navbar.css"
import Logo from "../../Assets/Logo"
import NavLink from "./NavUtils/NavLink"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = () => {
    
    const { user } = useSelector(state=>state)

    if (Object.keys(user.value).length===0) {
        return (
            <div className="navbar-container">
                <Logo/>
                <NavLink link="/random-page" loc="1">GenQ</NavLink>
                <div className="AboutUs">
                    <NavLink link='/random-page' loc="1">About Us</NavLink>
                </div>
                <NavLink link='/random-page' loc="1">Subscriptions</NavLink>
                <div className="right">
                    <NavLink link="/auth/login" loc="0">Login</NavLink>
                </div>
            </div>
        )
    } else {
        return (
            <div className="navbar-container">
                <Link to="/">
                    <Logo/>
                </Link>
                <div className="right">
                    <NavLink link="/quiz/new" loc="0">New Set</NavLink>
                    <NavLink link="/quiz" loc="0">See Previous Sets</NavLink>
                </div>
            </div>
        )
    }
}

export default Navbar

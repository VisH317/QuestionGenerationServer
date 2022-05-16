import React from "react"
import "./navbar.css"
import Logo from "../../Assets/Logo"
import NavLink from "./NavUtils/NavLink"

const Navbar = () => {
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
}

export default Navbar

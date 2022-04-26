import React from "react"
import "./navbar.css"
import Logo from "../../Assets/Logo"
import NavLink from "./NavUtils/NavLink"

const Navbar = () => {
    return (
        <div className="navbar-container">
            <Logo/>
            <NavLink link="/random-page" loc="1">GenQ</NavLink>
            <NavLink link="/random-page" loc="1">About</NavLink>
            <div className="right">
                <NavLink link="/auth/login" loc="0">Login</NavLink>
            </div>
        </div>
    )
}

export default Navbar
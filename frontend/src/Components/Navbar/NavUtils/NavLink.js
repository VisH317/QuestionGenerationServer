import React from 'react'
import { Link } from 'react-router-dom'
import './NavLink.css'

const NavLink = props => {
    
    const renderLink = () => {
        if(props.loc==='0') return <a href={props.link} className="link">{props.children}</a>
        if(props.loc==='1') return <Link to={props.link} className="link">{props.children}</Link>
    }
    
    return (
        <div className='navlink-container'>
            {renderLink()}
        </div>
    )
}

export default NavLink
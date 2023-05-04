import './Style/NavBar.css'
import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

const NavBar = (props) => {

    const nav = useNavigate() 
   
    const logoutHandler = (event) => {
        event.preventDefault();
        sessionStorage.clear()
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("user");
        props.setIsLoggedIn(sessionStorage.getItem("userId"));
        props.setIsAdmin(sessionStorage.getItem("isAdmin"));
        props.setUser(sessionStorage.getItem("user"));
        nav("/")
    }

    return (
        <nav className="navbar">
            <h1 className = "title"> <Link to ="/">Cinema E-booking System</Link></h1>
            <ul className='nav-list'>
            <Link to = '/'> <li>Home</li></Link>
            <Link to = '/search'><li>Search</li></Link>
                    {!props.isLoggedIn && <Link to='/login'><li> Login</li></Link>}
                    {props.isLoggedIn && <Link to='/'><li onClick={logoutHandler}> Logout</li></Link>}
                    {props.isAdmin && <Link to='/manage-movies'><li> Manage Movies</li></Link>}
                    {props.isAdmin && <Link to='/manage-promos'><li>Manage Promotions</li></Link>}
                    {props.isAdmin && <Link to='/manage-users'><li>Manage Users</li></Link>}
                    {props.isLoggedIn && <Link to='/profile'><li> Edit Profile</li></Link>}
            </ul>
        </nav>
    )
};
export default NavBar;
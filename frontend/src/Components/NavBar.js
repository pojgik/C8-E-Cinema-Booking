import './Style/NavBar.css'
import { Link } from 'react-router-dom';
import { useState,useEffect,useNavigate } from 'react';

const NavBar = (props) => {
   
    const logoutHandler = (event) => {
        event.preventDefault();
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("user");
        props.setIsLoggedIn(sessionStorage.getItem("userId"));
        props.setIsAdmin(sessionStorage.getItem("isAdmin"));
        props.setUser(sessionStorage.getItem("user"));
    }

    return (
        <nav className="navbar">
            <h1 className = "title">Cinema E-booking System</h1>
            <ul className='nav-list'>
                <li><Link to = '/'> Home</Link></li>
                <li><Link to = '/search'>Search</Link></li>
                    {!props.isLoggedIn && <li><Link to='/login'> Login</Link></li>}
                    {props.isLoggedIn && <li onClick={logoutHandler}><Link to='/'> Logout</Link></li>}
                    {props.isAdmin && <li><Link to='/manage-movies'> Manage Movies</Link></li>}
                    {props.isAdmin && <li><Link to='/manage-promos'>Manage Promotions</Link></li>}
                    {props.isAdmin && <li><Link to='/manage-users'>Manage Users</Link></li>}
                    {props.isLoggedIn && <li><Link to='/profile'> Edit Profile</Link></li>}
            </ul>
        </nav>
    )
};
export default NavBar;
import './Style/NavBar.css'
import { Link } from 'react-router-dom';
import { useState,useEffect,useNavigate } from 'react';

const NavBar = (props) => {
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin'));

    useEffect(() => {
        setIsAdmin(sessionStorage.getItem("isAdmin"))
        setUserId(sessionStorage.getItem('userId'))
        console.log("user ID" , userId);
        console.log("Admin" , isAdmin);
      },[sessionStorage.getItem('isAdmin'),sessionStorage.getItem('userId')]);

    const logoutHandler = (event) => {
        event.preventDefault();
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("isAdmin");
        // console.log(sessionStorage.getItem("userId"))
        // console.log(sessionStorage.getItem("isAdmin"))
        props.setIsLoggedIn(sessionStorage.getItem("userId"));
        props.setIsAdmin(sessionStorage.getItem("isAdmin"));

    }

    return (
        <nav className="navbar">
            {/* <img className = "icon" src = '\images\icon-removebg-preview.png' ></img> */}
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
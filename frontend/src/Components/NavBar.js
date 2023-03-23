import './Style/NavBar.css'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

const NavBar = (props) => {
    console.log(props)
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isCustomer,setIsCustomer] = useState(false)

    useEffect(()=> {
        console.log(props)
        if (props.currentUser) {
            console.log("hello")
            setIsLoggedIn(true)
            if (props.currentUser.userType === "ADMIN") {
                setIsAdmin(true)
            }
            if (props.currentUser.userType === "CUSTOMER") {
                setIsCustomer(true)
            }
        }
        
    },[props.currentUser])
    console.log("is logged in",isLoggedIn)
    console.log("is admin",isAdmin)
    console.log("is customer",isCustomer)

    const logoutHandler = (event) => {
        event.preventDefault();
        setIsLoggedIn(false);
        sessionStorage.removeItem("userId",props.userId)
    }
    return (
        <nav className="navbar">
            {/* <img className = "icon" src = '\images\icon-removebg-preview.png' ></img> */}
            <h1 className = "title">Cinema E-booking System</h1>
            <ul className='nav-list'>
                <li><Link to = '/'> Home</Link></li>
                <li><Link to = '/search'>Search</Link></li>
                {!isLoggedIn ? (<li><Link to = '/login'> Login</Link></li>) :(<li onClick={logoutHandler}><Link to = '/'> Logout</Link></li>)}
                {isAdmin ? (<li><Link to = '/manage-movies'> Manage Movies</Link></li>): (<div></div>)}
                {isAdmin ? (<li><Link to = '/manage-promos'>Manage Promotions</Link></li>):(<div></div>)}
                {isAdmin ? (<li><Link to = '/manage-users'>Manage Users</Link></li>) : (<div></div>)}
                {isCustomer ? (<li><Link to = '/profile'> Edit Profile</Link></li>) :(<div></div>)}
            </ul>
        </nav>
    )
};
export default NavBar;
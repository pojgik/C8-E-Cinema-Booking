import './Style/NavBar.css'
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <nav className="navbar">
            {/* <img className = "icon" src = '\images\icon-removebg-preview.png' ></img> */}
            <h1 className = "title">Cinema E-booking System</h1>
            <ul className='nav-list'>
                <li><Link to = '/'> Home</Link></li>
                <li><Link to = '/search'>Search</Link></li>
                <li><Link to = '/login'> Login</Link></li>
                <li><Link to = '/manage-movies'> Manage Movies</Link></li>
                <li><Link to = '/manage-promos'>Manage Promotions</Link></li>
                <li><Link to = '/manage-users'>Manage Users</Link></li>
            </ul>
        </nav>
    )
};
export default NavBar;
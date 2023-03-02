import './Style/NavBar.css'
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <nav className="navbar">
            {/* <img className = "icon" src = '\images\icon-removebg-preview.png' ></img> */}
            <h1 className = "title">Cinema E-booking System</h1>
            <ul className='nav-list'>
                <Link to = '/'><li> <a href = "#">Home</a></li></Link>
                <Link to = '/search'><li> <a href = "#">Search</a></li></Link>
                <Link to = '/login'><li> <a href = "#">Login</a></li></Link>
                <Link to = '/manage-movies'><li> <a href = "#">Manage Movies</a></li></Link>
                <Link to = 'manage-promos'><li> <a href = "#">Manage Promotions</a></li></Link>
            </ul>
        </nav>
    )
};
export default NavBar;
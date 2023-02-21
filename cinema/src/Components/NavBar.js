import './Style/NavBar.css'
const NavBar = () => {
    return (
        <nav className="navbar">
            {/* <img className = "icon" src = '\images\icon-removebg-preview.png' ></img> */}
            <h1 className = "title">Cinema E-booking System</h1>
            <ul className='nav-list'>
                <li> <a href = "#">Home</a></li>
                <li> <a href = "#">Search</a></li>
                <li> <a href = "#">Login</a></li>
                <li> <a href = "#">Manage Movies</a></li>
                <li> <a href = "#">Manage Promotions</a></li>
            </ul>
        </nav>
    )
};
export default NavBar;
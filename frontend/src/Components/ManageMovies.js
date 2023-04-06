import './Style/ManageMovies.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import Search from './Forms/Search';
import { Link } from 'react-router-dom';

const ManageMovies = (props) => {
    // console.log(props)
    return (
        <div className="window">
            <ul className='manage-header'>
            <h1 className="form-heading">Manage Movies</h1> 
            <li>
            <div className="add-movie"><Link className='add-movie-btn' to='/schedule-movies'> Schedule a movie </Link></div>
            </li>
            <li>
            <div className="add-movie"><Link className='add-movie-btn' to='/add-movie'> Add a movie </Link></div>
            </li>
            </ul>
            <Search filteredMovies = {props.filteredMovies} setFilteredMovies = {props.setFilteredMovies} ></Search>
        </div>
    )

}

export default ManageMovies;
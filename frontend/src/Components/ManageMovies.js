import './Style/ManageMovies.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import Search from './Forms/Search';
import { Link } from 'react-router-dom';

const ManageMovies = ({placeholder,data}) => {
    return (
        <div className="window">
            <ul className='manage-header'>
            <h1 className="form-heading">Manage Movies</h1> 
            <div className="add-movie"><Link className='add-movie-btn' to='/add-movie'> Add a movie </Link></div>
            </ul>
            <Search></Search>
        </div>
    )

}

export default ManageMovies;
import './Style/ManageMovies.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import Search from './Forms/Search';

const ManageMovies = ({placeholder,data}) => {
    return (
        <div className="window">
            <ul className='manage-header'>
            <h1 className="form-heading">Manage Movies</h1> 
            <div className="add-movie"><a className='add-movie-btn' href='#'> Add a movie </a></div>
            </ul>
            <Search></Search>
                
        </div>
    )

}

export default ManageMovies;
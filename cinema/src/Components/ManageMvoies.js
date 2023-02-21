import './Style/ManageMovies.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"

const ManageMovies = ({placeholder,data}) => {
    return (
        <div className="window">
            <h1 className="header">Manage Movies <div className="add-movie"><a className='add-movie-btn' href='#'> Add a movie </a></div></h1>
            <div className="search-box">
                <h2> Search by name</h2>
                <div className="title-search">
                <input type="search" className="search" placeholder='Movie Title...' />
                <button type='submit' className='search-btn'><FaSearch/></button>
                </div>
                <h2> Search by genre</h2>
                <select type="select" className='search'> 
                    <option selected disabled value = "" > Genre</option>
                    <option value="action">Action</option>
                    <option value="western">Western</option>
                    <option value="drama">Drama</option>
                    <option value="scifi">Science Fiction</option>
                    <option value="thriller">Thriller</option>
                    <option value="comedy">Comedy</option>
                    <option value="romance">Romance</option>
                </select>
                <h2> Search by age</h2>
                <select type="select" className='search'> 
                    <option selected disabled value = "" > Rating</option>
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg13">PG-13</option>
                    <option value="r">R</option>
                    <option value="nc17">NC-17</option>
                </select>
                <h2> Search by date</h2>
                <input type="date" name="show-date" id="show-date" className='search'/>
            </div>
                
        </div>
    )

}

export default ManageMovies;
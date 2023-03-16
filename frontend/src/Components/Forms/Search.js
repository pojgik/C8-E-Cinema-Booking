import {FaSearch} from "react-icons/fa";
import "./Form-Style/Search.css"
const Search = () => {
    return (
        <div className='reg'>
        <h1 className='form-heading'>Search For Moives</h1>
        <div className="add-window">
        <form className="add">
            <ul>
            <input type="search" placeholder='movie title' />
            </ul>
            <ul>
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
            </ul>
            <ul>
            <select type="select" className='search'> 
                    <option selected disabled value = "" > Rating</option>
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg13">PG-13</option>
                    <option value="r">R</option>
                    <option value="nc17">NC-17</option>
                </select>
            </ul>
            <ul>
                <label> Show Date </label>
            </ul>
            <ul>
                <input className = "search" type= 'date'/>
            </ul>
            <ul className="form-btn">
            <button className = "submit" type='submit'> Search</button>
            </ul>
        </form>
    </div>
    </div>
       
    )
}

export default Search;
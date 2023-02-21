import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'

const UpdateMovie = () => {
    return (
        <div>
        <h1 className='form-heading'>Update this movie</h1>
        <div className="add-window">
            
            <form className="add">
                <ul>
                <label>Movie Title:</label>
                <input  required className = 'update-in' type="text" name = 'title' placeholder='this title'/>
                </ul>
                <ul>
                <label>Category:</label>
                <input required className = 'update-in' type="text" name = 'cat' placeholder='this category'/>
                </ul>
                <ul>
                <label>Cast:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='this cast'/>
                </ul>
                <ul>
                <label>Director:</label>
                <input required className  = 'update-in' type="text" name = 'title' placeholder='this director'/>
                </ul>
                <ul>
                <label>Producer:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='this producer'/>
                </ul>
                <ul>
                <label>Synopsis:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='this synopsis'/>
                </ul>
                <ul>
                <label>Reviews:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='these reviews'/>
                </ul>
                <ul>
                <label>Trailer Picture:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='this photo url'/>
                </ul>
                <ul>
                <label>Trailer Video:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='this trailer url'/>
                </ul>
                <ul>
                <label>Rating Code:</label>
                <input  required className = 'update-in' type="text" name = 'title'placeholder='this rating code'/>
                </ul>
                <ul>
                <label>Show Dates and Times:</label>
                <input required className = 'update-in' type="text" name = 'title'placeholder='these times and dates'/>
                </ul>
                <button required className = 'submit' type="subimt">Update</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateMovie
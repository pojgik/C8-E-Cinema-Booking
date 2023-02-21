import './Form-Style/AddMovie.css'

const AddMovie = () => {
    return (
        <div>
        <h1 className='form-heading'>Add a new movie</h1>
        <div className="add-window">
            
            <form className="add">
                <ul>
                <label>Movie Title:</label>
                <input type="text" name = 'title' required/>
                </ul>
                <ul>
                <label>Category:</label>
                <input type="text" name = 'cat' required/>
                </ul>
                <ul>
                <label>Cast:</label>
                <input type="text" name = 'case'required/>
                </ul>
                <ul>
                <label>Director:</label>
                <input type="text" name = 'director'required/>
                </ul>
                <ul>
                <label>Producer:</label>
                <input type="text" name = 'producer'required/>
                </ul>
                <ul>
                <label>Synopsis:</label>
                <input type="text" name = 'synopsis'required/>
                </ul>
                <ul>
                <label>Reviews:</label>
                <input type="text" name = 'reviews'required/>
                </ul>
                <ul>
                <label>Trailer Picture:</label>
                <input type="text" name = 'pic'required/>
                </ul>
                <ul>
                <label>Trailer Video:</label>
                <input type="text" name = 'video'required/>
                </ul>
                <ul>
                <label>Rating Code:</label>
                <input type="text" name = 'rating'required/>
                </ul>
                <ul>
                <label>Show Dates and Times:</label>
                <input type="text" name = 'when'required/>
                </ul>
                <button className = 'submit' type="subimt">Add</button>
            </form>
        </div>
        </div>
    )
}

export default AddMovie;
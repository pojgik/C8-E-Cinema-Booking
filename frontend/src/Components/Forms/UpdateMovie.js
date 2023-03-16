import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'

const UpdateMovie = () => {
    return (
        <div className='reg'>
        <h1 className='form-heading'>Update this movie</h1>
        <div className="add-window">
            
            <form className="add">
                <ul>
                <input  required type="text" name = 'title' placeholder='this title'/>
                </ul>
                <ul>
                <input required type="text" name = 'cat' placeholder='this category'/>
                </ul>
                <ul>
                <input required type="text" name = 'title'placeholder='this cast'/>
                </ul>
                <ul>
                <input required type="text" name = 'title' placeholder='this director'/>
                </ul>
                <ul>
                <input required type="text" name = 'title'placeholder='this producer'/>
                </ul>
                <ul>
                <input required type="text" name = 'title'placeholder='this synopsis'/>
                </ul>
                <ul>
                <input required type="text" name = 'title'placeholder='these reviews'/>
                </ul>
                <ul>
                <input required  type="text" name = 'title'placeholder='this photo url'/>
                </ul>
                <ul>
                <input required type="text" name = 'title'placeholder='this trailer url'/>
                </ul>
                <ul>
                <input  required type="text" name = 'title'placeholder='this rating code'/>
                </ul>
                <ul>
                <input required  type="text" name = 'title'placeholder='these times and dates'/>
                </ul>
                <button required className = 'submit' id = "update-btn" type="subimt">Update</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateMovie
import { useParams } from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'

const handleInputChange = (event) => {

}
const submitHandler = (event) => {

}

const UpdateMovie = () => {
    const title = useParams()
    console.log(title)
    return (
        <div className='reg '>
        <h1 className='form-heading'>Edit movie</h1>
        <div id = "payment" className="add-window">
        <form onSubmit = {submitHandler} id = "payment-form"className="add">
        <div className='card-info'>
            <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Movie Title" type="text" name = 'title' required/>
                     </ul>
                     <ul>
                     <select name = 'category' onChange = {(e)=>handleInputChange(e)} required type="select" className='search'> 
                        <option selected disabled value = "" > Genre</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="musical">Musical</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="scifi">Science Fiction</option>
                        <option value="sports">Sports</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                    </select>
                     {/* <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Category" type="text" name = 'category' required/> */}
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Cast" type="text" name = 'cast'required/>
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Director" type="text" name = 'director'required/>
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Producer" type="text" name = 'producer'required/>
                     </ul>
            </div>
        <div className="billing-info">
        <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Synopsis" type="text" name = 'synopsis'required/>
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Reviews"type="text" name = 'reviews'required/>
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Trailer Picture" type="text" name = 'pic'required/>
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Trailer Video" type="text" name = 'video'required/>
                     </ul>
                     <ul>
                     <select name = "rating" onChange = {(e)=>handleInputChange(e)} type="select" className='search' required> 
                        <option selected disabled value = "" > Rating</option>
                        <option value="g">G</option>
                        <option value="pg">PG</option>
                        <option value="pg13">PG-13</option>
                        <option value="r">R</option>
                        <option value="nc17">NC-17</option>
                    </select>
                     {/* <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Rating Code" type="text" name = 'rating'required/> */}
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Show Dates and Times" type="text" name = 'when'/>
                     </ul>
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
        <button form = "payment-form" className = 'submit' type="subimt">Edit</button>
        </ul>
    </div>
</div>
</div>
    )
}

export default UpdateMovie
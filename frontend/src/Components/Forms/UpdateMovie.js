import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'


const UpdateMovie = (props) => {


    console.log(props)
    const handleInputChange = (event) => {
        event.preventDefault();
        const {name,value} = event.target; 
        if (name === "title") {
            setTitle(value);
        }
        if (name === "category") {
            setCategory(value);
        }
        if (name === "cast") {
            setCast(value);
        }
        if (name === "director") {
            setDirector(value);
        }
        if (name === "producer") {
            setProducer(value);
        }
        if (name === "synopsis") {
            setSynopsis(value);
        }
        if (name === "reviews") {
            setReviews(value);
        }
        if (name === "pic") {
            setPic(value);
        }
        if (name === "video") {
            setVideo(value);
        }
        if (name === "rating") {
            setRating(value);
        }
    }
    const submitHandler = (event) => {
        const updatedMovie = {

        }
        
    }
    // const [movie,setMovie] = useState(null)
    const [title,setTitle] = useState(useParams().id);
    const [cast,setCast] = useState(props.currentMovie.cast);
    const [category,setCategory] = useState(props.currentMovie.category);
    const [director,setDirector] = useState(props.currentMovie.director);
    const [producer,setProducer] = useState(props.currentMovie.producer);
    const [synopsis,setSynopsis] = useState(props.currentMovie.synopsis);
    const [reviews,setReviews] = useState(props.currentMovie.reviews);
    const [pic,setPic] = useState(props.currentMovie.coverURL);
    const [video,setVideo] = useState(props.currentMovie.trailerURL);
    const [rating,setRating] = useState(props.currentMovie.rating);
    // useEffect(() => {
        
    //     fetch("http://localhost:8080/movies/searchTitle/" + title,{
    //         method: "GET",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type":"application/json",
    //             "Accept":"application/json"
    //         }
    //     })
    //     .then (res=>res.json())
    //     .then(data => {
    //         setCast(data[0].cast)
    //         setCategory(data[0].category)
    //         setDirector(data[0].director)
    //         setProducer(data[0].producer)
    //         setSynopsis(data[0].synopsis)
    //         setReviews(data[0].reviews)
    //         setPic(data[0].coverURL)
    //         setVideo(data[0].trailerURL)
    //         setRating(data[0].rating)

    //     })
    // })

    return (
        <div className='reg '>
        <h1 className='form-heading'>Edit movie</h1>
        <div id = "payment" className="add-window">
        <form onSubmit = {submitHandler} id = "payment-form"className="add">
        <div className='card-info'>
            <ul>
                     <input  value = {title} onChange = {(e)=>handleInputChange(e)} placeholder = "Movie Title" type="text" name = 'title' required/>
                     </ul>
                     <ul>
                     <select value = {category} name = 'category' onChange = {(e)=>handleInputChange(e)} required type="select" className='search'> 
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
                     </ul>
                     <ul>
                     <input  value = {cast} onChange = {(e)=>handleInputChange(e)} placeholder = "Cast" type="text" name = 'cast'required/>
                     </ul>
                     <ul>
                     <input value = {director} onChange = {(e)=>handleInputChange(e)} placeholder = "Director" type="text" name = 'director'required/>
                     </ul>
                     <ul>
                     <input value = {producer} onChange = {(e)=>handleInputChange(e)} placeholder = "Producer" type="text" name = 'producer'required/>
                     </ul>
            </div>
        <div className="billing-info">
        <ul>
                     <input  value = {synopsis} onChange = {(e)=>handleInputChange(e)} placeholder = "Synopsis" type="text" name = 'synopsis'required/>
                     </ul>
                     <ul>
                     <input value = {reviews} onChange = {(e)=>handleInputChange(e)} placeholder = "Reviews"type="text" name = 'reviews'required/>
                     </ul>
                     <ul>
                     <input  value = {pic} onChange = {(e)=>handleInputChange(e)} placeholder = "Trailer Picture" type="text" name = 'pic'required/>
                     </ul>
                     <ul>
                     <input value = {video} onChange = {(e)=>handleInputChange(e)} placeholder = "Trailer Video" type="text" name = 'video'required/>
                     </ul>
                     <ul>
                     <select value = {rating} name = "rating" onChange = {(e)=>handleInputChange(e)} type="select" className='search' required> 
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
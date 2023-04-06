import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form-Style/AddMovie.css'



const AddMovie = () => {

    const nav = useNavigate();
    const [title,setTitle] = useState(null);
    const [category,setCategory] = useState(null);
    const [cast,setCast] = useState(null);
    const [director,setDirector] = useState(null);
    const [producer,setProducer] = useState(null);
    const [synopsis,setSynopsis] = useState(null);
    const [reviews,setReviews] = useState("");
    const [pic,setPic] = useState(null);
    const [video,setVideo] = useState(null);
    const [rating,setRating] = useState(null);
    const [out,setOut] = useState(false);



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
        // if (name === "out") {
        //     setWhen(value);
        // }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const movie = {
            title: title,
            category: category,
            cast: cast,
            director: director,
            producer: producer,
            synopsis: synopsis,
            reviews: reviews,
            coverURL: pic,
            trailerURL: video,
            rating: rating,
            nowPlaying: out
            // when: when
        }
        fetch("http://localhost:8080/movies/addMovie",{
            method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(movie)
        })
        .then(res=> res.json())
        .then(data=>console.log(data))
        nav("/manage-movies")
    }

    return (
        <div className='reg '>
        <h1 className='form-heading'>Add a new movie</h1>
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
                     </ul>
                     <ul>
                     <ul>
                        <label className='reg-field'>Is the Movie Out Yet?</label>
                        <input checked = {out} onChange = {(e)=>{setOut(!out)
                        console.log(out)}}  className='reg-field' type="checkbox" name = 'out'></input>
                        </ul>
                     </ul>
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
        <button form = "payment-form" className = 'submit' type="subimt">Add</button>
        </ul>
    </div>
</div>
</div>
        // <div className='reg'>
        // 
        // <div id = "add-movie" className="add-window">
        //     <form className="add">
        //         <div className="left">
        //            
        //         </div>
        //         <div className="right">
        //            
        //         </div>
        //     </form>
        //     <div className='payment-btn'>
        //     <ul >
        //     <button form = "payment-form" className = 'submit' type="subimt">Add</button>
        //     </ul>
        //     </div>
        // </div>
        // </div>
    )
}

export default AddMovie;
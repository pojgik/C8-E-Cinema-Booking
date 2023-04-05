import { useState } from 'react';
import './Form-Style/AddMovie.css'



const AddMovie = () => {

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
    const [when,setWhen] = useState(null);



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
        if (name === "when") {
            setWhen(value);
        }
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
            when: when
        }
        console.log(movie)
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
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Category" type="text" name = 'category' required/>
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
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Rating Code" type="text" name = 'rating'required/>
                     </ul>
                     <ul>
                     <input  onChange = {(e)=>handleInputChange(e)} placeholder = "Show Dates and Times" type="text" name = 'when'required/>
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
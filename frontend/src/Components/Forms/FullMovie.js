import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'


const FullMovie = () => {
    
    const submitHandler = (event) => {
        const updatedMovie = {
        }
        
    }
    const [currentMovie,setCurrentMovie] = useState()
    const [title,setTitle] = useState(useParams().id);
    // const [cast,setCast] = useState(null);
    // const [category,setCategory] = useState();
    // const [director,setDirector] = useState(null);
    // const [producer,setProducer] = useState(null);
    // const [synopsis,setSynopsis] = useState(null);
    // const [reviews,setReviews] = useState("");
    // const [pic,setPic] = useState(null);
    // const [video,setVideo] = useState(null);
    // const [rating,setRating] = useState(null);
    useEffect(()=>{
        fetch("http://localhost:8080/movies/searchTitle/" + title,{
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        .then (res=>res.json())
        .then(data => {
            setCurrentMovie(data)
        })
        console.log(currentMovie)
            // setCast(data[0].cast)
            // console.log(data[0].cast)
            // setCategory(data[0].category)
            // setDirector(data[0].director)
            // setProducer(data[0].producer)
            // setSynopsis(data[0].synopsis)
            // setReviews(data[0].reviews)
            // setPic(data[0].coverURL)
            // setVideo(data[0].trailerURL)
            // setRating(data[0].rating)
        // console.log(movie)

    },[])
    return (
        <div className='reg '>
        <h1 className='form-heading'>Edit movie</h1>
        <div id = "payment" className="add-window">
        <form onSubmit = {submitHandler} id = "payment-form"className="add">
        <div className='card-info'>
            <ul>
                <label >Title: </label>
                {/* <label >{movie.title}</label> */}
            </ul>
            <ul>
                <label >Category: </label>
                {/* <label >{movie.category}</label> */}
            </ul>
             <ul>
                <label >Cast: </label>
                {/* <label >{movie.cast}</label> */}
            </ul>
            <ul>
                <label >Director: </label>
                {/* <label >{movie.director}</label> */}
            </ul>
            <ul>
                <label >Producer: </label>
                {/* <label >{movie.producer}</label> */}
            </ul>
            </div>
        <div className="billing-info">
            <ul>
                <label >Synopsis: </label>
                {/* <label >{movie.synopsis}</label> */}
            </ul>
            <ul>
                <label >Reviews: </label>
                {/* <label >{movie.reviews}</label> */}
            </ul>
            <ul>
                
            </ul>
            <ul>
                <label >Rating: </label>
                {/* <label>{currentMovie.rating}</label> */}
             </ul>
            <ul>
            </ul>
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
            {/* <iframe src = {movie.trailerURL}></iframe> */}
        </ul>
    </div>
</div>
</div>
    )
}

export default FullMovie
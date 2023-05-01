import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'


const Booking = (props) => {

    const [showings,setShowings] = useState(null)
    const [title,setTitle] = useState(useParams().id);
    const [cast,setCast] = useState(null);
    const [category,setCategory] = useState();
    const [director,setDirector] = useState(null);
    const [producer,setProducer] = useState(null);
    const [synopsis,setSynopsis] = useState(null);
    const [reviews,setReviews] = useState("");
    const [pic,setPic] = useState(null);
    const [video,setVideo] = useState(null);
    const [rating,setRating] = useState(null);
    const [nowPlaying,setNowPlaying] = useState(null)
    
    useEffect(() => {

       
        
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
            setCast(data.cast)
            setCategory(data.category)
            setDirector(data.director)
            setProducer(data.producer)
            setSynopsis(data.synopsis)
            setReviews(data.reviews)
            setPic(data.coverURL)
            setVideo(data.trailerURL)
            setRating(data.rating)
            setNowPlaying(data.nowPlaying)
            fetch("http://localhost:8080/movies/getShowsForMovie/" + title)
            .then(res=>res.json())
            .then(data=>{
                const shows = data;
                setShowings(shows)
            })

        })
    },[])
    
    return (
        <div className='reg '>
        <h1 className='form-heading'>Book {title} Now</h1>
        <div id = "payment" className="add-window">
        <form  id = "payment-form"className="add">
        <div className='card-info'>
            {/* <ul>
                <label >Title: </label>
                <label >{title}</label>

            </ul>
            <ul>
                <label >Category: </label>
                <label >{category}</label>
            </ul>
             <ul>
                <label >Cast: </label>
                <label >{cast}</label>
            </ul>
            <ul>
                <label >Director: </label>
                <label >{director}</label>
            </ul>
            <ul>
                <label >Producer: </label>
                <label >{producer}</label>
            </ul> */}
            </div>
        <div className="billing-info">
            {/* <ul>
                <label >Synopsis: </label>
                <label >{synopsis}</label>
            </ul>
            <ul>
                <label >Reviews: </label>
                <label >{reviews}</label>
            </ul>
            <ul>
                
            </ul>
            <ul>
                <label >Rating: </label>
                <label>{rating}</label>
             </ul>
            <ul>
                <label >Now Playing: </label>
                {nowPlaying === true && <label>True</label>}
                {nowPlaying === false && <label>False</label>}
            </ul> */}
            <ul>
                <label >Showings:</label>
                    <select className="search">
                    { showings !== null && <option selected disabled>Available Showings</option>}
                    {
                        showings !== null && showings.map((show) => {
                            const timeString = show.showTime
                            const date = timeString.substring(0,10)
                            const time = timeString.substring(11,16)
                            const dateTime = date + " at " + time
                            return(
                            <option selected disabled>{dateTime}</option>)

                        }) 
                    }
                </select>
            </ul>
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
            <button className='submit '>Book</button>
        </ul>
    </div>
</div>
</div>
    )
}

export default Booking
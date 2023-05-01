import './Style/Card.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Card = (props) => {


    const clickHandler = (event) => {
        event.preventDefault()
       

            fetch("http://localhost:8080/movies/searchTitle/" + props.title)
            .then(res=> res.json())
            .then(data=>{
                props.setCurrentMovie(data)
            })
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/movies/searchTitle/" + props.title)
        .then(res=> res.json())
        .then(data=>{
            fetch("http://localhost:8080/movies/deleteMovie/" + data.movieId,{
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            .then(res=>res.json())
            .then(newData=>{
                console.log(newData)
                props.setFilteredMovies(props.filteredMovies.filter(movie => movie.title !== props.title ))
                console.log(props)
            })
        })
    }
    
    return (
        <div  className = "card">
            <h1> {props.title} ({props.rating}) </h1>  
            <div className='frame'> 
                <iframe src = {props.link}></iframe>
            </div>
            <div className="card-btns">
                {props.isLoggedIn &&<button className='card-btn'><Link to = {`/booking/${props.title.toString()}`}>Book Now</Link></button>}
                <button onClick = {clickHandler} className='card-btn'><Link  to = { `/full-movie/${props.title.toString()}`}> More Info</Link></button>
                {props.isAdmin&& <button onClick = {deleteHandler} className="card-btn"><Link>Delete Movie</Link></button>}
                {props.isAdmin && <button onClick={clickHandler} className="card-btn"> <Link to = {`/update-movie/${props.title.toString()}`}>Edit Movie</Link></button>}
            </div>
        </div>
        
    )
}



export default Card;
import './Style/Card.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Card = (props) => {

    const clickHandler = (event) => {
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
                props.setCounter(props.counter + 1)
            })
        })
    }
    
    return (
        <Link to = { `/full-movie/${props.title.toString()}`}>
        <div  className = "card">
            <h1> {props.title} ({props.rating}) </h1>  
            <div className='frame'> 
                <iframe src = {props.link}></iframe>
            </div>
            <div className="card-btns">
                {props.isAdmin&& <button onClick = {deleteHandler} className="card-btn"><Link>Delete Movie</Link></button>}
                {props.isAdmin &&  <Link className = "book-btn" to = {`/update-movie/${props.title.toString()}`}><button onClick={clickHandler} className="card-btn">Edit Movie</button></Link>}
                {props.isLoggedIn &&<Link className = "book-btn" to = {`/booking/${props.title.toString()}`}><button className='card-btn'>Book Now</button></Link>}
            </div>
        </div>
        </Link>
        
    )
}



export default Card;
import './Style/Card.css'
import { Link } from 'react-router-dom'

const Card = (props) => {

    const clickHandler = (event) => {
        event.preventDefault()
        fetch("http://localhost:8080/movies/searchTitle/" + props.title)
        .then(res=> res.json())
        .then(data=>{
            console.log(data)

            props.setCurrentMovie(data)
        })
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/movies/searchTitle/" + props.title)
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            console.log(data[0].movieId)
            fetch("http://localhost:8080/movies/deleteMovie/" + data[0].movieId,{
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
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
                {props.isLoggedIn &&<button className='card-btn'><a href='#'> Book Now</a></button>}
                <button onClick = {clickHandler} className='card-btn'><Link  to = { `/full-movie/${props.title.toString()}`}> More Info</Link></button>
                {props.isAdmin&& <button onClick = {deleteHandler} className="card-btn"><a href="#">Delete Movie</a></button>}
                {props.isAdmin && <Link to = {`/update-movie/${props.title.toString()}`} ><button className="card-btn"><a href="#">Edit Movie</a></button></Link>}
            </div>
        </div>
        
    )
}



export default Card;
import './Style/Card.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <div  className = "card">
            <h1> {props.title} </h1>  
            <div className='frame'> 
                <iframe src = {props.link}></iframe>
            </div>
            <div className="card-btns">
                {props.isLoggedIn &&<button className='card-btn'><a href='#'> Book Now</a></button>}
                <button className='card-btn'><a href='#'> More Info</a></button>
                {props.isAdmin&& <button className="card-btn"><a href="#">Delete Movie</a></button>}
                {props.isAdmin && <Link to = {`/update-movie/${props.title.toString()}`} ><button className="card-btn"><a href="#">Edit Movie</a></button></Link>}
            </div>
        </div>
        
    )
}



export default Card;
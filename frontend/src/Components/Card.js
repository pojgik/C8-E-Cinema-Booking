import './Style/Card.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    console.log(props)
    return (
        <div  className = "card">
            <h1> {props.title} </h1>  
            <div className='frame'> 
                <iframe src = {props.link}></iframe>
            </div>
            <div className="card-btns">
                <button className='card-btn'><a href='#'> Book Now</a></button>
                <button className='card-btn'><a href='#'> More Info</a></button>
                <button className="card-btn"><a href="#">Delete Movie</a></button>
                <Link to = "/update-movie"><button className="card-btn"><a href="#">Edit Movie</a></button></Link>
            </div>
        </div>
        
    )
}



export default Card;
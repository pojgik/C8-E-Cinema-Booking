import './Style/Card.css'

const Card = (props) => {
    console.log(props)
    return (
        <div  className = "card">
            <h1> {props.title} </h1>  
            <div className='frame'> 
                <iframe src = {props.link}></iframe>
            </div>
            <button className='card-btn'><a href='#'> Book Now</a></button>
            <button className='card-btn'><a href='#'> More Info</a></button>
            {/* <button className="card-btn"><a href="#">Delete Movie</a></button>
            <button className="card-btn"><a href="#">Edit Movie</a></button> */}
        </div>
        
    )
}



export default Card;
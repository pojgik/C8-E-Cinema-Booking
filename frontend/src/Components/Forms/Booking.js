import { useEffect, useState } from 'react'
import { useParams,Link} from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'


const Booking = (props) => {

    const [showings,setShowings] = useState(null)
    const [booking,setBooking] = useState(null)
    const [adults,setAdults] = useState(null)
    const [kids,setKids] = useState(null)
    const [seniors,setSeniors] = useState(null)
    const total = (12.95*adults) + (10.95*seniors) + (5.95*kids);
    const title = useParams().id
    
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
            fetch("http://localhost:8080/movies/getShowsForMovie/" + title)
            .then(res=>res.json())
            .then(data=>{
                const shows = data;
                setShowings(shows)
            })

        })
    },[])

    const submitHandler = event => {
        event.preventDefault();
        console.log(booking)
    }
    
    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "booking") {
            setBooking(value);
        }
        if (name === "adults") {
            setAdults(value);
        }
        if (name === "kids") {
            setKids(value);
        }
        if (name === "seniors") {
            setSeniors(value);
        }
    }
    
    return (
        <div className='reg '>
        <h1 className='form-heading'>Book {title} Now</h1>
        <div id = "payment" className="add-window">
        <form  id = "payment-form"className="add" onSubmit={submitHandler} >
        <div className='card-info'>
        </div>
        <div className="billing-info">
            <ul>
                <label >Showings:</label>
                    <select name = 'booking' onChange = {(e)=>handleInputChange(e)} required type="select" className='search'> 
                    { showings !== null && <option selected disabled value = "">Available Showings</option>}
                    {
                        showings !== null && showings.map((show) => {
                            const timeString = show.showTime
                            const date = timeString.substring(0,10)
                            const time = (timeString.substring(11,16))
                            if (parseInt(time.substring(0,2)) - 5 >= 12) {
                                const dateTime = date + " at " + (parseInt(time.substring(0,2)) - 5) + ":" + time.substring(3,5) + "PM"
                                return(
                                <option value = {show.showId}>{dateTime}</option>)
                            }
                            else {
                                const dateTime = date + " at " + (parseInt(time.substring(0,2)) + 12 - 5) + ":" + time.substring(3,5) + "PM"
                                return(
                                <option value = {show.showId}>{dateTime}</option>)
                            }
                        }) 
                    }
                </select>
            </ul>
            <ul>
                <label>Adults ($12.95): </label>
                <input min = "0" name = "adults" onChange = {(e)=>handleInputChange(e)} className = "reg-field"type = "number"></input>
            </ul>
            <ul>
                <label> Kids ($5.95):      </label>
                <input min = "0" name = "kids" onChange = {(e)=>handleInputChange(e)} className = "reg-field"type = "number"></input>
            </ul>
            <ul>
                <label>Seniors ($10.95): </label>
                <input min = "0" name = "seniors" onChange = {(e)=>handleInputChange(e)} className = "reg-field"type = "number"></input>
            </ul>
            <ul>
                <label>Promotion Code:  </label>
                <input name = "code" onChange = {(e) => handleInputChange(e)} className = "reg-field" type = "text"></input>
            </ul>
            <ul>
                <label>Total: ${total.toFixed(2)} </label>
            </ul>
            
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
            <button type = "submit" form = "payment-form" className='submit '>Book</button>
            <Link to = '/order-confirmation'>Book</Link>
        </ul>
    </div>
</div>
</div>
    )
}

export default Booking
import { useEffect, useState } from 'react'
import { useParams,Link} from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'
import './Form-Style/Booking.css'


const Booking = (props) => {
    

    const [showings,setShowings] = useState(null)
    const [showSeats,setShowSeats] = useState(null);
    const [firstSeat,setFirstSeat] = useState(null)
    const [promo,setPromo] = useState(null)
    const [seats,setSeats] = useState([])
    const [cards,setCards] = useState(null);
    const [booking,setBooking] = useState(null)
    const [adults,setAdults] = useState(0)
    const [kids,setKids] = useState(0)
    const [seniors,setSeniors] = useState(0)
    const total = (12.95*adults) + (10.95*seniors) + (5.95*kids);
    const title = useParams().id
    
    useEffect(() => {
        fetch("http://localhost:8080/payment/getCards/" + sessionStorage.getItem("userId"))
        .then(res=>res.json())
        .then(data=> {
            console.log(data)
            setCards(data)
        })
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
            console.log(data)
            fetch("http://localhost:8080/movies/getShowsForMovie/" + title)
            .then(res=>res.json())
            .then(data=>{
                const shows = data;
                setShowings(shows)

            })
        })
    },[])
    useEffect(()=> {
        if (booking !== null) {
            fetch("http://localhost:8080/movies/getShowSeats/" + booking)
            .then(res=>res.json())
            .then(data=> {
                console.log(data)
                setShowSeats(data)
                setFirstSeat(data[0])
            })
        }
        
    },[booking])
    const submitHandler = event => {
        event.preventDefault();
        console.log(seats.length)
        if (seats.length !== (parseInt(adults) + parseInt(kids) + parseInt(seniors))) {
            alert("not proper number of tickets")
        }
        console.log(seats)
        console.log(firstSeat)
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
        if (name === "code") {
            setPromo(value);
        }
        if (name === "seats") {
            if (!seats.includes(value)) {
            setSeats([...seats,value])
            }
        }
    }
    const promoHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/promotions/getPromotion/" + promo)
        .then(res=>res.json())
        .then(data => {
            console.log(data)
        })
    }
    
    return (
        <div className='reg '>
        <h1 className='form-heading'>Book {title} Now</h1>
        <div id = "payment" className="add-window">
        <form  id = "payment-form"className="add" onSubmit={submitHandler} >
        <div className='card-info'>
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
                                const dateTime = date + " at " + (parseInt(time.substring(0,2)) + 12 - 5) + ":" + time.substring(3,5) + "AM"
                                return(
                                <option value = {show.showId}>{dateTime}</option>)
                            }
                        }) 
                    }
                </select>
            </ul>
            <ul>
                <label >Select Payment:</label>
                    <select name = 'cards' onChange = {(e)=>handleInputChange(e)} required type="select" className='search'> 
                    { cards !== null && <option selected disabled value = "">Cards on File</option>}
                    {
                        cards !== null && cards.map((card) => {
                            const cardString = card.cardType + " " + card.cardName + " " + card.expDate;
                            console.log(cardString)
                            return (
                            
                                <option value = {card.paymentId}>{cardString}</option>
                            )
                        })
                    }
                </select>
            </ul>
            <ul>
                <label >Select Seats:</label>
                <select multiple name = "seats" className='multi-select search' id="seat-dropdown"  onChange = {(e)=>handleInputChange(e)} required type = "select">
                    {showSeats !== null && showSeats.map((seat)=> {
                        if (seat.status !== true) {
                        return(<option value = {JSON.stringify(seat)}>{seat.seatNum}</option>)
                        }
                    })
                    }
                </select>
            <div>
                {seats !== null && seats.map((seat)=> {
                    console.log(seat)
                    return <p>{JSON.parse(seat).seatNum}</p>
                    })
                }
            </div>
            </ul>
        </div>
        <div className="billing-info">
            
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
            <button onClick = {promoHandler} className='submit'>Apply Promotion</button>

            </ul>
            <ul>
                <label>Total: ${total.toFixed(2)} </label>
            </ul>
            
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
            <button type = "submit" form = "payment-form" className='submit '>Book</button>
        </ul>
    </div>
</div>
</div>
    )
}

export default Booking
import { useParams } from 'react-router-dom'
import './Form-Style/AddMovie.css'
import { useEffect, useState } from 'react'


const Checkout = () => {

    const id = useParams().id
    const [booking,setBooking] = useState();
    const [time,setTime] = useState();

    useEffect(()=>{
        fetch("http://localhost:8080/movies/getShow/" + id)
        .then(res=>res.json())
        .then(data => {
            console.log(data)
           setBooking(data.movie.title);
           setTime()


        })
    },[])

    const handleInputChange = event => {
        event.preventDefault()
    }
    const submitHandler = event => {
        event.preventDefault()
    }
   
   return (
    <div className='reg '>
    <h1 className='form-heading'>Checkout</h1>
    <div id = "payment" className="add-window">
        <form onSubmit = {submitHandler} id = "payment-form"className="add">
        <div className='card-info'>
            <ul>
                <label>{booking}</label>
                <label>{}</label>
            </ul>
            <ul>
                <label>Number of kids tickets: </label>
                {/* <input class name = "reg-field"type = "number"></input> */}
            </ul>
            <ul>
                <label>Number of kids tickets: </label>
                {/* <input class name = "reg-field"type = "number"></input> */}
            </ul>
            <ul>
                <label>Number of kids tickets: </label>
                {/* <input class name = "reg-field"type = "number"></input> */}
            </ul>
        </div>
        <div className="billing-info">
            <ul>
                <label className='reg-field'>Is the Movie Out Yet?</label>
                <input   className='reg-field' type="checkbox" name = 'out'></input>
            </ul>         
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
            <button form = "payment-form" className = 'submit' type="subimt">Add</button>
        </ul>
    </div>
    </div>
    </div>
   )
}


export default Checkout;


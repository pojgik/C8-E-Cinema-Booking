import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Form-Style/AddPromotion.css'
import './Form-Style/OrderConfirmation.css'

const OrderConfirmation = () => {
    
    const orderId = useParams();
    useEffect(()=> {
        fetch("http://localhost:8080/order/getOrdersById/" + sessionStorage.getItem("userId")) 
        .then(res=>res.json())
        .then(data => {
            const thisOrder = data.find(order => parseInt(order.orderId) === parseInt(orderId.id))
            // sessionStorage.setItem("order",JSON.stringify(thisOrder))
        })
    })
   return (
    //    <div>
    //        <h1 className="form-heading">Order Confirmation</h1>
    //        <h1 className = "form-heading">Thank You!</h1>
    //        <div className="promo-window">
    //            <dl>
    //                <h1>Order Details:</h1>
    //                <dt>Booking Number: 47GE3</dt>
    //                <dd>Adult($12.50): 3</dd>
    //                <dd>Child($9): 1</dd>
    //                <h2>Order Total: $46.50</h2>
    //            </dl>
    //        </div>
    //        <h3 className='conf'>Thank you for your order! We have processed your payment and your tickets have been booked!
    //            We hope you have a great time watching the show.</h3>
    //        </div>
    <div className='reg'>
    <h1 className='form-heading'>Order Confimration</h1>
    <p>Thank you for ordering {JSON.parse(sessionStorage.getItem("order")).numTickets } ticket for {JSON.parse(sessionStorage.getItem("order")).movie.title}. <p>An email confirmation has been sent.</p> We hope you enjoy your movie!</p>
    <div className="add-window">    
        <form  className="add" id = "registration-form">
            <div className="container">
            {/* <div className="left"> */}
                <h2 className='form-heading'>Order Details: </h2>
                <p>Kid tickets: {JSON.parse(sessionStorage.getItem("order")).childTickets}</p>
                <p>Adult tickets: {JSON.parse(sessionStorage.getItem("order")).adultTickets}</p>
                <p>Senior tickets: {JSON.parse(sessionStorage.getItem("order")).seniorTickets}</p>
                <h3>Order Total: {JSON.parse(sessionStorage.getItem("order")).orderTotal.toFixed(2)}</h3>


                {/* </div> */}
            {/* <div className="right"> */}
            
            {/* </div> */}
            </div>
            
        </form>
    </div>
</div>
   )
}


export default OrderConfirmation;




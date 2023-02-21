import './Form-Style/AddPromotion.css'
import './Form-Style/OrderConfirmation.css'
const OrderConfirmation = () => {
   return (
       <div>
           <h1 className="form-heading">Order Confirmation</h1>
           <h1 className = "form-heading">Thank You!</h1>
           <div className="promo-window">
               <dl>
                   <h1>Order Details:</h1>
                   <dt>Booking Number: 47GE3</dt>
                   <dd>Adult($12.50): 3</dd>
                   <dd>Child($9): 1</dd>
                   <h2>Order Total: $46.50</h2>
               </dl>
           </div>
           <h3 className='conf'>Thank you for your order! We have processed your payment and your tickets have been booked!
               We hope you have a great time watching the show.</h3>
           </div>
   )
}


export default OrderConfirmation;




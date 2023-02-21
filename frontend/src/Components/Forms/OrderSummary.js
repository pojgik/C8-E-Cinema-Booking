import './Form-Style/AddPromotion.css'
const OrderSummary = () => {
   return (
       <div>
           <h1 className="form-heading">Order Summary</h1>
           <div className="promo-window">
               <dl>
                   <h1>Ticket Details</h1>
                   <dt>Ticket prices</dt>
                   <dd>Adult($12.50): 3</dd>
                   <dd>Child($9): 1</dd>
                   <h1>Order Total: $46.50</h1>
                   <dt>Order Confirmation:</dt>
                   <dd><input className = 'submit' type="submit" value="Edit Order"/> OR <input className = 'submit' type="submit" value="Confirm Order"/></dd>
                   <dd><input className = 'submit' type="subimt" value="Confirm Order"/></dd>
               </dl>
           </div>
           </div>
   )
}


export default OrderSummary;




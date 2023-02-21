import './Form-Style/AddMovie.css'


const Checkout = () => {
   return (
       <div>
       <h1 className='form-heading'>Checkout</h1>
       <div className="add-window">
          
           <form className="add">
               <ul>
               <label>First Name:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>Last Name:</label>
               <input type="text" name = 'cat'/>
               </ul>
               <ul>
               <label>Phone Number:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>Address:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>City:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>Country:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>State:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>Zip Code:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>Phone:</label>
               <input type="text" name = 'title'/>
               </ul>
               <input className = 'submit' type="submit" value="Complete Checkout"/>
           </form>
       </div>
       </div>
   )
}


export default Checkout;


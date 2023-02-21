import './Form-Style/AddMovie.css'


const BuyTicket = () => {
   return (
       <div>
       <h1 className='form-heading'>Buy your tickets!</h1>
       <div className="add-window">
          
           <form className="add">
               <ul>
               <label>Select Movie:</label>
               <select type="select" className='search'>
                   <option selected disabled value = "" > Movie</option>
                   <option value="action">Justice League</option>
                   <option value="western">Prospect</option>
                   <option value="drama">Freddy</option>
                   <option value="scifi">Avengers: Endgame</option>
                   <option value="thriller">Chronicle</option>
                   <option value="comedy">Free Guy</option>
                   <option value="romance">Crazy Rich Asians</option>
               </select>
               </ul>
               <ul>
               <label>Select Show Time:</label>
               <select type="select" className='search'>
                   <option selected disabled value = "" > Show Times</option>
                   <option value="action">11:15am - 2:30pm</option>
                   <option value="western">3:00pm - 5:30pm</option>
                   <option value="drama">6:00pm - 8:30pm </option>
               </select>
               </ul>
               <ul>
               <label>Select Seat:</label>
               <input type="text" name = 'title'/>
               </ul>
               <ul>
               <label>Age:</label>
               <input type="text" name = 'title'/>
               </ul>
           </form>
       </div>
       </div>
   )
}


export default BuyTicket;


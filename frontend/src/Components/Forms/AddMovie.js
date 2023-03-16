import './Form-Style/AddMovie.css'

const AddMovie = () => {
    return (
        <div className='reg '>
        <h1 className='form-heading'>Add a new movie</h1>
        <div id = "payment" className="add-window">
        <form id = "payment-form"className="add">
        <div className='card-info'>
            <ul>
                     <input placeholder = "Movie Title" type="text" name = 'title' required/>
                     </ul>
                     <ul>
                     <input placeholder = "Category" type="text" name = 'cat' required/>
                     </ul>
                     <ul>
                     <input placeholder = "Cast" type="text" name = 'case'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Director" type="text" name = 'director'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Producer" type="text" name = 'producer'required/>
                     </ul>
            </div>
        <div className="billing-info">
        <ul>
                     <input placeholder = "Synopsis" type="text" name = 'synopsis'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Reviews"type="text" name = 'reviews'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Trailer Picture" type="text" name = 'pic'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Trailer Video" type="text" name = 'video'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Rating Code" type="text" name = 'rating'required/>
                     </ul>
                     <ul>
                     <input placeholder = "Show Dates and Times" type="text" name = 'when'required/>
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
        // <div className='reg'>
        // 
        // <div id = "add-movie" className="add-window">
        //     <form className="add">
        //         <div className="left">
        //            
        //         </div>
        //         <div className="right">
        //            
        //         </div>
        //     </form>
        //     <div className='payment-btn'>
        //     <ul >
        //     <button form = "payment-form" className = 'submit' type="subimt">Add</button>
        //     </ul>
        //     </div>
        // </div>
        // </div>
    )
}

export default AddMovie;
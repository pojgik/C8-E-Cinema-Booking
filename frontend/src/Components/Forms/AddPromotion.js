import './Form-Style/AddPromotion.css'
const AddPromotion = () => {
    return (
        <div className='reg'>
            <h1 className="form-heading">Add a promotion</h1>
            <div className="add-window">
                <form>
                    <ul>
                        <input placeholder = "Movie Title" type="text" name = 'title' required/>
                    </ul>
                    <ul>
                        <input placeholder = "Discount Rate" type="number" name = 'rate' required/>
                    </ul>
                    <ul>
                        <label> End Date </label>
                    </ul>
                    <ul>
                        <input placeholder = "End Date" className='search' type="date" name = 'end' required/>
                    </ul>
                    <ul>
                        <input placeholder = "Promotion Description" type="text" name = 'desc'required/>
                    </ul>
                    <button className = 'submit' type="subimt">Add</button>

                </form>
            </div>
            </div>
    )
}

export default AddPromotion;
import './Form-Style/AddPromotion.css'
const AddPromotion = () => {
    return (
        <div>
            <h1 className="form-heading">Add a promotion</h1>
            <div className="promo-window">
                <form>
                    <ul>
                        <label>Movie Title: </label>
                        <input type="text" name = 'title' required/>
                    </ul>
                    <ul>
                        <label>Discount Rate:</label>
                        <input type="number" name = 'rate' required/>
                    </ul>
                    <ul>
                        <label>End Date:</label>
                        <input className='end-date' type="date" name = 'end' required/>
                    </ul>
                    <ul>
                        <label>Promotion Description:</label>
                        <input type="text" name = 'desc'required/>
                    </ul>
                    <button className = 'submit' type="subimt">Add</button>

                </form>
            </div>
            </div>
    )
}

export default AddPromotion;
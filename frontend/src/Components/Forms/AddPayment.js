import './Form-Style/AddPayment.css'
const AddPayment = () => {
   return ( <div className='payment '>
    <h1 className='form-heading'>Add a new payment method</h1>
    <div className="add-window">
        
        <form className="add">
            <ul>
            <label>Card Type:</label>
            <select required className="card-selector">
                <option selected disabled value = "" > Card Type</option> 
                <option value = "visa" >Visa</option>   
                <option value = "amex" >American Express</option>   
                <option value = "mc" >MasterCard</option>   
                <option value = "discover" >Discover</option>   
            </select>
            </ul>
            <ul>
            <label>Card Number:</label>
            <input type="text" name = "number"/>
            </ul>
            <ul>
            <label>Expiration Date:</label>
            <select className='expir-selector' name='expireMM' id='expireMM'>
                <option value='' selected disabled>Month</option>
                <option value='01'>January</option>
                <option value='02'>February</option>
                <option value='03'>March</option>
                <option value='04'>April</option>
                <option value='05'>May</option>
                <option value='06'>June</option>
                <option value='07'>July</option>
                <option value='08'>August</option>
                <option value='09'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
            </select> 
            <select className='expir-selector' name='expireYY' id='expireYY'>
                <option value='' selected disabled>Year</option>
                <option value='23'>2023</option>
                <option value='24'>2024</option>
                <option value='25'>2025</option>
                <option value='26'>2026</option>
                <option value='27'>2027</option>
                <option value='28'>2028</option>
                <option value='29'>2029</option>
            </select>
            <input class="inputCard" type="hidden" name="expiry" id="expiry" maxlength="4"/>
            </ul>
            <ul>
            <label className='shipping'>Shipping Adress:</label>
            </ul>
            <ul>
            <label>Street:</label>
            <input type="text" name = 'street'required/>
            </ul>
            <ul>
            <label>City:</label>
            <input type="text" name = 'city'required/>
            </ul>
            <ul>
            <label>State:</label>
            <select className = 'card-selector' required>
                <option selected disabled value = ''>State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            </ul>
            <ul>
            <label>Zip Code:</label>
            <input type="text" name = 'zip'required/>
            </ul>
            <button className = 'submit' type="subimt">Add</button>
        </form>
    </div>
    </div>
   )
}
export default AddPayment;
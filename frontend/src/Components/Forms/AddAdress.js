import { useState } from 'react';
import './Form-Style/AddAdress.css'
import { useNavigate } from 'react-router-dom';

class Address {
    constructor(street, city, state, zip) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}

const AddAdress = (props) => {

    const navigate = useNavigate();

    const [street, setSreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zip, setZip] = useState();


    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "street") {
            setSreet(value);
        }
        if (name === "city") {
            setCity(value)
        }
        if (name === "state") {
            setState(value)
        }
        if (name === "zip") {
            setZip(value);
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const newAddress = new Address(street,city,state,zip)
        props.setter(newAddress)
        console.log(props)
        navigate('/login/register')
    }

    return (
        <div className='reg'>
            <h1 className='form-heading'>Add a shipping adress</h1>
            <div className="add-window">
                <form onSubmit = {submitHandler} className="add">
                    <ul>
                        <input onChange = {(e)=>handleInputChange(e)} type="text" placeholder="Street" name='street' required />
                    </ul>
                    <ul>
                        <input onChange = {(e)=>handleInputChange(e)} type="text" placeholder='City' name='city' required />
                    </ul>
                    <ul>
                        <select defaultValue= 'State' onChange = {(e)=>handleInputChange(e)} className='search' name ='state' required>
                            {/* <option selected disabled value=''>State</option> */}
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
                            <option disabled value="State">State</option>

                        </select>
                    </ul>
                    <ul>
                        <input onChange = {(e)=>handleInputChange(e)} type="text" placeholder="Zip Code" name='zip' required />
                    </ul>
                    <button className='submit' type="subimt">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddAdress;
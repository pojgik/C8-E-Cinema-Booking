import { Link } from 'react-router-dom';
import './Form-Style/Registration.css'

const Registration = () => {
    return (
        <div className='reg'>
            <h1 className='form-heading'>Register an Account</h1>
            <div className="add-window">    
                <form className="add">
                    <ul>
                    <input className = "reg-field" placeholder = "Name"type="text" name = 'name' required/>
                    </ul>
                    <ul>    
                    <input className = "reg-field"  placeholder = "Phone Number" type="telephone" name = 'phone' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                    </ul>
                    <ul>
                    <input className = "reg-field"  placeholder = "Email Adress" type="email" name = 'email'/>
                    </ul>
                    <ul>
                    <input className = "reg-field"  placeholder='Password' type="password" name = 'pass'/>
                    </ul>
                    <ul>
                    <input className = "reg-field"  placeholder = "Confirm Password" type="password" name = 'pass-conf'/>
                    </ul>
                    <ul className='create-btn'>
                    <button className = 'submit' type="subimt">Create</button>
                    </ul>
                    <ul className="frgt-pwrd reg-btn">
                    <Link to = "/add-payment">Add payment method</Link>
                    <Link>Add address</Link>
                    </ul>
                </form>
            </div>
        </div>
        )
}

export default Registration;
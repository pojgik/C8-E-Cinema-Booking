import './Form-Style/Registration.css'

const Registration = () => {
    return (
        <div className='create'>
        <h1 className='form-heading'>Register an Account</h1>
        <div className="add-window">
            
            <form className="add">
                <ul>
                <label>Name:</label>
                <input type="text" id = 'name' name = 'name' required/>
                </ul>
                <ul>
                <label>Phone Number:</label>
                <input type="telephone" name = 'phone' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                </ul>
                <ul>
                <label>Email Adress:</label>
                <input type="email" name = 'email'/>
                </ul>
                <ul>
                <label>Password:</label>
                <input type="password" name = 'pass'/>
                </ul>
                <ul>
                <label>Confirm Password:</label>
                <input type="password" name = 'pass-conf'/>
                </ul>
                <ul>
                <button className = 'submit' type="subimt">Create</button>
                <a href='#'>Add payment method</a>
                <a href='#'>Add address</a>
                </ul>
            </form>
        </div>
        </div>
        )
}

export default Registration;
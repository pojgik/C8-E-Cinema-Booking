import './Form-Style/EditProfile.css'
import { useState } from 'react';

const EditProfile = () => {
    
    const[promo,setPromo] = useState(false);

    return (
    <div className='create'>
    <h1 className='form-heading'>Edit your profile</h1>
    <div className="add-window">
        
        <form className="add">
            <ul>
            <label>Name:</label>
            <input className = "edit" type="text" id = 'name' name = 'name' placeholder = 'your name'required/>
            </ul>
            <ul>
            <label>Phone Number:</label>
            <input className = "edit" type="telephone" name = 'phone' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder = 'your number'/>
            </ul>
            <ul>
            <label>Email Adress:</label>
            <input className = "edit" placeholder = 'your email'type="email" name = 'email'/>
            </ul>
            <ul>
                <input value = {true} onChange = {(e)=>setPromo(e.target.value)}  className='reg-field' type="checkbox" name = 'promo'></input>
                <label className='reg-field'>Recieve Promotions?</label>
                </ul>
            <ul>
            <label>Password:</label>
            <input className = "edit" placeholder = 'your password'type="password" name = 'pass'/>
            </ul>
            <ul>
            <label>Confirm Password:</label>
            <input className = "edit" placeholder = 'password again'type="password" name = 'pass-conf'/>
            </ul>
            <ul>
            <button className = 'submit' type="subimt">Create</button>
            <a className='edit' href='#'>Add/Edit payment method</a>
            <a className = "edit" href='#'>Add/Edit address</a>
            </ul>
        </form>
    </div>
    </div>
    )
}

export default EditProfile;
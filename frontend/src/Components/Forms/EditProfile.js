import './Form-Style/EditProfile.css'
import { useState } from 'react';

const EditProfile = (props) => {
    const [thisUser,setThisUser] = useState(props.currentUser);
    // const thisUser = props.currentUser
    console.log(thisUser)
    const [userName,setUserName] = useState(thisUser.firstName + " " + thisUser.lastName);
    console.log(userName)
    const [number,setNumber] = useState(thisUser.phone)
    const [pass,setPass] = useState(thisUser.password);
    if (!props) {
    }
    console.log(thisUser)
    const editHandler = (event) => {
        console.log("subed")
        event.preventDefault();
        // const editted = thisUser;
        const editted = {firstName: userName,phone: number}
        console.log(editted)
        fetch("http://localhost:8080/users/editProfile/" + thisUser.userId, {
            method:"PUT",
            cors:"cors",
            headers: {
                "Content-Type" : "application.json",
                "Accept" : "application/json",
                body: JSON.stringify(editted)
            }
        })
    }
    return (
    <div className='create'>
    <h1 className='form-heading'>Edit your profile</h1>
    <div className="add-window">
        
        <form  onSubmit = {editHandler}className="add">
            <ul>
            <label>Name:</label>
            <input  onChange ={(e)=>setUserName(e.target.value)} className = "edit" type="text" id = 'name' name = 'name' placeholder={userName} required/>
            </ul>
            <ul>
            <label>Phone Number:</label>
            <input  onChange ={(e)=>setNumber(e.target.value)}className = "edit" type="telephone" name = 'phone' pattern="[0-9]{10}" placeholder ={number}/>
            </ul>
            {/* <ul>
            <label>Email Adress:</label>
            <input className = "edit" placeholder = 'your email'type="email" name = 'email'/>
            </ul> */}
            <ul>
                <input value = {true}  className='reg-field' type="checkbox" name = 'promo'></input>
                <label className='reg-field'>Recieve Promotions?</label>
                </ul>
            <ul>
            <label>Password:</label>
            <input onChange ={(e)=>setPass(e.target.value)}className = "edit" placeholder = 'your password'type="password" name = 'pass'/>
            </ul>
            <ul>
            <label>Confirm Password:</label>
            <input className = "edit" placeholder = 'password again'type="password" name = 'pass-conf'/>
            </ul>
            <ul>
            <button className = 'submit' type="subimt">Edit</button>
            <a className='edit' href='#'>Add/Edit payment method</a>
            <a className = "edit" href='#'>Add/Edit address</a>
            </ul>
        </form>
    </div>
    </div>
    )
}

export default EditProfile;
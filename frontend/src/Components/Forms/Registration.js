import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form-Style/Registration.css'


const Registration = () => {

    const [Users,setUsers] = useState ([]);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [password,setPassword] = useState("");
    const [passwordConf,setPasswordConf] = useState("");

    
    const handleInputChange = (event) => {
        event.preventDefault();
        const {name,value} = event.target;
        if (name === "name") {
            setUsername(value);
        }
        if (name === "phone") {
            setPhoneNumber(value);
        }
        if (name === "email") {
            setEmail(value);
        }
        if (name === "pass") {
            setPassword(value);
        }
        if (name === "pass-conf") {
            setPasswordConf(value);
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== passwordConf) {
            alert("passwords must match")
        }
        else
            console.log(username,phoneNumber,email,password,passwordConf);
    }
    return (
        <div className='reg'>
            <h1 className='form-heading'>Register an Account</h1>
            <div className="add-window">    
                <form onSubmit = {submitHandler} className="add" id = "registration-form" >
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)}className = "reg-field" placeholder = "Name"type="text" name = 'name' required/>
                    </ul>
                    <ul>    
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Phone Number" type="telephone" name = 'phone' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Email Adress" type="email" name = 'email'/>
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder='Password' type="password" name = 'pass'/>
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Confirm Password" type="password" name = 'pass-conf'/>
                    </ul>
                    <ul className='create-btn'>
                    <button className = 'submit' type="subimt">Create</button>
                    </ul>
                    <ul className="frgt-pwrd reg-btn">
                    <Link to = "/add-payment" className='support'>Add payment method</Link>
                    <Link to = "/add-address"className='support'>Add address</Link>
                    </ul>
                </form>
            </div>
        </div>
        )
}


export default Registration;
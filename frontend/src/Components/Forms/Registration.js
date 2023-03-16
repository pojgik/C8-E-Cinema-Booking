import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form-Style/Registration.css'


class User {
    constructor(name,number,email,password,address,payment) {
        this.id = Math.floor(Math.random() * 90 + 10);
        this.name = name;
        this.number = number;
        this.email = email;
        this.password = password;
        this.address = address;
        this.payment = payment;
    }
}

const Registration = (props) => {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [password,setPassword] = useState("");
    const [passwordConf,setPasswordConf] = useState("");
    const [addresses,setAddresses] = useState(null);
    const [payment,setPayment] = useState(null);


    // handles input being put into each input box
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

    // submitition handler -- assigns a new User and checks for validations
    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== passwordConf) { // passwords must match
            alert("Passwords must match")
        }
        else {
            const newUser = new User (username,phoneNumber,email,password,props.addresses)
            let inUse = false;
            // console.log(newUser);
            props.users.map(user => {
                if (user.email === newUser.email) { // finds if email is already in use
                    inUse = true;
                    console.log("email already in use")
                }
            })
            if (!inUse)
                props.users.push(newUser); // creates new user and pushes them to allUser
                console.log(props.users)
                navigate('/login')
            }   
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
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Phone Number" type="telephone" name = 'phone' pattern="[0-9]{10}" required/>
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Email Adress" type="email" name = 'email'required />
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder='Password' type="password" name = 'pass'required />
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Confirm Password" type="password" name = 'pass-conf'required/>
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
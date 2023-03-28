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

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [password,setPassword] = useState("");
    const [passwordConf,setPasswordConf] = useState("");
    const [addresses,setAddresses] = useState(null);
    const [payment,setPayment] = useState(null);
    const[promo,setPromo] = useState(false);


    // handles input being put into each input box
    const handleInputChange = (event) => {
        event.preventDefault();
        const {name,value} = event.target; 
        if (name === "firstName") {
            setFirstName(value);
        }
        if (name === "lastName") {
            setLastName(value);
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
        if (name === "phone") {
            setPhoneNumber(value);
        }
    }

    // submitition handler -- assigns a new User and checks for validations
    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== passwordConf) { // passwords must match
            alert("Passwords must match")
        }
        else {
            const myUser = {
                firstName: firstName,
                lastName: lastName,
                email:email,
                password:password,
                userType: 1,
                customerStatus: 0,
                promotionStatus:promo,
                phone:phoneNumber,
                paymentCards: [],
                billingAddress: null 
            };
            console.log(myUser)
            fetch("http://localhost:8080/users/register",{
                method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(myUser)
            })
            .then(res =>res.json())
            .then(data => {
                if(data.message === "User with that email already exists."){
                    alert("User with that email already exists.")
                }
                else {
                    navigate("/reg-conf");
                }
               console.log(data);});
            }
    }
    return (       
         <div className='reg'>
            <h1 className='form-heading'>Register an Account</h1>
            <div className="add-window">    
                <form onSubmit = {submitHandler} className="add" id = "registration-form">
                    <div className="container">
                    <div className="left">
                        <ul>
                        <input onChange = {(e)=>handleInputChange(e)}className = "reg-field" placeholder = "First Name"type="text" name = 'firstName' required/>
                        </ul>
                        <ul>
                        <input onChange = {(e)=>handleInputChange(e)}className = "reg-field" placeholder = "Last Name"type="text" name = 'lastName' required/>
                        </ul>
                        <ul>    
                        <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Phone Number" type="telephone" name = 'phone' pattern="[0-9]{10}" required/>
                        </ul>
                        <ul>
                        <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Email Adress" type="email" name = 'email'required />
                        </ul>
                        </div>
                    <div className="right">
                    <ul>
                    <label className='reg-field'>Recieve Promotions?</label>
                    <input checked = {promo} onChange = {(e)=>{setPromo(!promo)
                    console.log(promo)}}  className='reg-field' type="checkbox" name = 'promo'></input>
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder='Password' type="password" name = 'pass'required />
                    </ul>
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-field"  placeholder = "Confirm Password" type="password" name = 'pass-conf'required/>
                    </ul>
                    </div>
                    <button className = 'submit ' type="subimt">Create</button>
                    </div>
                    <Link to = "/add-payment" className='support frgt-pwrd reg-btn'>Add payment method</Link>
                    <Link to = "/add-address"className='support frgt-pwrd reg-btn'>Add address</Link>
                </form>
            </div>
        </div>
        )
}


export default Registration;
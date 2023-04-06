import { NULL } from 'mysql/lib/protocol/constants/types';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './Form-Style/RegConf.css'

const RegConf = () => {

    const nav = useNavigate();
    const location = useLocation();
    const [code,setCode] = useState();
    const userId = location.state.userId;

    const handleInputChange = (event) => {
        event.preventDefault();
        const {name,value} = event.target; 
        if (name === "code") {
            setCode(value);
            // console.log(value)
        }
    }
    const regSubmitHandler = (event) => {
        /*
        Currently, this searches every user looking for one with the verification code,
        and then if one is found sends that user to be verified. This is redundant,
        as this is what should be done in the backend. Instead, this should simply send a 
        verify request with just the confirmation code that was put in. It does not need
        to check users.
        */
        event.preventDefault();
        // console.log(code)
        // const user = data.find(value=>value.verificationCode == code);
        // console.log(user.userId);
        // const updatedUser = user;
        // updatedUser.verificationCode = undefined;
        // updatedUser.customerStatus = 1;

        console.log("User Found from code")
        fetch("http://localhost:8080/users/verify-email/" + userId, {
            method: "PUT",
        mode:"cors",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
                body: code
            })
            .then(res => {
                if (res.ok) {
                    alert("Verification Code Accepted!")   
                    nav("/login")
                } else {
                    alert("Invalid Verification Code")
                }
            })
            // .then(data =>  {
            //     console.log(data)
            //     alert("Verification Code Accepted!")
            //     nav("/login")
            // })
                // else alert("Invalid Verification Code")
                // console.log(data)
            } // regSubmitHandler
    
    return (
        <div className='reg'>
            <h1 className='form-heading'>Account Confirmation
                <h6>A confirmation code has been sent to your email address. Please enter it below in order to verify your new account.</h6>
            </h1>
            <div className="add-window">    
                <form onSubmit = {regSubmitHandler} className="add">
                    <ul>
                    <input onChange = {(e)=>handleInputChange(e)} className = "reg-conf" placeholder = "Confirmation Code"type="text" name = 'code' required/>
                    </ul>
                    <ul className='create-btn'>
                    <button className = 'submit' type="submit">Confirm</button>
                    </ul>
                   
                </form>
            </div>
        </div>
    )
}

export default RegConf
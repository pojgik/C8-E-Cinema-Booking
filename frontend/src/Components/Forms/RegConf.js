import { NULL } from 'mysql/lib/protocol/constants/types';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form-Style/RegConf.css'

const RegConf = () => {

    const nav = useNavigate();
    const [code,setCode] = useState();

    const handleInputChange = (event) => {
        event.preventDefault();
        const {name,value} = event.target; 
        if (name === "code") {
            setCode(value);
            // console.log(value)
        }
    }
    const regSubmitHandler = (event) => {
        event.preventDefault();
        console.log(code)
        fetch("http://localhost:8080/users/getAllUsers",{
                method: "GET",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                // body: JSON.stringify(myUser)
            })
            .then(res =>res.json())
            .then(data => {
                const user = data.find(value=>value.verificationCode == code);
                console.log(user.userId);
                const updatedUser = user;
                updatedUser.verificationCode = undefined;
                updatedUser.customerStatus = 1;
                if (user !== undefined) {
                    console.log("User Found from code")
                    fetch("http://localhost:8080/users/verify-email/" + user.userId, {
                        method: "PUT",
                        mode:"cors",
                        headers: {
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        },
                        body: JSON.stringify(updatedUser)
                    })
                    .then(res => res.json())
                    .then(data =>  {
                        console.log(data)
                        alert("Verification Code Accepted!")
                        nav("/login")
                })
                }
                else alert("Invalid Verification Code")
               console.log(data);});
            }
    
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
                    <button className = 'submit' type="subimt">Confirm</button>
                    </ul>
                   
                </form>
            </div>
        </div>
    )
}

export default RegConf
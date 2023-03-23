import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form-Style/Login.css'



const Login = () => {

    const [loginEmail,setLoginEmail] = useState();
    const [loginPass,setLoginPass] = useState();


    const submitHandler =(event)=> {
        event.preventDefault();
        console.log(loginEmail)
        console.log(loginPass)
        const loginUser = {
            email: loginEmail,
            password: loginEmail
        }
        
        fetch("http://localhost:8080/users/login",{
                method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(loginUser)
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
            });

    }

    return (
        <div className='reg'>
            <h1 className='form-heading'>User Login</h1>
            <div className="add-window">
            <form onSubmit={submitHandler} className="add">
                <ul>
                <input onChange={(e)=>setLoginEmail(e.target.value)} name = "email" required type="email" placeholder='Email' />
                </ul>
                <ul>
                <input onChange={(e)=>setLoginPass(e.target.value)} name = "pass" required type="password" placeholder='password'/>
                </ul>
                <ul className='form-btn'>
                <button  className = "submit" type='submit'> Login</button>
                </ul>
                <ul className='frgt-pwrd'>
                    <Link to = "/login/register">Create Account</Link>
                    <Link to = "/login/reset">Forgot Password</Link>
                </ul>
            </form>
        </div>
        </div>
    )
}

export default Login;
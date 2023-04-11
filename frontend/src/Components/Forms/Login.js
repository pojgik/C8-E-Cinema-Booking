import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form-Style/Login.css'



const Login = (props) => {

    const nav = useNavigate();
    const [loginEmail,setLoginEmail] = useState();
    const [loginPass,setLoginPass] = useState();
    const submitHandler =(event)=> {

        event.preventDefault();
        const loginUser = {
            email: loginEmail,
            password: loginPass
        }
        fetch("http://localhost:8080/users/getAllUsers")
        .then(res=>res.json())
        .then(data=>{
            const user = (data.find(user=> user.email === loginEmail))
            if (user.customerStatus === "SUSPENDED") {
                alert("This user is currently suspended. Contant a site admin to be unsuspended.")
            } 
            else {
                fetch("http://localhost:8080/users/login",{
                method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(loginUser)
            })
            .then(res=> {
                if (!res.ok) {
                    console.log(res)
                    alert('Login failed, please try again') // Replace with better message
                } else {
                    return res.json();
                }})
            .then(data => {
                sessionStorage.setItem('user', JSON.stringify(data));
                // console.log(JSON.stringify(data))
                sessionStorage.setItem('userId', data.userId);
                props.setIsLoggedIn(sessionStorage.getItem('userId'))
                props.setUser(data)
                if (data.userType === "ADMIN") {
                    sessionStorage.setItem("isAdmin",true)
                    props.setIsAdmin(sessionStorage.getItem("isAdmin"))
                }
                
                nav('/')
            })
            .catch(error => {
                console.log(error)
                if (error.message === 'User is suspended') {
                    console.log('User is suspended');
                } else {
                    console.error(error);
                }
            });

            }
        })

        
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
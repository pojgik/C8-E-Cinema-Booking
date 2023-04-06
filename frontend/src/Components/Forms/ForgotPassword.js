import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form-Style/Login.css'



const ForgotPassword = () => {

    const navigate = useNavigate();
    const [resetEmail, setResetEmail] = useState();
    const [resetPassword, setResetPassword] = useState();
    const [user, setUser] = useState(null);
    const [resetPasswordConf, setResetPasswordConf] = useState();

    const validEmail = false;

    const submitHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/users/getAllUsers", {
            header: {
                "Accept": "application/json",
                "Content-Type": "aaplication/json"
            }

        })
            .then(res => res.json())
            .then(data => {

                const user = data.find(value => value.email === resetEmail);
                if (user) {
                    setUser(user);
                    console.log(user);
                }
            })
    }

    const resetHandler = event => {
        event.preventDefault();
        console.log(event)
        console.log(resetPassword === resetPasswordConf)
        if (resetPassword === resetPasswordConf && resetPassword !== "") {
            const url = user.userId + "?newPassword=" + resetPassword
            console.log(url)
            fetch("http://localhost:8080/users/changePassword/" + url, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    navigate('/login')
                })
        }
    }
return (
    <div className='reg'>
        <h1 className='form-heading'>Forgot Password</h1>
        <div className="add-window">
            {user === null ? (
                <form onSubmit={submitHandler} className="add">
                    <ul>
                        <input onChange={(e) => {
                            setResetEmail(e.target.value)
                            console.log(resetEmail)
                        }} name="email" required type="email" placeholder='Email' />
                    </ul>
                    <ul className='form-btn'>
                        <button className="submit" type='submit'> Reset Password</button>
                    </ul>
                </form>
            ) : (
                <form onSubmit={resetHandler} className="add">
                    <ul>
                        <input onChange={(e) => { setResetPassword(e.target.value) }} name="newPass" required type="password" placeholder='New Password' />
                    </ul>
                    <ul>
                        <input onChange={(e) => { setResetPasswordConf(e.target.value) }} name="newPassConf" required type="password" placeholder='Confirm New Password' />
                    </ul>
                    <ul className='form-btn'>
                        <button className="submit" type='submit'> Reset Password</button>
                    </ul>
                </form>
            )
            }
        </div>
    </div>
)
}

export default ForgotPassword;
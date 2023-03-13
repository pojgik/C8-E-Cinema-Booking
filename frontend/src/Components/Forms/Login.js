import { Link } from 'react-router-dom';
import './Form-Style/Login.css'



const Login = () => {
    return (
        <div className='reg'>
            <h1 className='form-heading'>User Login</h1>
            <div className="add-window">
            <form className="add">
                <ul>
                <input name = "email" required type="email" placeholder='Email' />
                </ul>
                <ul>
                <input name = "pass" required type="password" placeholder='password'/>
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
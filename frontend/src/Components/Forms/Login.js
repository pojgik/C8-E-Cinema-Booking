import './Form-Style/Login.css'

const Login = () => {
    return (
        <div className='reg'>
            <h1 className='form-heading'>User Login</h1>
            <div className="add-window">
            <form className="add">
                <ul>
                <input required type="email" placeholder='Email' />
                </ul>
                <ul>
                <input required type="password" placeholder='password'/>
                </ul>
                <ul>
                <button className = "submit" type='submit'> Login</button>
                <a href='#'> Forgot Password?</a>
                </ul>
            </form>
        </div>
        </div>
    )
}

export default Login;
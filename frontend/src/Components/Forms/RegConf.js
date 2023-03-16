import './Form-Style/RegConf.css'

const RegConf = () => {
    return (
        <div className='reg'>
            <h1 className='form-heading'>Account Confirmation
                <h6>A confirmation code has been sent to your email address. Please enter it below in order to verify your new account.</h6>
            </h1>
            <div className="add-window">    
                <form className="add">
                    <ul>
                    <input className = "reg-conf" placeholder = "Confirmation Code"type="text" name = 'name' required/>
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
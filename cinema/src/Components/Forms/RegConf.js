import './Form-Style/RegConf.css'

const RegConf = () => {
    return (
        <div className='reg'>
            <h1 className='form-heading'>Account Confirmation</h1>
            <h3 className='form-heading'>
            <p>A confirmation code has been sent to your email address. Please enter it below in order to verify your new account.</p>
            </h3>
            <div className="add-window">
            
            <form className="add">
                <input required type="text" />
                <button className = 'submit' type="subimt">Confirm</button>
            </form>
        </div>
        </div>
    )
}

export default RegConf
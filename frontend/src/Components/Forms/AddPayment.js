import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form-Style/AddPayment.css'
const AddPayment = (props) => {


    const nav = useNavigate();
    const [cardType,setCardType] = useState(null);
    const [cardName,setCardName] = useState(null);
    const [cardNumber,setCardNumber] = useState(null);
    const [expireMM,setExpireMM] = useState(null);
    const [expireYY,setExpireYY] = useState(null);
    const [cvv,setCvv] = useState(null);
    const[cardLimit,setCardLimit] = useState(false)

    useEffect(() => {
        fetch("http://localhost:8080/payment/getCards/" + sessionStorage.getItem("userId"))
        .then(res=>res.json())
        .then(data=> {
            if (data.length === 3) {
                setCardLimit(true)
            }
        })
    },[])



    const handleInputChange = (event) => {
        event.preventDefault();
        const {name,value} = event.target; 
        if (name === "cardType") {
            setCardType(value);
        }
        if (name === "cardNumber") {
            setCardNumber(value);
        }
        if (name === "expireMM") {
            setExpireMM(value);
        }
        if (name === "expireYY") {
            setExpireYY(value);
        }
        if (name === "cvv") {
            setCvv(value);
        }
        if (name === "cardName") {
            setCardName(value);
        }
    }

    const submitHandler  = (event) => {
        event.preventDefault();
        if (cardLimit) {
            alert("This account has 3 cards saved already. Please delete one to add another.")
        }
        else {
        const payment = {
            cardType : cardType,
            cardNumber : cardNumber,
            encryptedCvv : cvv,
            cardName : cardName,
            expDate : expireMM + "/" + expireYY
        }
        sessionStorage.setItem("card", JSON.stringify(payment))
        if (sessionStorage.getItem("userId") !== null) {
        fetch("http://localhost:8080/payment/addCard/" + sessionStorage.getItem("userId"), {
            method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(payment)
        })
        .then(res=>res.json())
        .then(data=> {
            console.log(data)
            if (data === "CREATED") {
                alert("Card has been created.")
            }
            
        })
    }
}
    nav(-1)
        // props.setPaymentInfo(payment)
        // nav("/login/register")
    }

return ( 
        <div className='reg '>
            <h1 className='form-heading'>Add a new payment method</h1>
            <div id = "payment" className="add-window">
            <form onSubmit = {submitHandler} id = "payment-form"className="add">
            <div className='card-info'>
            <ul>
            <select onChange = {(e)=>handleInputChange(e)} name = "cardType" className="search" type = "select" required >
                <option selected disabled value = "" > Card Type</option> 
                <option value = "VISA" >Visa</option>   
                <option value = "AMEX" >American Express</option>   
                <option value = "MC" >MasterCard</option>   
                <option value = "DISCOVER" >Discover</option>   
            </select>
            </ul>
            <ul>
            <input required name = "cardNumber" onChange = {(e)=>handleInputChange(e)} placeholder='Card Number' type="text"/>
            </ul>
            <ul>
            <select required onChange = {(e)=>handleInputChange(e)} className='search' name='expireMM' id='expireMM'>
                <option value='' selected disabled>Month</option>
                <option value='01'>January</option>
                <option value='02'>February</option>
                <option value='03'>March</option>
                <option value='04'>April</option>
                <option value='05'>May</option>
                <option value='06'>June</option>
                <option value='07'>July</option>
                <option value='08'>August</option>
                <option value='09'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
            </select> 
            </ul>
            <ul>
            <select required onChange = {(e)=>handleInputChange(e)} className='search' name='expireYY' id='expireYY'>
                <option value='' selected disabled>Year</option>
                <option value='23'>2023</option>
                <option value='24'>2024</option>
                <option value='25'>2025</option>
                <option value='26'>2026</option>
                <option value='27'>2027</option>
                <option value='28'>2028</option>
                <option value='29'>2029</option>
            </select>
            </ul>
            <ul>
            <input required name = "cvv" onChange = {(e)=>handleInputChange(e)} placeholder='CVV' type="number" maxLength={3} minLength = {3}/>
            </ul>
            </div>
            <div className="billing-info">
            <ul>
            <input required name = "cardName" onChange = {(e)=>handleInputChange(e)} placeholder='Name on Card' type="text"/>
            </ul>
          
            </div>
        </form>
        <div className='payment-btn'>
            <ul >
            <button form = "payment-form" className = 'submit' type="subimt">Add</button>
            </ul>
        </div>
    </div>
    </div>
   )
}
export default AddPayment;
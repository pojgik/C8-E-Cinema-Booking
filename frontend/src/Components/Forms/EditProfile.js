import './Form-Style/EditProfile.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditProfile = (props) => {

    const thisUser = props.user;
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [email, setEmail] = useState(props.user.email);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phone);
    const [oldPassword, setOldPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConf, setPasswordConf] = useState(null);
    const [addresses, setAddresses] = useState(props.user.billingAddress);
    const [payment, setPayment] = useState(props.user.paymentCards);
    const [promo, setPromo] = useState(props.user.promotionStatus);


    // handles input being put into each input box
    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "firstName") {
            setFirstName(value);
        }
        if (name === "lastName") {
            setLastName(value);
        }
        if (name === "phone") {
            setPhoneNumber(value);
        }
        if (name === "promo") {
            setPromo(value);
        }
        if (name === "pass") {
            setPassword(value);
        }
        if (name === "pass-conf") {
            setPasswordConf(value);
        }
        if (name === "old") {
            setOldPassword(value)
        }
    }

    // submitition handler -- assigns a new User and checks for validations
    const submitHandler = (event) => {
        event.preventDefault();
        const updated = {
            user: {
                firstName: firstName,
                lastName: lastName,
                phone: phoneNumber,
                promotionStatus: promo
            },
            // paymentCards: null,
            // addressId:null
        }
        fetch("http://localhost:8080/users/editProfile/" + thisUser.userId, {
            method: "PUT",
            cors: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(updated)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                fetch("http://localhost:8080/users/getUser/" + thisUser.userId, {
                    method: "GET",
                    cors: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        props.setUser(data)
                        if (password === passwordConf && password !== "" && password !== null) {
                            if (oldPassword !== "") {
                                const url = thisUser.userId + "?newPassword=" + password + "&currentPassword=" + oldPassword
                                fetch("http://localhost:8080/users/changePassword/" + url, {
                                    method: "PUT",
                                    mode: "cors",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json",
                                    }
                                })
                                    .then(res => res.json())
                                    .then(data => console.log(data))
                            }
                        }
                    })
            })

        //  console.log(updated)




    }
    return (
        <div className='reg'>
            <h1 className='form-heading'>Edit {props.user.firstName}'s Profile</h1>
            <div className="add-window">
                <form onSubmit={submitHandler} className="add" id="registration-form">
                    <div className="container">
                        <div className="left">
                            <ul>
                                <input onChange={(e) => handleInputChange(e)} className="reg-field" placeholder={firstName} type="text" name='firstName' />
                            </ul>
                            <ul>
                                <input onChange={(e) => handleInputChange(e)} className="reg-field" placeholder={lastName} type="text" name='lastName' />
                            </ul>
                            <ul>
                                <input onChange={(e) => handleInputChange(e)} className="reg-field" placeholder={phoneNumber} type="telephone" name='phone' pattern="[0-9]{10}" />
                            </ul>
                            <ul>

                                <input className="reg-field" readOnly defaultValue={email} type="email" name='email' />
                            </ul>
                        </div>
                        <div className="right">
                            <ul>
                                <label className='reg-field'>Recieve Promotions?</label>
                                <input checked={promo} onChange={(e) => { setPromo(!promo) }} className='reg-field' type="checkbox" name='promo'></input>
                            </ul>
                            <ul>
                                <input onChange={(e) => handleInputChange(e)} className="reg-field" placeholder='Old Password' type="password" name='old' />
                            </ul>
                            <ul>
                                <input onChange={(e) => handleInputChange(e)} className="reg-field" placeholder="New Password" type="password" name='pass' />
                            </ul>
                            <ul>
                                <input onChange={(e) => handleInputChange(e)} className="reg-field" placeholder="New Password Again" type="password" name='pass-conf' />
                            </ul>
                        </div>
                        <button className='submit ' type="subimt">Edit</button>
                    </div>
                    <Link to="/add-payment" className='support frgt-pwrd reg-btn'>Add payment method</Link>
                    <Link to="/add-address" className='support frgt-pwrd reg-btn'>Add address</Link>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;
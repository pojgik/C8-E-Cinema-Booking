import './Style/ManageUsers.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import PromoSearch from './Forms/PromoSearch';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ManageUsers = ({placeholder,data}) => {
    const [thisUser,setThisUser] = useState(null);
    const [allUsers,setAllUsers] = useState(null);

    useEffect(()=> {
        fetch("http://localhost:8080/users/getAllUsers")
        .then(res=>res.json())
        .then(data=> {
            const users = data;
            setAllUsers(users)
        })
        console.log(allUsers)
    },[thisUser])

    const clickHandler = (event) => {
        event.preventDefault();
        const userId = event.target.id
        console.log(userId)
        fetch("http://localhost:8080/users/getUser/" + userId)
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            const user = data;
            setThisUser(user)
        })
        fetch("http://localhost:8080/users/suspend/"+ userId,{
            method: "PUT",
            mode:"cors",
            header: {
                "Application-Type":"application/json",
                "Accept" : "application/json"
            }
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <div className="window">
            <ul className='manage-header'>
            <h1 className="form-heading">Manage Users</h1>
            </ul>
            <form className='add'>
            <div className='card-info'>
            {
                allUsers !== null && allUsers.map(user => (
                    <div className = "card">
                        <ul>
                        <div className = "card"  key={user.id}>
                            <ul>
                                <li id = "user">
                                    <label>User Id:</label>
                            {user.userId}
                            </li>
                            <li id = "user">
                            {user.firstName + " " + user.lastName}

                            </li>
                            <li id = "user">
                            {user.email}
                            </li>
                            </ul>
                        </div>
                        {user.customerStatus === "ACTIVE" && <button id = {user.userId} onClick = {clickHandler}>Suspend</button>}
                        {user.customerStatus === "SUSPENDED" && <button id = {user.userId} onClick={clickHandler}>Unsuspend</button>}
                        </ul>
                    </div>
                ))
            }
            </div>
            </form>
            {/* <div className="add-movie"><Link className='add-movie-btn' to='/add-promo'> Add a promotion </Link></div> */}
        </div>
    )

}

export default ManageUsers;
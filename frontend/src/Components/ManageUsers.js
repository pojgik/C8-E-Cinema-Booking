import './Style/ManageUsers.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import PromoSearch from './Forms/PromoSearch';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ManageUsers = ({placeholder,data}) => {
    const [allUsers,setAllUsers] = useState(null);

    useEffect(()=> {
        fetch("http://localhost:8080/users/getAllUsers")
        .then(res=>res.json())
        .then(data=> {
            const users = data;
            setAllUsers(users)
        })
        console.log(allUsers)
    },[])
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
                            {user.userId}
                            </li>
                            <li id = "user">
                            {user.firstName}
                            </li>
                            <li id = "user">
                            {user.email}
                            </li>
                            </ul>
                        </div>
                        {user.customerStatus === "ACTIVE" && <button>Suspend</button>}
                        {user.customerStatus === "INACTIVE" && <button>Activate</button>}
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
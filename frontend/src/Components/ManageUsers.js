import './Style/ManageUsers.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import PromoSearch from './Forms/PromoSearch';
import { Link } from 'react-router-dom';

const ManageUsers = ({placeholder,data}) => {
    return (
        <div className="window">
            <ul className='manage-header'>
            <h1 className="form-heading">Manage Users</h1> 
            {/* <div className="add-movie"><Link className='add-movie-btn' to='/add-promo'> Add a promotion </Link></div> */}
            </ul>
            <UserSearch></UserSearch>
        </div>
    )

}

export default ManageUsers;
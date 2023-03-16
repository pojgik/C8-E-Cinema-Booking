import './Style/ManagePromotions.css'
import {FaSearch,FaCaretDown} from "react-icons/fa"
import PromoSearch from './Forms/PromoSearch';
import { Link } from 'react-router-dom';

const ManagePromotions = ({placeholder,data}) => {
    return (
        <div className="window">
            <ul className='manage-header'>
            <h1 className="form-heading">Manage Promotions</h1> 
            <div className="add-movie"><Link className='add-movie-btn' to='/add-promo'> Add a promotion </Link></div>
            </ul>
            <PromoSearch></PromoSearch>
        </div>
    )

}

export default ManagePromotions;
import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import "./Form-Style/Search.css"
const Search = () => {

    const [title,setTitle] = useState(null);
    const [category,setCategory] = useState(null);
    const [rating,setRating] = useState(null);
    const [showDate,setShowDate] = useState(null);

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        }
        if (name === "category") {
            setCategory(value);
        }
        if (name === "rating") {
            setRating(value);
        }
        if (name === "show-date") {
            setShowDate(value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(title);
        console.log(category);
        console.log(rating);
        console.log(showDate)
        nav('')
    }



    return (
        <div className='reg'>
        <h1 className='form-heading'>Search For Moives</h1>
        <div className="add-window">
        <form onSubmit = {submitHandler} className="add">
            <ul>
            <input name = "title" onChange = {(e)=>handleInputChange(e)} type="search" placeholder='movie title' />
            </ul>
            <ul>
            <select name = "category" onChange = {(e)=>handleInputChange(e)} type="select" className='search'> 
                        <option selected disabled value = "" >Category</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="musical">Musical</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="scifi">Science Fiction</option>
                        <option value="sports">Sports</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
            </select>
            </ul>
            <ul>
            <select name = "rating" onChange = {(e)=>handleInputChange(e)} type="select" className='search'> 
                    <option selected disabled value = "" > Rating</option>
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg13">PG-13</option>
                    <option value="r">R</option>
                    <option value="nc17">NC-17</option>
                </select>
            </ul>
            <ul>
                <label> Show Date </label>
            </ul>
            <ul>
                <input name = "show-date" onChange = {(e)=>handleInputChange(e)} className = "search" type= 'date'/>
            </ul>
            <ul className="form-btn">
            <button className = "submit" type='submit'> Search</button>
            </ul>
        </form>
    </div>
    </div>
       
    )
}

export default Search;
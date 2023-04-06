import { useState,useEffect } from 'react'
import './Form-Style/AddPromotion.css'
const AddPromotion = () => {

    const [titles,setTitles] = useState([])
    const [title,setTitle] = useState([])
    const [rate,setRate] = useState(null);
    const [end,setEnd] = useState(null);
    const [code,setCode] = useState(null);


    useEffect(()=>{
        fetch("http://localhost:8080/movies/getAllMovies")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const movieTitles = data.map(movie => movie.title);
                setTitles(movieTitles);
            });

        },[])
    console.log(titles)
    const handleInputChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        }
        if (name === "rate") {
            setRate(parseInt(value));
        }
        if (name === "end") {
            setEnd(value);
        }
        if (name === "code") {
            setCode(value);
        }
    }
    const submitHandler = (event) => {
        event.preventDefault()
        fetch("http://localhost:8080/movies/searchTitle/" + title)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.movieId)
            const promo = {
                promoCode:code,
                promoExp: end,
                discountRate: rate
            }
                fetch("http://localhost:8080/promotions/addPromotion/" + data.movieId, {
                    method: "POST",
                    mode:"cors",
                    headers: {
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify(promo)
                })
                .then(res=>res.json())
                .then(data=>console.log(data))
        })
        }
    
    return (
        <div className='reg'>
            <h1 className="form-heading">Add a promotion</h1>
            <div className="add-window">
                <form onSubmit={submitHandler}>
                <ul>
                    <select required className = "search" name = "title" onChange = {(e)=>handleInputChange(e)} type="select" placeholder='Movie title'>
                        <option selected disabled value="">Movie Title</option>
                            {titles.map((title) => {
                                return(
                                    <option value = {title}> {title}</option>
                                )
                            })}
                    </select>
                </ul>
                    <ul>
                        <input onChange = {(e)=>handleInputChange(e)} max = {100} placeholder = "Discount Rate" type="number" name = 'rate' required/>
                    </ul>
                    <ul>
                        <label> End Date </label>
                    </ul>
                    <ul>
                        <input onChange = {(e)=>handleInputChange(e)} placeholder = "End Date" className='search' type="date" name = 'end' required/>
                    </ul>
                    <ul>
                        <input onChange = {(e)=>handleInputChange(e)} placeholder = "Promotion Code" type="text" name = 'code'required/>
                    </ul>
                    <button className = 'submit' type="subimt">Add</button>

                </form>
            </div>
            </div>
    )
                    
}

export default AddPromotion;
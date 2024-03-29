import { useEffect, useState } from "react"


const ScheduleMovies =(props) => {

    const [titles,setTitles] = useState([])
    const [title,setTitle] = useState(null)
    const [showroom,setShowroom] = useState(null)
    const [time,setTime] = useState(null)
    const [date,setDate] = useState(null)
    useEffect(()=>{
        fetch("http://localhost:8080/movies/getAllMovies")
            .then(res => res.json())
            .then(data => {
                const movieTitles = data.map(movie => movie.title);
                setTitles(movieTitles);
            });

        },[])

    const handleInputChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        }
        if (name === "showroom") {
            setShowroom(value);
        }
        if (name === "time") {
            setTime(value);
        }
        if (name === "date") {
            setDate(value);
        }
    }



    const submitHandler = (event) => {
        event.preventDefault()
        const showing = {
            title:title,
            showroom:showroom,
            date:date,
            time:time
       }

        const url = ("http://localhost:8080/movies/addShow/?roomId=" + showroom + "&movieTitle=" + title).replace(" ","%20")
        const showDate = {
            showTime: date+"T"+time+":00.00Z"
        }
        fetch(url,{
                method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(showDate)
            })
        .then(res=>res.json())
        .then(data=>{
            if (data === "CREATED") alert("Showing Created!")
            if (data === "CONFLICT") alert("Couldn't Create Showing Due to Scheduling Conflict")
        })
    }

    return (
        <div className='reg'>
        <h1 className='form-heading'>Schedule Moives</h1>
        <div className="add-window">
        <form onSubmit = {submitHandler} className="add">
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
            <select required name = "showroom" onChange = {(e)=>handleInputChange(e)} type="select" className='search'>
                        <option  selected disabled value = "" >Show Rooms</option>
                        <option value = "1" >Royal (100)</option>
                        <option value = "2" >Boyd (50)</option>
                        <option value = "3" >SG (10)</option>

            </select>
            </ul>

            <ul>
                <label htmlFor="">Show Time</label>
            </ul>

            <ul>
            <input required name = "time" onChange = {(e)=>handleInputChange(e)} type="time" className='search'/>
            </ul>

            <ul>
                <label> Show Date </label>
            </ul>

            <ul>
                <input required name = "date" onChange = {(e)=>handleInputChange(e)} className = "search" type= 'date'/>
            </ul>

            <ul className="form-btn">
            <button className = "submit" type='submit'>Schedule</button>
            </ul>
        </form>
    </div>
    </div>
    )

}

export default ScheduleMovies;
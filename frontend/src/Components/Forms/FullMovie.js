import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Form-Style/AddMovie.css'
import './Form-Style/UpdateMovie.css'


const FullMovie = (props) => {
    
    return (
        <div className='reg '>
        <h1 className='form-heading'>Full Movie Description</h1>
        <div id = "payment" className="add-window">
        <form  id = "payment-form"className="add">
        <div className='card-info'>
            <ul>
                <label >Title: </label>
                {/* <label >{props.currentMovie.title}</label> */}

            </ul>
            <ul>
                <label >Category: </label>
                {/* <label >{props.currentMovie.category}</label> */}
            </ul>
             <ul>
                <label >Cast: </label>
                {/* <label >{props.currentMovie.cast}</label> */}
            </ul>
            <ul>
                <label >Director: </label>
                {/* <label >{props.currentMovie.director}</label> */}
            </ul>
            <ul>
                <label >Producer: </label>
                {/* <label >{props.currentMovie.producer}</label> */}
            </ul>
            </div>
        <div className="billing-info">
            <ul>
                <label >Synopsis: </label>
                {/* <label >{props.currentMovie.synopsis}</label> */}
            </ul>
            <ul>
                <label >Reviews: </label>
                {/* <label >{props.currentMovie.reviews}</label> */}
            </ul>
            <ul>
                
            </ul>
            <ul>
                <label >Rating: </label>
                {/* <label>{props.currentMovie.rating}</label> */}
             </ul>
            <ul>
                <label >Now Playing: </label>
                {/* {props.currentMovie.nowPlaying === true && <label>True</label>} */}
                {/* {props.currentMovie.nowPlaying === false && <label>False</label>} */}

             
            </ul>
        </div>
    </form>
    <div className='payment-btn'>
        <ul >
            {/* <iframe src = {props.currentMovie.trailerURL}></iframe> */}
        </ul>
    </div>
</div>
</div>
    )
}

export default FullMovie
import { useEffect, useState } from 'react';
import './Style/CardPane.css'
import Card from './Card';
const CardPane = (props) => {

        return (
        
        <div className="view">
            <h1 className='header'>{props.type}</h1>
            <div className = "cards">
                {
                   !props.allMovies ? (<div className='notFound'>No Movies Found...</div>) : (props.allMovies.map((card,i) => (
                        <div className="card">
                             <Card  setCounter = {props.setCounter} counter = {props.counter} isLoggedIn = {props.isLoggedIn} isAdmin = {props.isAdmin} rating = {card.rating} title = {card.title} link = {card.trailerURL} />
                         </div>
                         )))  
                }
            </div>
        </div>
        
    )
};
export default CardPane;
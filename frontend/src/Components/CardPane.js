import { useEffect, useState } from 'react';
import './Style/CardPane.css'
import Card from './Card';
const CardPane = (props) => {

    return (
        
        <div className="view">
            <h1 className='header'>{props.type}</h1>
            <div className = "cards">
                {
                  props.filteredMovies ===  null ? (<div className='notFound'>No Movies Found...</div>) : (props.filteredMovies.map((card,i) => (
                        <div className="card">
                            <Card  currentMovie = {props.currentMovie}setCurrentMovie = {props.setCurrentMovie} setFilteredMovies = {props.setFilteredMovies} filteredMovies = {props.filteredMovies} isLoggedIn = {props.isLoggedIn} isAdmin = {props.isAdmin} rating = {card.rating} title = {card.title} link = {card.trailerURL} />
                        </div>
                        )))  
                    
                }
            </div>
        </div>
        
    )
};
export default CardPane;
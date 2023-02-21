import { useState } from 'react';
import './Style/CardPane.css'
import Card from './Card';
const CardPane = (props) => {
   
    
    return (
        
        <div className="view">
            <h1 className='header'>{props.type}</h1>
            <div className = "cards">
                {
                    props.movies.map((card,i) => (
                        <div className="card">
                            <Card title = {card.title} link  = {card.link} />
                        </div>
                        ))  
                }
            </div>
        </div>
        
    )
};
export default CardPane;
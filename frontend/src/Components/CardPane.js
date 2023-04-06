import { useEffect, useState } from 'react';
import './Style/CardPane.css'
import Card from './Card';
import { set } from 'mongoose';
const CardPane = (props) => {
   
    console.log(props)

    const [movies,setMovies] = useState(null);
    // useEffect (()=> {
    //     setMovies(props.filteredMovies);
    // })
    return (
        
        <div className="view">
            <h1 className='header'>{props.type}</h1>
            <div className = "cards">
                {
                    
                  props.filteredMovies &&  props.filteredMovies.map((card,i) => (
                        <div className="card">
                            <Card title = {card.title} link = {card.trailerURL} />
                        </div>
                        ))  
                    
                }
            </div>
        </div>
        
    )
};
export default CardPane;
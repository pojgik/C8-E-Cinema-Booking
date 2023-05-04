import { useEffect, useState } from "react";

const DeleteCards = () => {

    const [cards,setCards] = useState(null);
    const [action,setAction] = useState(0)

    useEffect (() => {
    fetch("http://localhost:8080/payment/getCards/" + sessionStorage.getItem("userId"))
    .then(res=>res.json())
    .then(data=> {
        console.log(data)
        if (data.length === 0) {
            console.log(0)
            setCards(null)
        }
        if(parseInt(sessionStorage.getItem("userId")) === parseInt(data[0].user.userId))
        {
            setCards(data)
        }
        })
    },[action])
    const clickHandler = (event) => {

        event.preventDefault();
        const paymentId = event.target.id
        console.log(paymentId)
        fetch("http://localhost:8080/payment/removeCard/" + paymentId)
        .then(res=>res.json())
        .then(data=> {
            console.log(data)
            setAction(action + 1)
        })

    }

    return (
        <div className="window">
        <ul className='manage-header'>
        <h1 className="form-heading">Manage Cards</h1>
        </ul>
        <form className='add'>
        <div className='card-info'>
            {cards === null && <div className='notFound'>No Cards Found...</div>}
        {
            cards !== null && cards.map(card => (
                <div className = "card">
                    <ul>
                    <li id = "user">
                        <label>Name: </label>
                        <ul id = "user">
                        <label> {card.cardName}</label>
                        </ul>
                    </li>
                    <li id = "user">
                        <label>Card Type: </label>
                        <label> {card.cardType}</label>
                    </li>
                    <li id = "user">
                        <label>Expiration Date: </label>
                        <label> {card.expDate}</label>
                    </li>

                    {/* <div className = "card"  key={card.paymentId}>
                        <ul>
                            <li id = "user">
                                <label>Card Name:</label>
                        {card.cardName}
                        </li>
                        <li id = "user">
                        {card.cardType}
                        </li>
                        </ul>
                    </div> */}
                    {<button id = {card.paymentId} onClick={clickHandler}>Delete Card</button>}
                    </ul>
                </div>
            ))
        }
        </div>
        </form>
        {/* <div className="add-movie"><Link className='add-movie-btn' to='/add-promo'> Add a promotion </Link></div> */}
    </div>
    )
}

export default DeleteCards;
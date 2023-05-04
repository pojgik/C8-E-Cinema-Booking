import { useEffect, useState } from "react"

const OrderHistory = () => {

    const [orders,setOrders] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8080/order/getOrdersById/" + sessionStorage.getItem("userId"))
        .then(res=>res.json())
        .then(data=> {
            console.log(data)
            setOrders(data)
            data.map(order=> {

                fetch("http://localhost:8080/order/getSeatsByOrderId/" + order.orderId)
                .then(res=>res.json())
                .then(data=> {
                    console.log(data)
                })
            })
        })
    },[])

    return (
        <div className="window">
        <ul className='manage-header'>
        <h1 className="form-heading">Manage Users</h1>
        </ul>
        <form className='add'>
        <div className='card-info'>
        {
            orders !== null && orders.map(order => (
                <div className = "card">
                    <div className = "card"  key={order.orderId}>
                        <ul>
                            <li id = "user">
                                <label>Order Id: </label>
                                <label>{order.orderId}</label>

                            </li>
                            <li id = "user">
                                <label>Tickets: </label>
                                <label>{order.numTickets}</label>
                                
                            </li>
                            <li id = "user">
                                <label>Kids: </label>
                                <label>{order.childTickets}</label>
                                
                            </li>
                            <li id = "user">
                                <label>Adults: </label>
                                <label>{order.adultTickets}</label>

                            </li>
                            <li id = "user">
                                <label>Seniors: </label>
                                <label>{order.seniorTickets}</label>
                            </li>
                            <li id = "user">
                                <label>Total Price: </label>
                                <label>${order.orderTotal}</label>
                            </li>
                        </ul>
                        <ul>
                        <li id = "user">
                                <label>Movie: </label>
                                <ul id = "user">
                                <label>{order.movie.title}</label>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            ))
        }
        </div>
        </form>
        {/* <div className="add-movie"><Link className='add-movie-btn' to='/add-promo'> Add a promotion </Link></div> */}
    </div>
    )

}

export default OrderHistory
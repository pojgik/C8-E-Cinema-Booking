
import './App.css';
import NavBar from './Components/NavBar';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import CardPane from './Components/CardPane';
import { useEffect, useState,useRef } from 'react';
import ManageMovies from './Components/ManageMovies';
import ManagePromotions from './Components/ManagePromotions';
import AddMovie from './Components/Forms/AddMovie'
import UpdateMovie from './Components/Forms/UpdateMovie';
import AddPromotion from './Components/Forms/AddPromotion';
import Registration from './Components/Forms/Registration';
import AddPayment from './Components/Forms/AddPayment'
import AddAdress from './Components/Forms/AddAdress';
import RegConf from './Components/Forms/RegConf';
import Login from './Components/Forms/Login';
import EditProfile from './Components/Forms/EditProfile';
import Checkout from './Components/Forms/Checkout';
import BuyTicket from './Components/Forms/BuyTicket';
import OrderSummary from './Components/Forms/OrderSummary';
import OrderConfirmation from './Components/Forms/OrderConfirmation';
import Footer from './Components/Footer';
import Search from './Components/Forms/Search';
import ForgotPassword from './Components/Forms/ForgotPassword';


function App() {


  const [WickCards] = useState([
    {
        title: "movie-1",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-2",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-3",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-4",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-5",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-6",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
  ])
  const [AntCards] = useState([
    {
        title: "movie-7",
        link: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-8",
        link: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-9",
        link: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-10",
        link: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-11",
        link: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-12",
        link: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
  ]);
  const [user,setUser] = useState(null);
  const [address,setAddress] = useState([]);
  const [isAdmin,setIsAdmin] = useState(sessionStorage.isAdmin);
  const [isLoggedIn,setIsLoggedIn] = useState(sessionStorage.userId !== undefined);

  console.log(isLoggedIn)

  
  
  return (
   
        <Router>
        <div className="App"> 
        <NavBar setIsLoggedIn = {setIsLoggedIn} setIsAdmin = {setIsAdmin} isAdmin = {isAdmin} isLoggedIn = {isLoggedIn}/> 
        <Routes>
        <Route exact path = "/" element = {<> <CardPane type = {"New Movies"} movies = {WickCards}/> <CardPane type = {"Coming Soon"} movies = {AntCards}/></>}> </Route>
            <Route path = '/login'  element = {<Login setIsLoggedIn = {setIsLoggedIn} setIsAdmin = {setIsAdmin} setCurrentUser = {setUser}/>}></Route>
            <Route path = '/search' element = {<Search/>}></Route>
            <Route path = '/login/register' element = {<Registration addressSetter = {setAddress} addresses = {address} users = {user}/>}></Route>
            <Route path = "/manage-movies" element = {<ManageMovies/>}></Route>
            <Route path = "/update-movie" element = {<UpdateMovie/>}></Route>
            <Route path = "/add-payment" element = {<AddPayment/>}></Route>
            <Route path = "/add-address" element = {<AddAdress setter = {setAddress}/>}></Route>
            <Route path = "/add-movie" element = {<AddMovie/>}></Route>
            <Route path='/reg-conf' element = {<RegConf/>}></Route>
            <Route path='/manage-promos' element = {<ManagePromotions/>}></Route>
            <Route path='/add-promo' element = {<AddPromotion></AddPromotion>}></Route>
            <Route path='/login/reset' element = {<ForgotPassword></ForgotPassword>}></Route>
            <Route path='/profile' element = {<EditProfile currentUser = {user}></EditProfile>}></Route>

        </Routes>
        <Footer/>
        </div>
        </Router>
            // <AddPromotion/>
            // <EditProfile/>
            // <Checkout/>
            // <BuyTicket/>
            // <OrderSummary/>
            // <OrderConfirmation/>  
  );
}

export default App;


import './App.css';
import NavBar from './Components/NavBar';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import CardPane from './Components/CardPane';
import { useState } from 'react';
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
  ])
  return (
   
        <Router>
        <div className="App"> 
        <NavBar/> 
        <Routes>
            <Route exact path = "/" element = {<> <CardPane type = {"New Movies"} movies = {WickCards}/> <CardPane type = {"Coming Soon"} movies = {AntCards}/></>}> </Route>
            <Route path = '/login' element = {<Login/>}></Route>
            <Route path = '/search' element = {<Search/>}></Route>
            <Route path = '/login/register' element = {<Registration/>}></Route>
            <Route path = "/manage-movies" element = {<ManageMovies/>}></Route>
            <Route path = "/update-movie" element = {<UpdateMovie/>}></Route>
            <Route path = "/add-payment" element = {<AddPayment/>}></Route>
            <Route path = "/add-address" element = {<AddAdress/>}></Route>
            <Route path = "/add-movie" element = {<AddMovie/>}></Route>
            <Route path='/reg-conf' element = {<RegConf/>}></Route>
            <Route path='/manage-promos' element = {<ManagePromotions/>}></Route>
            <Route path='/add-promo' element = {<AddPromotion></AddPromotion>}></Route>
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

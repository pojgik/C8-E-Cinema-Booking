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
import FullMovie from './Components/Forms/FullMovie';
import Search from './Components/Forms/Search';
import ForgotPassword from './Components/Forms/ForgotPassword';
import ScheduleMovies from './Components/Forms/ScheduleMovies';
import ManageUsers from './Components/ManageUsers';
import Booking from './Components/Forms/Booking';


function App() {

    const [moviesOut,setMoviesOut] = useState();
    const [moviesComming,setMoviesComming] = useState();

    useEffect(()=>{
        fetch("http://localhost:8080/movies/getAllMovies")
        .then(res=>res.json())
        .then(data=>{
            const nowPlayingMovies = data.filter(movie => movie.nowPlaying === true);
            console.log(nowPlayingMovies)
            setMoviesOut(nowPlayingMovies);
        })
        
        console.log(moviesOut)
    },[])


  const [WickCards] = useState([
    {
        title: "movie-1",
        link: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-2",
        trailerURL: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-3",
        trailerURL: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-4",
        trailerURL: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-5",
        trailerURL: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
    {
        title: "movie-6",
        trailerURL: 'https://www.youtube.com/embed/yjRHZEUamCc'
    },
  ])
  const [AntCards] = useState([
    {
        title: "movie-7",
        trailerURL: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-8",
        trailerURL: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-9",
        trailerURL: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-10",
        trailerURL: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-11",
        trailerURL: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
    {
        title: "movie-12",
        trailerURL: 'https://www.youtube.com/embed/ZlNFpri-Y40'
    },
  ]);

  const [filteredMovies,setFilteredMovies] = useState()
  const [currentMovie,setCurrentMovie] = useState(null)
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [paymentInfo,setPaymentInfo] = useState(null)
  const [address,setAddress] = useState([]);
  const [isAdmin,setIsAdmin] = useState(sessionStorage.isAdmin);
  const [isLoggedIn,setIsLoggedIn] = useState(sessionStorage.userId !== undefined);
  return (

        <Router>
        <div className="App">
        <NavBar user = {user} setUser = {setUser} setIsLoggedIn = {setIsLoggedIn} setIsAdmin = {setIsAdmin} isAdmin = {isAdmin} isLoggedIn = {isLoggedIn}/>
        <Routes>
        <Route exact path = "/" element = {<> <CardPane isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} type = {"New Movies"} filteredMovies = {moviesOut}/> <CardPane isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} type = {"Coming Soon"} filteredMovies = {AntCards}/></>}> </Route>
            <Route path = '/login'  element = {<Login setUser = {setUser} setIsLoggedIn = {setIsLoggedIn} setIsAdmin = {setIsAdmin} setCurrentUser = {setUser}/>}></Route>
            <Route path = '/search' element = {<Search setFilteredMovies = {setFilteredMovies}/>}></Route>
            <Route path = '/login/register' element = {<Registration addressSetter = {setAddress} paymentInfo = {paymentInfo} addresses = {address} users = {user}/>}></Route>
            <Route path = "/manage-movies" element = {<ManageMovies filteredMovies = {filteredMovies} setFilteredMovies = {setFilteredMovies}/>}></Route>
            <Route path = "/update-movie/:id" element = {<UpdateMovie currentMovie = {currentMovie}/>}></Route>
            <Route path = "/add-payment" element = {<AddPayment setPaymentInfo = {setPaymentInfo}/>}></Route>
            <Route path = "/add-address" element = {<AddAdress setter = {setAddress}/>}></Route>
            <Route path = "/add-movie" element = {<AddMovie/>}></Route>
            <Route path = "/searched" element = {<CardPane   currentMovie = {currentMovie} setCurrentMovie = {setCurrentMovie} setFilteredMovies = {setFilteredMovies} isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} type = {"Filtered Movies"} filteredMovies = {filteredMovies}/>}></Route>
            <Route path='/reg-conf' element = {<RegConf/>}></Route>
            <Route path='/manage-promos' element = {<ManagePromotions/>}></Route>
            <Route path='/add-promo' element = {<AddPromotion></AddPromotion>}></Route>
            <Route path='/full-movie/:id' element = {<FullMovie currentMovie = {currentMovie}></FullMovie>}></Route>
            <Route path='/schedule-movies' element = {<ScheduleMovies/>}></Route>
            <Route path='/login/reset' element = {<ForgotPassword></ForgotPassword>}></Route>
            <Route path='/profile' element = {<EditProfile setUser = {setUser} user = {user}></EditProfile>}></Route>
            <Route path='/manage-users' element = {<ManageUsers/>}></Route>
            <Route path = "/booking/:id" element = {<Booking/>}></Route>
            

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
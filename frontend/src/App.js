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

    const [counter,setCounter] = useState(0)
    const [moviesOut,setMoviesOut] = useState();
    const [moviesComming,setMoviesComming] = useState();
    const [filteredMovies,setFilteredMovies] = useState(JSON.parse(sessionStorage.getItem("filteredMovies")))
    const [allMovies,setAllMovies] = useState()

    useEffect(() => {
        fetch("http://localhost:8080/movies/getAllMovies")
          .then(res=>res.json())
          .then(data=>{
            if (data !== null || data !== undefined) {
              const movies = data;
              setAllMovies(movies)
            }
          })
    }, [counter]);

    useEffect(() => {
         if (allMovies !== undefined && allMovies !== null) {
                const nowPlayingMovies = allMovies.filter(movie => movie.nowPlaying === true);
                setMoviesOut(nowPlayingMovies);
                const moviesComingSoon = allMovies.filter(movie => movie.nowPlaying === false);
                setMoviesComming(moviesComingSoon);
                if (filteredMovies !== null && filteredMovies !== undefined) {
                const filteredMoviesUpdated = filteredMovies.filter(movie => allMovies.find(m => m.movieId === movie.movieId));
                setFilteredMovies(filteredMoviesUpdated);
         }
        }
    }, [allMovies]);

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
        <Route exact path = "/" element = {<> <CardPane  setCounter = {setCounter} counter = {counter} allMovies = {moviesOut}  isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} type = {"New Movies"}/> <CardPane  setCounter = {setCounter} counter = {counter} allMovies = {moviesComming} isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} type = {"Coming Soon"}/></>}> </Route>
            <Route path = '/login'  element = {<Login setUser = {setUser} setIsLoggedIn = {setIsLoggedIn} setIsAdmin = {setIsAdmin} setCurrentUser = {setUser}/>}></Route>
            <Route path = '/search' element = {<Search setFilteredMovies = {setFilteredMovies}/>}></Route>
            <Route path = '/login/register' element = {<Registration addressSetter = {setAddress} paymentInfo = {paymentInfo} addresses = {address} users = {user}/>}></Route>
            <Route path = "/manage-movies" element = {<ManageMovies filteredMovies = {filteredMovies} setFilteredMovies = {setFilteredMovies}/>}></Route>
            <Route path = "/update-movie/:id" element = {<UpdateMovie currentMovie = {currentMovie}/>}></Route>
            <Route path = "/add-payment" element = {<AddPayment setPaymentInfo = {setPaymentInfo}/>}></Route>
            <Route path = "/add-address" element = {<AddAdress setter = {setAddress}/>}></Route>
            <Route path = "/add-movie" element = {<AddMovie setCounter = {setCounter} counter = {counter} />}></Route>
            <Route path = "/searched" element = {<CardPane setCounter = {setCounter} counter = {counter} allMovies = {filteredMovies} isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} type = {"Filtered Movies"}/>}></Route>
            <Route path='/reg-conf' element = {<RegConf/>}></Route>
            <Route path='/manage-promos' element = {<ManagePromotions/>}></Route>
            <Route path='/add-promo' element = {<AddPromotion></AddPromotion>}></Route>
            <Route path='/full-movie/:id' element = {<FullMovie isLoggedIn = {isLoggedIn} currentMovie = {currentMovie}></FullMovie>}></Route>
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
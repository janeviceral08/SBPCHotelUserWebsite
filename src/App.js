import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Home from "./components/home";
import CreateUser from "./components/create-user.component";
import Search_page from "./components/search_page";
import Additional_info_user from "./components/additional_info_user";
import Print_info from "./components/print_info"
import Check_reservation from "./components/check_reservation"
import PaginationExample from "./components/PaginationExample"
import Room_Info from "./components/Room_Info"
import Room_Infos from "./components/Room_Infos"
import Update_Info from "./components/update_info"
import Voucher from "./components/voucher"
import Booking from "./components/booking"
import More from "./components/more"
import Booking_Details from "./components/booking_details"
import Saved_page from "./components/saved"
import Website_reserve from "./components/website_reserve"

import './files/font-awesome-4.7.0/css/font-awesome.min.css';
import './files/css/bootstrap.min.css';
import './files/slick/slick.css';
import './files/slick/slick-theme.css';
import './files/css/datepicker.css';
import './files/css/tooplate-style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {

  
  return (
    <Router>

      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/Home" component={Home} />
      <Route path="/Update_Info" component={Update_Info} />
      <Route path="/Voucher" component={Voucher} />
      <Route path="/Booking" component={Booking} />
      <Route path="/Booking_Details/:code/:hotel/:room" component={Booking_Details} />
      <Route path="/More" component={More} />
      <Route path="/PaginationExample" component={PaginationExample} />
      <Route path="/Check_reservation" component={Check_reservation} />
      <Route path="/Search_page/:check_in/:check_out/:guest/:address" component={Search_page} />
      <Route path="/Room_Info/:check_in/:check_out/:guest/:address/:hotel/:room" component={Room_Info} />
      <Route path="/Room_Infos/:check_in/:check_out/:guest/:address/:hotel/:room" component={Room_Infos} />
      <Route path="/Additional_info_user/:check_in/:check_out/:guest/:room/:hotel" component={Additional_info_user} />
      <Route path="/Print_info/:name/:email/:phone_no/:address/:nationality/:mode/:reservation_code/:in_check/:out_check/:room/:guest/:hotel/:code/:vmode/:vamount" component={Print_info} />
      <Route path="/Saved_page/:check_in/:check_out/:guest/:address" component={Saved_page} />
      <Route path="/Website_reserve" component={Website_reserve} />
    
    </Router>
  );
}

export default App;

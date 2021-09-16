import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  componentDidMount() {
    window.onscroll = function() {myFunction()};

    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }
  render() {
    return (
      <div>     
         <div className="top-container">
         <div class="navbar">
         <p>Hotel Name</p>
      <p>Login for admin</p>
      
      </div>
    </div>
    <div class="header" id="myHeader">
      
<div class="navbar">

<a className="menu"><Link to="/">Hamburger Menu</Link></a>
<a className="menu"><Link to="/" >Website Logo</Link></a>
<a className="menu"><Link to="/">Hotel Name</Link></a>
<a className="menu"><Link to="/create" >Rooms & Suite</Link></a>
<a className="menu"><Link to="/user">Make Reservation</Link></a>
<a className="menu"><Link to="/Home">About Us</Link></a>

{/*
<Link to="/" className="navbar-brand">ExcerTracker</Link>
<Link to="/" className="nav-link">Exercises</Link>
<Link to="/create" className="nav-link">Create Exercise Log</Link>
<Link to="/user" className="nav-link">Create User</Link>
<Link to="/Home" className="nav-link">Home</Link>*/
  }
</div>

    </div>
      


    

      </div>
    );
  }
}
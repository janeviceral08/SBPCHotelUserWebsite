import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import Loaders from './loader';
import cogoToast from 'cogo-toast';
import img from "../files/img/logo.png"
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import Carousel from 'react-bootstrap/Carousel'
import Select, { components } from 'react-select';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
  };

  


const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;
const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
const INITIAL_STATE = {
    room_info: [],
    exercises: [],
    hotel_info: "",
    email:"",
    mobile: "",
    tel_no:"",
    website: "",
    address: "",
    name: "",
    map: "",
    img:"",
    offset: 0,
    tableData: [],
    orgtableData: [],
    perPage: 5,
    currentPage: 0,
    setAge: '',
    sorting:false,
    setOpen:false,
    setOpenVideo:false,
    tagsLandmarks: [],
    tagsPolicies: [],
    tags: [],
    loading: null,
    room_id:'',
    idinfo:'',
    car: [],
    car_default: [
        {original: 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg',
        thumbnail: 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'}
    ],
};

export default class More extends Component {
    constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

  componentDidMount() {
    this.setState({userlocal: localStorage.getItem('user_id')})
    const hotel = {    val: this.props.match.params.hotel }
	axios.post('http://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
	.then(response => {
         this.setState({ 
            email: response.data.email,
            hotel_info: response.data.hotel_info,
  mobile: response.data.mobile,
  tel_no: response.data.tel_no,
  website: response.data.website,
  address: response.data.address,
  name: response.data.hotel_name,
        map: response.data.map_address,
        img: response.data.hotel_image,
        tagsLandmarks:response.data.tagsLandmarks,
        tagsPolicies: response.data.tagsPolicies,
        tags: response.data.tags,
          })
	})
	.catch((error) => {
	  console.log(error);
	})

	axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
        let room = this.props.match.params.room;
        let res = response.data.find(element => element.temp_id === room);


        let car = res.img.map(({original, thumbnail}) => ({original, thumbnail }))
        console.log('car: ', car);
	  this.setState({ exercises: response.data ,  room_info:  res, car: car})
	})
	.catch((error) => {
	  console.log(error);
	})


 
  }

  

  onSubmit = () => {
   
    const { name, email,phone_no,address,nationality,mode } = this.state;
   const reservation_code = Math.floor(Math.random() * 9999)+moment().unix();
    const exercise = {
        name, 
        email,
        phone_no,
        address,
        nationality,
        mode, 
        reservation_code,
        in_check: moment(this.props.match.params.check_in).unix(),
        out_check: moment(this.props.match.params.check_out).unix(),
        room: this.props.match.params.room,
        guest: this.props.match.params.guest,
        createdAt: moment().unix(),
        _partition: 'project=60641fde66ceb2089b1bc468'
      }



     // console.log('nationality', nationality)
     if(parseFloat(this.props.match.params.guest) > parseFloat(this.state.exercises.max_person)){
      cogoToast.error('Sorry Maximum number of Guest is '+ this.state.exercises.max_person);
    } else{
 
      if (!name.trim()) {
        cogoToast.error('Please Enter Name');
        return;
      }
      if (!email.trim()) {
        cogoToast.error('Please Enter Email');
        return;
      }
   
      //Check for the Email TextInput
      if (!phone_no.trim()) {
        cogoToast.error('Please Enter Phone Number');
        return;
      }
      if (!address.trim()) {
        cogoToast.error('Please Enter Address');
        return;
      }
   
      if (!nationality.trim()) {
        cogoToast.error('Please Enter Nationality');
        return;
      }
      if (!mode.trim()) {
        cogoToast.error('Please Enter Mode of Payment');
        return;
      }
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => { 
                axios.post('http://gloreto.herokuapp.com/reservation/book_reservation', exercise)
                .then(res =>{
                    console.log('datas', res.data)
                    if(res.data == 'Exercise added!'){
                        this.props.history.push('/Print_info/'+name+'/'+email+'/'+phone_no+'/'+address+'/'+nationality+'/'+mode+'/'+reservation_code+'/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.room+'/'+this.props.match.params.guest)
                    }
                    else{
                        cogoToast.error('Please Try Again');
                    }
                    
                });
          
          
                //this.props.history.push('/Admin')
            }
          },
          {
            label: 'No',
            onClick: () => console.log('No')
          }
        ]
      });
    }
     
   
};

onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};
book_now = () => {
    if( this.props.match.params.guest !== "" && this.props.match.params.check_out!== "" && this.props.match.params.check_in!== ""  && this.props.match.params.room!== ""  && this.props.match.params.hotel!== ""){
        this.props.history.push('/Additional_info_user/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.guest+'/'+this.props.match.params.room+'/'+this.props.match.params.hotel)
    }
       else{
        console.log("Please Complete the fields");
       }
    
   };


   room_info_direct = (temp_id) => {
	this.props.history.push('/Room_Infos/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.guest+'/'+this.props.match.params.address+'/'+this.props.match.params.hotel +'/'+temp_id )
};





logout = () => {
    confirmAlert({
      title: 'Logout ',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
          {
    localStorage.removeItem('user_id')
    window.location.reload(); 
  
          }
  
        },
        {
          label: 'No',
          onClick: () => console.log('no')
        }
      ]
    });
  
  }




  render() {
	const { name, email,phone_no,address,nationality,mode,error } = this.state;

		const isInvalid = name === '' || phone_no === ''|| address === ''|| nationality === ''|| mode === '';
        console.log('this.state.room_info.img',this.state.room_info.img)
console.log('window width: ', window.innerWidth)

     //   const INFO_ROOM = this.state.room_info.img.map(({original, thumbnail}) => ({original, thumbnail }))
    return (
       
<body>
<div class="tm-main-content" id="top">
            <div class="tm-top-bar-bg"></div>
            <div class="tm-top-bar" id="tm-top-bar">
                <div class="container">
                    <div class="row">
                        
                    <nav class="navbar navbar-expand-lg narbar-light">
                            <Link to={'/Home'} class="navbar-brand mr-auto" href="#">
                                <img src="img/logo.png" alt="Site logo" style={{marginTop: -20}}/>
                                Gloreto
                            </Link>
                           
                            <div id="mainNav" class="collapse navbar-collapse tm-bg-white">
                                <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                  <Link to={'/Home'}>
                                    <a class="nav-link" href="#top">Home <span class="sr-only">(current)</span></a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                      <Link to={'/Check_reservation'}>
                                    <a class="nav-link" href="#tm-section-5">Check Reservation</a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" href="#tm-section-6">Contact Us</a>
                                  </li>
                                  {this.state.userlocal === null || this.state.userlocal === undefined? null:
                                     <li class="nav-item">
                                     <Link to={'/Update_Info'}>
                                <a class="nav-link">Profile</a>
                                </Link>
                              </li>
                                  }
                                   {this.state.userlocal === null || this.state.userlocal === undefined? null:
                                     <li class="nav-item">
                                     <Link to={'/Booking'}>
                                <a class="nav-link">Bookings</a>
                                </Link>
                              </li>
                                  }
                                   {this.state.userlocal === null || this.state.userlocal === undefined ? null:
                                     <li class="nav-item">
                                     <Link to={'/Voucher'}>
                                <a class="nav-link">Vouchers</a>
                                </Link>
                              </li>
                                  }
                                  {this.state.userlocal === null || this.state.userlocal === undefined? <span>
                                       <li class="nav-item">
                                    <a class="nav-link" onClick={this.handleOpen}>Login/Signup</a>
                                  </li>
                                    
                                    
                                    </span>:
                                    
                                  
                                       <li class="nav-item">
                                    <a class="nav-link" onClick={this.logout}>Logout</a>
                                  </li>
                                    
                                    }
                                   
                               
                                </ul>
                            </div>                            
                        </nav>                
                    </div>
                </div>
            </div>
     

            <div>

                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5"  style={{height: '100%'}}>     

                  <div style={{width: '100%'}}>


                  <div class="settings-card" style={{'text-align': 'center'}}>
                  <ListGroup variant="flush">
                  <ListGroup.Item> <Link to={'/Home'}> <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="avatar-more" /></Link></ListGroup.Item>
    <ListGroup.Item><Link to={'/Home'}> <span style={{color: 'black',marginLeft: '10px' }}>Name Here</span> <br /><span style={{color: 'black',marginLeft: '10px' }}>Level 1</span></Link></ListGroup.Item>

  </ListGroup>
                 </div> 

                 <div class="settings-card">
                  <ListGroup variant="flush">
 <Link to={'/Update_Info'}><ListGroup.Item><i class="fa fa-user-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Profile</span></ListGroup.Item></Link>
  </ListGroup>
                 </div> 

                  <div class="settings-card">
                  <ListGroup variant="flush">
                  <ListGroup.Item> <Link to={'/Saved_page'}> <i class="fa fa-heart-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Saved Rooms</span></Link></ListGroup.Item>
    <ListGroup.Item><Link to={'/Home'}> <i class="fa fa-thumbs-o-up" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Reviews</span></Link></ListGroup.Item>
    <ListGroup.Item><Link to={'/Home'}> <i class="fa fa-file-image-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Post</span></Link></ListGroup.Item>
  
  </ListGroup>
                 </div> 


                 <div class="settings-card">
                  <ListGroup variant="flush">
            
    <ListGroup.Item><Link to={'/Home'}> <i class="fa fa-globe" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Language</span></Link></ListGroup.Item>
    <ListGroup.Item><Link to={'/Home'}> <i class="fa fa-usd" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Currency</span></Link></ListGroup.Item>
 
    <ListGroup.Item> <Link to={'/Home'}> <i class="fa fa-question-circle" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Contact Us</span></Link></ListGroup.Item>
    
  
  </ListGroup>
                 </div> 

                  

                 <div class="settings-card" style={{marginBottom: '60px'}}>
                  <ListGroup variant="flush">
    <ListGroup.Item onClick={this.logout}> <i class="fa fa-sign-out" style={{color: '#e87b1c', fontSize: '25px'}}> </i><span style={{color: 'black',marginLeft: '10px' }}>Logout</span></ListGroup.Item>
  </ListGroup>
                 </div> 



                














                

                    </div>
                                  
                  </div>

{window.innerWidth < 992?
    <div class="fixed-bottom-minimized">
 <div style={{textAlign: 'center', padding: '10px'}}>   <Link to={'/Home'}> <i class="fa fa-building-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Home</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Booking'}>  <i class="fa fa-address-book-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Bookings</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Voucher'}>  <i class="fa fa-ticket" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Voucher</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/More'}>  <i class="fa fa-cogs" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>More</span></Link></div>
 </div> :null


}
                  
            </div>       
        </div>

</body>
    )
  }
}
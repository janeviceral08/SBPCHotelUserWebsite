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

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

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
    reserve_booking:[],
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
    setValue:0,
    car_default: [
        {original: 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg',
        thumbnail: 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'}
    ],
    userlocal: "",
};

export default class Booking extends Component {
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
    const guest_id = {    guest_id: localStorage.getItem('user_id') }

    axios.post('http://localhost:5000/reservation/reserve_booking/', guest_id)
	.then(response => {
	  this.setState({ reserve_booking: response.data })
      console.log('reserve_booking.data: ', response.data)
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


Booking_Details = (code,hotel,room) => {
	this.props.history.push('/Booking_Details/'+code+'/'+hotel+'/'+room)
};


room_name = (hotel,room) => {

    let hotels = {  val: hotel, }
 
    let name_value = axios.post('http://gloreto.herokuapp.com/room_type/', hotels)
    .then(function (res) { return res.data });
   
    console.log('name_value: ',name_value);
 
    return 'name_value';
  }


  handleChange = (event, newValue) => {
    this.setState({setValue: newValue});
  };

  render() {
	const { name, email,phone_no,address,nationality,mode,error } = this.state;

		const isInvalid = name === '' || phone_no === ''|| address === ''|| nationality === ''|| mode === '';
        console.log('this.state.room_info.img',this.state.room_info.img)


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
                                <img src={img} alt="Site logo" style={{marginTop: -20}}/>
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

                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">     

                  <div class="ie-h-align-center-fix" style={{width: '100%'}}>


                  <AppBar position="static" color="default">
        <Tabs
          value={this.state.setValue}
          onChange={this.handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Proccessing Reservation" icon={<CachedRoundedIcon />} {...a11yProps(0)} />
          <Tab label="Confirmed Reservation" icon={<DateRangeRoundedIcon />} {...a11yProps(1)} />
          <Tab label="Currently Checked In" icon={<MeetingRoomIcon />} {...a11yProps(2)} />
          <Tab label="For Review" icon={<RateReviewIcon />} {...a11yProps(3)} />
          <Tab label="Completed" icon={<AssignmentTurnedInIcon />} {...a11yProps(4)} />
          <Tab label="Cancelled Reservation" icon={<CancelScheduleSendIcon />} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.setValue} index={0}>
      <div class="uk-container">
    <div class="uk-timeline">
    
    {this.state.reserve_booking.map((info, indexs)=>
    info.status === 'For Reservation'?
    <div class="uk-timeline-item" key={indexs}>
            <div class="uk-timeline-icon">
                     <span class="uk-badge"><span>{moment(info.updatedAt * 1000).format('MMM D YYYY')}</span></span>
            </div>
            <div class="uk-timeline-content" onClick={()=> this.Booking_Details(info.reservation_code, info._partition,info.room)}>
                <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <h3 class="uk-card-title"><time datetime="2020-07-07">Reservation: {info.reservation_code}</time></h3>
                            <p>{moment(info.in_check * 1000).format('MMMM D, YYYY')} - {moment(info.out_check * 1000).format('MMMM D, YYYY')} <br /> <span style={{fontWeight: 'bold', fontSize: '15px'}}> {info.guest} Guest</span></p>
                           
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                    <span class="uk-label uk-label-warning uk-margin-auto-left"> <span style={{fontWeight: 'bold'}}>Status:</span> {info.status} </span>
                    </div>
                </div>
            </div>
        </div>
:null
    )}
        
				



    </div>
</div>
      </TabPanel>
      <TabPanel value={this.state.setValue} index={1}>
      {this.state.reserve_booking.map((info, indexs)=>
    info.status === 'Confirmed'?
    <div class="uk-timeline-item" key={indexs}>
            <div class="uk-timeline-icon">
                     <span class="uk-badge"><span>{moment(info.updatedAt * 1000).format('MMM D YYYY')}</span></span>
            </div>
            <div class="uk-timeline-content" onClick={()=> this.Booking_Details(info.reservation_code, info._partition,info.room)}>
                <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <h3 class="uk-card-title"><time datetime="2020-07-07">Reservation: {info.reservation_code}</time></h3>
                            <p>{moment(info.in_check * 1000).format('MMMM D, YYYY')} - {moment(info.out_check * 1000).format('MMMM D, YYYY')} <br /> <span style={{fontWeight: 'bold', fontSize: '15px'}}> {info.guest} Guest</span></p>
                           
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                    <span class="uk-label uk-label-warning uk-margin-auto-left"> <span style={{fontWeight: 'bold'}}>Status:</span> {info.status} </span>
                    </div>
                </div>
            </div>
        </div>
:null
    )}
      </TabPanel>
      <TabPanel value={this.state.setValue} index={2}>
      {this.state.reserve_booking.map((info, indexs)=>
    info.status === 'Checked-in'?
    <div class="uk-timeline-item" key={indexs}>
            <div class="uk-timeline-icon">
                     <span class="uk-badge"><span>{moment(info.updatedAt * 1000).format('MMM D YYYY')}</span></span>
            </div>
            <div class="uk-timeline-content" onClick={()=> this.Booking_Details(info.reservation_code, info._partition,info.room)}>
                <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <h3 class="uk-card-title"><time datetime="2020-07-07">Reservation: {info.reservation_code}</time></h3>
                            <p>{moment(info.in_check * 1000).format('MMMM D, YYYY')} - {moment(info.out_check * 1000).format('MMMM D, YYYY')} <br /> <span style={{fontWeight: 'bold', fontSize: '15px'}}> {info.guest} Guest</span></p>
                           
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                    <span class="uk-label uk-label-warning uk-margin-auto-left"> <span style={{fontWeight: 'bold'}}>Status:</span> {info.status} </span>
                    </div>
                </div>
            </div>
        </div>
:null
    )}
      </TabPanel>
      <TabPanel value={this.state.setValue} index={3}>
      {this.state.reserve_booking.map((info, indexs)=>
    info.status === 'Checked-in'?
    <div class="uk-timeline-item" key={indexs}>
            <div class="uk-timeline-icon">
                     <span class="uk-badge"><span>{moment(info.updatedAt * 1000).format('MMM D YYYY')}</span></span>
            </div>
            <div class="uk-timeline-content" onClick={()=> this.Booking_Details(info.reservation_code, info._partition,info.room)}>
                <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <h3 class="uk-card-title"><time datetime="2020-07-07">Reservation: {info.reservation_code}</time></h3>
                            <p>{moment(info.in_check * 1000).format('MMMM D, YYYY')} - {moment(info.out_check * 1000).format('MMMM D, YYYY')} <br /> <span style={{fontWeight: 'bold', fontSize: '15px'}}> {info.guest} Guest</span></p>
                           
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                    <span class="uk-label uk-label-warning uk-margin-auto-left"> <span style={{fontWeight: 'bold'}}>Status:</span> {info.status} </span>
                    </div>
                </div>
            </div>
        </div>
:null
    )}
      </TabPanel>
      <TabPanel value={this.state.setValue} index={4}>
      {this.state.reserve_booking.map((info, indexs)=>
    info.status === 'Completed'?
    <div class="uk-timeline-item" key={indexs}>
            <div class="uk-timeline-icon">
                     <span class="uk-badge"><span>{moment(info.updatedAt * 1000).format('MMM D YYYY')}</span></span>
            </div>
            <div class="uk-timeline-content" onClick={()=> this.Booking_Details(info.reservation_code, info._partition,info.room)}>
                <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <h3 class="uk-card-title"><time datetime="2020-07-07">Reservation: {info.reservation_code}</time></h3>
                            <p>{moment(info.in_check * 1000).format('MMMM D, YYYY')} - {moment(info.out_check * 1000).format('MMMM D, YYYY')} <br /> <span style={{fontWeight: 'bold', fontSize: '15px'}}> {info.guest} Guest</span></p>
                           
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                    <span class="uk-label uk-label-warning uk-margin-auto-left"> <span style={{fontWeight: 'bold'}}>Status:</span> {info.status} </span>
                    </div>
                </div>
            </div>
        </div>
:null
    )}
      </TabPanel>
      <TabPanel value={this.state.setValue} index={5}>
      {this.state.reserve_booking.map((info, indexs)=>
    info.status === 'Cancelled'?
    <div class="uk-timeline-item" key={indexs}>
            <div class="uk-timeline-icon">
                     <span class="uk-badge"><span>{moment(info.updatedAt * 1000).format('MMM D YYYY')}</span></span>
            </div>
            <div class="uk-timeline-content" onClick={()=> this.Booking_Details(info.reservation_code, info._partition,info.room)}>
                <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <h3 class="uk-card-title"><time datetime="2020-07-07">Reservation: {info.reservation_code}</time></h3>
                            <p>{moment(info.in_check * 1000).format('MMMM D, YYYY')} - {moment(info.out_check * 1000).format('MMMM D, YYYY')} <br /> <span style={{fontWeight: 'bold', fontSize: '15px'}}> {info.guest} Guest</span></p>
                           
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                    <span class="uk-label uk-label-warning uk-margin-auto-left"> <span style={{fontWeight: 'bold'}}>Status:</span> {info.status} </span>
                    </div>
                </div>
            </div>
        </div>
:null
    )}
      </TabPanel>
  







                







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




                  
            </div>           
            
    
            
           
        </div>

</body>
    )
  }
}
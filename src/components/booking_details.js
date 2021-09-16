import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';

import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import Loaders from './loader';
import cogoToast from 'cogo-toast';
import bg1 from "../files/images/hotel-1.jpg"
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import img from "../files/img/logo.png"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;


const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


export default class Booking_Details extends Component {
    constructor(props) {
		super(props);
		this.state = { Loading: false,exercises: [], date_diff: 0,  map: "",
    img:"",
    reservation_code:"",
guest:"",
in_check:"",
out_check:"",
name:"",
email:"",
phone_no:"",
address:"",
nationality:"",
mode:"",
    reserve_booking: null,
    hotel_info: "",
    tagsLandmarks: [],
    tagsPolicies: [], 
    tags: [], 
    datas: [],
    userlocal: "",
    customized_icons: 3,
    feedback:"",
    rated: false,
    
};
	}

  componentDidMount() {
    this.setState({userlocal: localStorage.getItem('user_id')})
const hotel = {  val: this.props.match.params.hotel, }

console.log('hotel: ', hotel)

axios.post('http://localhost:5000/room_type/', hotel)
.then(response => {
    let room = this.props.match.params.room
    let res = response.data.find(element => element.temp_id === room)
    console.log('res data: ', res)
  this.setState({ exercises:  res})

})
.catch((error) => {
  console.log(error);
})

const code = {    code: this.props.match.params.code}

axios.post('http://localhost:5000/reservation/reserve_booking_details/', code)
.then(response => {
    
    
    let in_check = moment(response.data.in_check *1000).unix()
    let out_check = moment(response.data.out_check *1000).unix()
    
    let in_check_diff =  moment(in_check* 1000).format('MMMM D, YYYY')
                let out_check_diff = moment(out_check* 1000).format('MMMM D, YYYY')
                let sub = new Date(out_check_diff)- new Date(in_check_diff);
               console.log('sub: ', sub )
  this.setState({ reserve_booking: response.data,date_diff: sub,reservation_code: response.data.reservation_code,
    guest: response.data.guest,
    in_check: response.data.in_check,
    out_check: response.data.out_check,
    name: response.data.name,
    email: response.data.email,
    phone_no: response.data.phone_no,
    address: response.data.address,
    nationality: response.data.nationality,
    mode: response.data.mode,
  datas: response.data })
  console.log('reserve_booking.data: ', response.data)
})
.catch((error) => {
  console.log(error);
})






            axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotel)
            .then(response => {
              console.log('hotel_info: ', response.data)
                  this.setState({ 
                    
                      hotel_info: response.data.hotel_info,
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
            const get_your_feedback = {    res_code: this.props.match.params.code}

            axios.post('http://localhost:5000/feedback/get_your_feedback/', get_your_feedback)
            .then(response => {
              console.log('get_your_feedback: ', response.data.feedback)
              if(response.data.feedback === undefined){
                console.log('empty');
                
              }else{
                console.log('not empty');
                this.setState({ 
                  rated: true,
                  customized_icons: response.data.rate,
                  feedback:response.data.feedback,
                })
              }
                 
            })
            .catch((error) => {
              console.log(error);
            })

  }


  printform() {
    window.print()
  }

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  onChange = event => {
    console.log('event: ', event.target.name)
if(event.target.name === "customized_icons" ){
if(this.state.rated == false){
  this.setState({ [event.target.name]: event.target.value });
}
  else{
return;
  }
}else
{
    this.setState({ [event.target.name]: event.target.value });}
};
review = () => {
  const {  name,
    feedback,
    address,
    customized_icons, } = this.state;
 const exercise = {
    name,
feedback,
address,
res_code:this.state.datas.reservation_code,
room_id:this.props.match.params.room,
rate:parseFloat(customized_icons),
    createdAt: moment().unix(),
    _partition: this.props.match.params.hotel
  }

  axios.post('http://localhost:5000/feedback/add_Feedback', exercise)
  .then(res =>{
    cogoToast.success('Please wait');
      if(res.data == 'Feedback added!'){
        window.location.reload()
      }
      else{
          cogoToast.error('Please Try Again');
      }
      
  });
}
// Makes the back button work

  render() {
    const amount =this.state.datas.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.datas.roomprice)/**/: this.state.datas.rate_mode == "Promo" && this.state.datas.duration_mode == 'Daily'?parseFloat(this.state.datas.roomprice)/**/:this.state.datas.rate_mode == "Promo" && this.state.datas.duration_mode == 'Hour'?parseFloat(this.state.datas.roomprice)/**/: parseFloat(this.state.datas.roomprice_hour);
console.log('customized_icons', this.state.customized_icons)

const cust = this.state.customized_icons;
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
                    <div class="container ie-h-align-center-fix">
                        <div class="row tm-flex-align-center">
                          
                        <div className="container" style={{ padding: '3%'}}>
    <div className="row">
        <div className="col-md-3 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
        {/*
            {this.state.tagsPolicies && this.state.tagsPolicies.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Fees & policies</p>:null }
                                  <div class="grid-room-infos-room-in">
                                          {this.state.tagsPolicies.map((info, index)=>
                                            <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                                    <i class="fa fa-circle" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                                    <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info}</span>
                                            </div>
                                            )}
                                    </div>

                                    {this.state.tags.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Anemeties</p>:null }
                        <div class="grid-room-infos-room-in">
                            {this.state.tags.map((info, index)=>
                                <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                      <i class="fa fa-check-square-o" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                      <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info.text}</span>
                                </div>
                            )}
                        </div>*/}
        </div>
        <div className="col-md-9" style={{'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
          
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Reservation Details</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                        <div class="form-group"><p>Reservation Code:</p>
                              <input type="text" class="form-control rounded-left" value={this.state.datas.reservation_code}
						disabled/>
                          </div>
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.exercises.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.datas.rate_mode === "Daily"?this.state.datas.roomprice+ '/night': this.state.datas.rate_mode === "Promo" && this.state.datas.duration_mode === 'Daily'?this.state.datas.roomprice+"("+this.state.datas.promo_duration+"nights)"/**/ :this.state.datas.rate_mode === "Promo" && this.state.datas.duration_mode === 'Hour'?this.state.datas.roomprice+"/"+this.state.datas.hour_duration+"hours":this.state.datas.roomprice_hour+ "/"+this.state.datas.hour_duration+"hours"}
						disabled/>
                          </div>
                          <div className="form-group">
                            <p>Stay:</p>
                            <input type="text" class="form-control rounded-left"  value={Math.floor(this.state.date_diff/(1000*60 * 60 * 24))+'Night(s)'}
				 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.guest}
						disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" value={moment(this.state.datas.in_check *1000).format('MMMM D, YYYY hh:mm a')}
						disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.exercises.rate_mode == "Daily"?moment(this.state.datas.out_check * 1000).format('MMMM D, YYYY  hh:mm a'): this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?moment(this.state.datas.in_check * 1000).add(this.state.exercises.promo_duration, 'days').format('MMMM D, YYYY  hh:mm a')/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?moment(this.state.datas.in_check *1000).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY'):moment(this.state.datas.in_check *1000).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY hh:mm a')}
						disabled/>
                            </div>
                            <div className="form-group">
                            <p>{this.state.datas.voucher_mode ===''?'Total':'Subtotal'}:</p>
                            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount)}
						 disabled/>


{this.state.datas.voucher_mode ===''?null:
            this.state.datas.voucher_mode === 'Percentage'?
            <div>
                      <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.state.datas.voucher_value+'% = '+ amount/this.state.datas.voucher_value}
					 />
             <p>Total:</p>
               <input type="text" class="form-control rounded-left" value={amount-(amount/this.state.datas.voucher_value)}
						/> </div>
            :
            <div>
               <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(parseFloat(this.state.datas.voucher_value))}
						 />
             <p>Total:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount-parseFloat(this.state.datas.voucher_value).toFixed(2))}
						/>
             </div>
          
          }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Full Name:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.name}
						disabled/>
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.datas.email}
						disabled/>
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.datas.phone_no}
						disabled/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <div class="form-control rounded-left"><span>{this.state.datas.address}</span></div>
                        </div>
                            <div className="form-group">
                            <p>Nationality:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.datas.nationality}
						disabled/>
                            </div>

                            <div class="form-group"><p>Mode of payment:</p>
                    <input type="text" class="form-control rounded-left" value={this.state.datas.mode} disabled/>
                   
                    </div>
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.printform()}>Print/Save</button>
                    <div class="form-group"><p>Rating:</p>
                            <Box component="fieldset" mb={3} borderColor="transparent">

        <Rating
          name="customized_icons"
          value={cust}
        
          onChange={this.onChange}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
        />
      </Box>
                   
                    </div>
                    {console.log('this.state.rated: ', this.state.rated)}
{this.state.rated === false? <div> 
                    <div class="form-group"><p>Comment(Optional):</p>
                    <TextField
          id="outlined-multiline-static"
          label="Comment(Optional)"
          multiline
          onChange={this.onChange}
          rows={4}
          name="feedback"
          placeholder="Comment Here"
          variant="outlined"
        />
                   
                    </div>
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={this.review}>Post Review</button></div>
                    
                    
                    :<div>
            <div class="form-group"><p>Comment(Optional):</p>
            <TextField
  id="outlined-multiline-static"
  multiline
  value={this.state.feedback}
  rows={4}
  name="feedback"
  placeholder="Comment Here"
  variant="outlined"
/>
           
            </div>
  </div>}

                  
         
                        </div>
                   
                    </div>
              
                </div>
                



            </div>
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
                </div>
            </div>           
            
          
            
            
        </div>

</body>
    )
  }
}
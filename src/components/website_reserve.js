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
import Carousel from 'react-bootstrap/Carousel'
import Select, { components } from 'react-select';
import firebase from './firebase'

const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;
const search = window.location.search;
const params = new URLSearchParams(search);
const check_in = params.get('check_in');
const check_out = params.get('check_out');
const guest = params.get('guest');
const room = params.get('room');
const hotel = params.get('hotel');

const INITIAL_STATE = {

    name: '',
    email: '',
    phone_no: '',
    address: '',
    nationality: '',
    mode: '',
	error: null,
    date_diff:'',
    hotel_info: "",
    check_in:check_in,
    check_out:check_out,
    guest:guest,
    room:room,
    hotel:hotel,
    map: "",
    img:"",
    tagsLandmarks: [],
    tagsPolicies: [],
    tags: [],
    userlocal: "",
    code: "empty",
    vamount: 0,
    vexp: 0,
    vmode: 'empty',
  label: 'Apply Voucher',
  hour_duration: '',
     duration_mode: '',
     rate_mode: '',
     res_count:0,
     max_res:0,
     Get_All_Tokens:[],
     admin_Token: [],
};

export default class Website_reserve extends Component {
    constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE, Loading: false,exercises: [] };
	}

  componentDidMount() {
    this.setState({userlocal: localStorage.getItem('user_id')})
    console.log('check_in: ', this.state.check_in)
    console.log('room: ', this.state.room)
const hotels = {  val: this.state.hotel, }
axios.post('http://localhost:5000/room_type/', hotels)
.then(response => {
    let room = this.state.room
    let res = response.data.find(element => element.temp_id === room)
    console.log('room_type: ', response.data)
  this.setState({ exercises:  res, hour_duration: res.hour_duration,
    duration_mode: res.duration_mode,
    rate_mode: res.rate_mode,
    max_res:res.occupied,
  })

})
.catch((error) => {
  console.log(error);
})

let in_check = moment(this.state.check_in).unix()
let out_check = moment(this.state.check_out).unix()

let in_check_diff =  moment(in_check* 1000).format('MMMM D, YYYY')
            let out_check_diff = moment(out_check* 1000).format('MMMM D, YYYY')
            let sub = new Date(out_check_diff)- new Date(in_check_diff);
            this.setState({date_diff: sub})
            const hotel_reserve = {
              in_check: in_check,
              out_check:out_check,
              room: room,
            }
            axios.post('http://localhost:5000/reservation/reserve_get_booking/', hotel_reserve)
            .then(response => {
                
              console.log('reserve_get_booking: ',response.data)
              this.setState({res_count: response.data})
            })
            .catch((error) => {
              console.log(error);
            })

            axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotels)
            .then(response => {
              console.log('hotel_info: ', response.data)
                  this.setState({ 
                    admin_Token:  response.data.notif_tokens,
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
            axios.post('http://localhost:5000/additional_info/Get_All_Tokens/', hotels)
            .then(response => {

              var tokens = response.data.map(o => o.canWritePartitions).flat();
            
                  this.setState({  Get_All_Tokens: tokens, })
            })
            .catch((error) => {
              console.log(error);
            })


            const user = {    val: localStorage.getItem('user_id') }


            console.log('user: ', user)
          axios.post('http://localhost:5000/guest_account/info_guest_account', user)
        .then(res => {
        console.log('response user: ', res.data)
        
        this.setState({     
        name: res.data.first_name+ ' '+ res.data.middle_name+ ' ' + res.data.last_name+ ' '+ res.data.suffix, 
        email: res.data.email,
        phone_no: res.data.phone_no,
        address: res.data.address,
        nationality: res.data.nationality,
      })
        })
        .catch((error) => {
        console.log(error);
        })
          
  }

  

  onSubmit = (children) => {
   
    const { name, email,phone_no,address,nationality,mode, code,vexp,hour_duration,
      duration_mode,
      rate_mode, } = this.state;
   const reservation_code = Math.floor(Math.random() * 9999)+moment().unix();
   const tokens = children;
   const room_type = this.state.exercises.room_type;
   const check_in = this.state.check_in;
   const check_out = this.state.check_out;
   const room = this.state.room;
   const guest =this.state.guest;
   const hotel =this.state.hotel;
   const vmode =this.state.vmode;
   const vamount =this.state.vamount;
   const room_name =this.state.exercises.room_type;
  
    const exercise = {
      hour_duration:this.state.exercises.rate_mode == "Daily"?hour_duration: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.promo_duration/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.promo_duration:this.state.exercises.hour_duration,
      duration_mode,
      rate_mode: this.state.exercises.rate_mode,
        name, 
        email,
        phone_no,
        address,
        nationality,
        mode, 
        reservation_code,
        room_name,
        guest_id: localStorage.getItem('user_id'),
        in_check: moment(this.state.check_in).unix(),
        out_check: this.state.exercises.rate_mode == "Daily"? moment(this.state.check_out).unix(): this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?moment(this.state.check_in).add(this.state.exercises.promo_duration, 'days').unix()/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?moment(this.state.check_in).add(this.state.exercises.promo_duration, 'hours').unix():moment(this.state.check_in).add(this.state.exercises.hour_duration, 'hours').unix(),
        room: this.state.room,
        guest: this.state.guest,
        createdAt: moment().unix(),
        _partition: this.state.hotel,
        code,
        date_value:vexp,
        price:this.state.exercises.rate_mode == "Daily"? parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour),
	
      }

const push_here = this.props.history;

     // console.log('nationality', nationality)
     if(parseFloat(this.state.guest) > parseFloat(this.state.exercises.max_person)){
      cogoToast.error('Sorry Maximum number of Guest is '+ this.state.exercises.max_person);
    } else{
 
      if (!name.trim()) {
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Please Enter Name</b>
      <div>Upadate Your Profile</div>
      </div>, { position: 'top-center'}
          );
        return;
      }
      if (!email.trim()) {
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Please Enter Email</b>
      <div>Upadate Your Profile</div>
      </div>, { position: 'top-center'}
        );
        return;
      }
   
      //Check for the Email TextInput
      if (!phone_no.trim()) {
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Please Enter Phone Number</b>
      <div>Upadate Your Profile</div>
      </div>, { position: 'top-center'}
        );
        return;
      }
      if (!address.trim()) {
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Please Enter Address</b>
      <div>Upadate Your Profile</div>
      </div>, { position: 'top-center'}
        );
        return;
      }
   
      if (!nationality.trim()) {
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Please Enter Nationality</b>
      <div>Upadate Your Profile</div>
      </div>, { position: 'top-center'}
       );
        return;
      }
      if (!mode.trim()) {
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Please Enter Mode of Payment</b>
      <div>Upadate Your Profile</div>
      </div>, { position: 'top-center'}
        );
        return;
      }
      confirmAlert({
        title: 'Confirm to submit',
        message: 'By Proceeding You Agree That You Already Read The Fees & Policy of the Stablishment.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {    cogoToast.success(
              <div style={{marginTop: '25%'}}>
          <b>Processing...</b>
          <div>Please Wait a Moment</div>
          </div>, { position: 'top-center'}
            );
            const code = this.state.code==""?'empty':this.state.code;

            var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
            var number = this.state.phone_no;
            firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
              var code = prompt('Enter the otp', '');
        
                
                if(code === null) return;
        
                
                e.confirm(code).then(function (result) {
                    console.log('redirect ',result.user);

                    axios.post('http://localhost:5000/reservation/book_reservation', exercise)
                .then(res =>{
                    console.log('datas', res.data)
                    if(res.data == 'Exercise added!'){
                
                      const notif_info={
                        tokens: tokens,
                        room: room_type,
                      }

                      axios.post('http://localhost:5000/notifications/sendToAll', notif_info)
                      .then(res =>{
                          console.log('datas', res.data)
                          if(res.data == 'sucess'){
                            console.log('DONE!')
                            push_here.push('/Print_info/'+name+'/'+email+'/'+phone_no+'/'+address+'/'+nationality+'/'+mode+'/'+reservation_code+'/'+check_in+'/'+check_out+'/'+room+'/'+guest+'/'+hotel+'/'+code+'/'+vmode+'/'+vamount)
                          }
                          else{
                              cogoToast.error('Please Try Again');
                          }
                          
                      });


                     
                    }
                    else{
                        cogoToast.error('Please Try Again');
                    }
                    
                })
                    
                }).catch(function (error) {
                  cogoToast.error(
                    <div style={{marginTop: '35%'}}>
                <b>Sorry!</b>
                <div>Invalid OTP</div>
                </div>, { position: 'top-center'}
                    );
                    
                });
        
            })
            .catch(function (error) {
                console.error( error);
        
            });


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

onSubmitNow = () => {
   
  const { name, email,phone_no,address,nationality,mode, code,vexp,hour_duration,
    duration_mode,
    rate_mode, } = this.state;
 
    confirmAlert({
      title: 'Confirm to submit',
      message: 'By Proceeding You Agree That You Already Read The Fees & Policy of the Stablishment.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {    cogoToast.success(
            <div style={{marginTop: '25%'}}>
        <b>Processing...</b>
        <div>Please Wait a Moment</div>
        </div>, { position: 'top-center'}
          );
          this.props.history.push(`http://template9.vgx12.com/home/`+name+'/'+email+'/'+phone_no+'/'+address+'/'+nationality+'/'+mode+'/'+'reservation_code'+'/'+this.state.check_in+'/'+this.state.check_out+'/'+this.state.room+'/'+this.state.guest+'/'+this.state.hotel+'/'+code+'/'+this.state.vmode+'/'+this.state.vamount)
        
        
              //this.props.history.push('/Admin')
          }
        },
        {
          label: 'No',
          onClick: () => console.log('No')
        }
      ]
    });
  
   
 
};

onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};
currencyFormat = (num) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
onSubmitVoucher = () => {
  this.setState({label: 'Please Wait'})
  const hotel = {  code: this.state.code, date_value: moment().unix(),val: this.state.hotel, }
  axios.post('http://localhost:5000/voucher/check_voucher_user/', hotel)
  .then(response =>{
    this.setState({label: 'Apply Voucher'})

    if(response.data.length > 0)
    {
          if(Math.floor(this.state.date_diff/(1000*60 * 60 * 24)) >= response.data[0].min_stay){
                
          this.setState({vmode: response.data[0].mode,vexp:response.data[0].expiration_date, vamount: response.data[0].vouchvalue})
          }
          
          else{
            cogoToast.error(
              <div style={{marginTop: '30%'}}>
          <b>Sorry</b>
          <div>Number of minimum stay does not meet</div>
          </div>, { position: 'top-center'}
            );
            return;
          }
  }
  else{
    this.setState({code: 'empty'})
    cogoToast.error(
      <div style={{marginTop: '30%'}}>
  <b>Sorry</b>
  <div>Voucher Does not Exist</div>
  </div>, { position: 'top-center'}
    );
    return;
  }
  }
  )
};
  render() {
	const { name, email,phone_no,address,nationality,mode,code } = this.state;
const amount = this.state.exercises.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour);
const amounts = this.state.exercises.rate_mode == "Daily"? parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour);
	//const paynowLink = 'http://template9.vgx12.com/home?rate_mode='+this.state.exercises.rate_mode;
const paynowLink = 'http://localhost:3000/Home?user='+localStorage.getItem('user_id')+'&&room='+this.state.exercises.temp_id+'&&code='+this.state.code+'&&vexp='+this.state.vexp+'&&vmode='+this.state.vmode+'&&vamount='+this.state.vamount+'&&in_check='+this.state.check_in+'&&out_check='+this.state.check_out+'&&guest='+this.state.guest;
const isInvalid = name === '' || phone_no === ''|| address === ''|| nationality === ''|| mode === '';
        
        const children = this.state.Get_All_Tokens.concat(this.state.admin_Token);
     console.log('this.state.vmode: ', this.state.vmode)
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
            <img src={img} alt="" />
            <h3  style={{color: 'black'}}>Hello!</h3>
            <p  style={{color: 'black'}}>{this.state.res_count >= this.state.max_res?   <a class="btn btn-primary rounded submit p-3 px-5">Sorry! No Vacancy on this Date</a>:'You are one step away on your reservation! Fill in the Necessary Information.'}</p>
            {this.state.tagsPolicies.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Fees & policies</p>:null }
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
                                      <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info}</span>
                                </div>
                            )}
                        </div>
        </div>
        <div className="col-md-9" style={{'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist" style={{'margin-top':'3%',border: 'none',
    background:' #e87b1c', 'border-radius': '1.5rem',width: '28%','float': 'right'}}>
                <li className="nav-item">
                    <a className="nav-link active" style={{width: '100px',
    color: '#e87b1c',
    border: '2px solid #e87b1c',
    'border-top-left-radius': '1.5rem',
    'border-bottom-left-radius':' 1.5rem'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Additional</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" style={{padding: '2%',paddingTop:'8%', height: '34px', 'font-weight': 600,  color: '#fff',
    'border-top-right-radius': '1.5rem',
    'border-bottom-right-radius': '1.5rem'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Information</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Reservation Information</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.exercises.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left"value={this.state.exercises.rate_mode == "Daily"?this.state.exercises.roomprice+ '/night': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.roomprice+"("+this.state.exercises.promo_duration+"nights)"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.roomprice+" for "+this.state.exercises.promo_duration+"hours":this.state.exercises.roomprice_hour+ "/"+this.state.exercises.hour_duration+"hours" }
						onChange={this.onChange} disabled/>
                          </div>
                          <div className="form-group">
                            <p>Stay:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.exercises.rate_mode == "Daily"?Math.floor(this.state.date_diff/(1000*60 * 60 * 24))+'Night(s)': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.promo_duration+"nights"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.promo_duration+"hours":this.state.exercises.hour_duration+"hours" }
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.guest}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" value={moment(this.state.check_in).format('MMMM D, YYYY hh:mm a')}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.exercises.rate_mode == "Daily"?moment(this.state.check_out).format('MMMM D, YYYY  hh:mm a'): this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?moment(this.state.check_in).add(this.state.exercises.promo_duration, 'days').format('MMMM D, YYYY hh:mm a')/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?moment(this.state.check_in).add(this.state.exercises.promo_duration, 'hours').format('MMMM D, YYYY hh:mm a'):moment(this.state.check_in).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY hh:mm a')}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>{this.state.vmode ==='empty'?'Total':'Subtotal'}:</p>
                            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount)}
					disabled/>

{this.state.vmode ==='empty'?null:
            this.state.vmode === 'Percentage'?
            <div>
                      <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.state.vamount+'% = '+ amount/this.state.vamount}
					 />
             <p>Total:</p>
               <input type="text" class="form-control rounded-left" value={amount-(amount/this.state.vamount)}
						/> </div>
            :
            <div>
               <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(this.state.vamount)}
						 />
             <p>Total:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount-parseFloat(this.state.vamount).toFixed(2))}
						/>
             </div>
          
          }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>FullName:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={name}
						onChange={this.onChange}/>
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={email}
						onChange={this.onChange}/>
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={phone_no}
						onChange={this.onChange}/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <textarea type="text" class="form-control rounded-left" placeholder="Address" name="address" value={address}
						onChange={this.onChange}/>
                        </div>
                            <div className="form-group">
                            <p>Nationality:</p>
                            <select name="nationality"  className="form-control" onChange={this.onChange}>
                        <option value="">-- Select Nationality --</option>
                        <option value="Afghan">Afghan</option>
                        <option value="Albanian">Albanian</option>
                        <option value="Algerian">Algerian</option>
                        <option value="American">American</option>
                        <option value="Andorran">Andorran</option>
                        <option value="Angolan">Angolan</option>
                        <option value="Antiguans">Antiguans</option>
                        <option value="Argentinean">Argentinean</option>
                        <option value="Armenian">Armenian</option>
                        <option value="Australian">Australian</option>
                        <option value="Austrian">Austrian</option>
                        <option value="Azerbaijani">Azerbaijani</option>
                        <option value="Bahamian">Bahamian</option>
                        <option value="Bahraini">Bahraini</option>
                        <option value="Bangladeshi">Bangladeshi</option>
                        <option value="Barbadian">Barbadian</option>
                        <option value="Barbudans">Barbudans</option>
                        <option value="Batswana">Batswana</option>
                        <option value="Belarusian">Belarusian</option>
                        <option value="Belgian">Belgian</option>
                        <option value="Belizean">Belizean</option>
                        <option value="Beninese">Beninese</option>
                        <option value="Bhutanese">Bhutanese</option>
                        <option value="Bolivian">Bolivian</option>
                        <option value="Bosnian">Bosnian</option>
                        <option value="Brazilian">Brazilian</option>
                        <option value="British">British</option>
                        <option value="Bruneian">Bruneian</option>
                        <option value="Bulgarian">Bulgarian</option>
                        <option value="burkinabe">Burkinabe</option>
                        <option value="burmese">Burmese</option>
                        <option value="burundian">Burundian</option>
                        <option value="cambodian">Cambodian</option>
                        <option value="cameroonian">Cameroonian</option>
                        <option value="canadian">Canadian</option>
                        <option value="cape verdean">Cape Verdean</option>
                        <option value="central african">Central African</option>
                        <option value="chadian">Chadian</option>
                        <option value="chilean">Chilean</option>
                        <option value="chinese">Chinese</option>
                        <option value="colombian">Colombian</option>
                        <option value="comoran">Comoran</option>
                        <option value="congolese">Congolese</option>
                        <option value="costa rican">Costa Rican</option>
                        <option value="croatian">Croatian</option>
                        <option value="cuban">Cuban</option>
                        <option value="cypriot">Cypriot</option>
                        <option value="czech">Czech</option>
                        <option value="danish">Danish</option>
                        <option value="djibouti">Djibouti</option>
                        <option value="dominican">Dominican</option>
                        <option value="dutch">Dutch</option>
                        <option value="east timorese">East Timorese</option>
                        <option value="ecuadorean">Ecuadorean</option>
                        <option value="egyptian">Egyptian</option>
                        <option value="emirian">Emirian</option>
                        <option value="equatorial guinean">Equatorial Guinean</option>
                        <option value="eritrean">Eritrean</option>
                        <option value="estonian">Estonian</option>
                        <option value="ethiopian">Ethiopian</option>
                        <option value="fijian">Fijian</option>
                        <option value="filipino">Filipino</option>
                        <option value="finnish">Finnish</option>
                        <option value="french">French</option>
                        <option value="gabonese">Gabonese</option>
                        <option value="gambian">Gambian</option>
                        <option value="georgian">Georgian</option>
                        <option value="german">German</option>
                        <option value="ghanaian">Ghanaian</option>
                        <option value="greek">Greek</option>
                        <option value="grenadian">Grenadian</option>
                        <option value="guatemalan">Guatemalan</option>
                        <option value="guinea-bissauan">Guinea-Bissauan</option>
                        <option value="guinean">Guinean</option>
                        <option value="guyanese">Guyanese</option>
                        <option value="haitian">Haitian</option>
                        <option value="herzegovinian">Herzegovinian</option>
                        <option value="honduran">Honduran</option>
                        <option value="hungarian">Hungarian</option>
                        <option value="icelander">Icelander</option>
                        <option value="indian">Indian</option>
                        <option value="indonesian">Indonesian</option>
                        <option value="iranian">Iranian</option>
                        <option value="iraqi">Iraqi</option>
                        <option value="irish">Irish</option>
                        <option value="israeli">Israeli</option>
                        <option value="italian">Italian</option>
                        <option value="ivorian">Ivorian</option>
                        <option value="jamaican">Jamaican</option>
                        <option value="japanese">Japanese</option>
                        <option value="jordanian">Jordanian</option>
                        <option value="kazakhstani">Kazakhstani</option>
                        <option value="kenyan">Kenyan</option>
                        <option value="kittian and nevisian">Kittian and Nevisian</option>
                        <option value="kuwaiti">Kuwaiti</option>
                        <option value="kyrgyz">Kyrgyz</option>
                        <option value="laotian">Laotian</option>
                        <option value="latvian">Latvian</option>
                        <option value="lebanese">Lebanese</option>
                        <option value="liberian">Liberian</option>
                        <option value="libyan">Libyan</option>
                        <option value="liechtensteiner">Liechtensteiner</option>
                        <option value="lithuanian">Lithuanian</option>
                        <option value="luxembourger">Luxembourger</option>
                        <option value="macedonian">Macedonian</option>
                        <option value="malagasy">Malagasy</option>
                        <option value="malawian">Malawian</option>
                        <option value="malaysian">Malaysian</option>
                        <option value="maldivan">Maldivan</option>
                        <option value="malian">Malian</option>
                        <option value="maltese">Maltese</option>
                        <option value="marshallese">Marshallese</option>
                        <option value="mauritanian">Mauritanian</option>
                        <option value="mauritian">Mauritian</option>
                        <option value="mexican">Mexican</option>
                        <option value="micronesian">Micronesian</option>
                        <option value="moldovan">Moldovan</option>
                        <option value="monacan">Monacan</option>
                        <option value="mongolian">Mongolian</option>
                        <option value="moroccan">Moroccan</option>
                        <option value="mosotho">Mosotho</option>
                        <option value="motswana">Motswana</option>
                        <option value="mozambican">Mozambican</option>
                        <option value="namibian">Namibian</option>
                        <option value="nauruan">Nauruan</option>
                        <option value="nepalese">Nepalese</option>
                        <option value="new zealander">New Zealander</option>
                        <option value="ni-vanuatu">Ni-Vanuatu</option>
                        <option value="nicaraguan">Nicaraguan</option>
                        <option value="nigerien">Nigerien</option>
                        <option value="north korean">North Korean</option>
                        <option value="northern irish">Northern Irish</option>
                        <option value="norwegian">Norwegian</option>
                        <option value="omani">Omani</option>
                        <option value="pakistani">Pakistani</option>
                        <option value="palauan">Palauan</option>
                        <option value="panamanian">Panamanian</option>
                        <option value="papua new guinean">Papua New Guinean</option>
                        <option value="paraguayan">Paraguayan</option>
                        <option value="peruvian">Peruvian</option>
                        <option value="polish">Polish</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="qatari">Qatari</option>
                        <option value="romanian">Romanian</option>
                        <option value="russian">Russian</option>
                        <option value="rwandan">Rwandan</option>
                        <option value="saint lucian">Saint Lucian</option>
                        <option value="salvadoran">Salvadoran</option>
                        <option value="samoan">Samoan</option>
                        <option value="san marinese">San Marinese</option>
                        <option value="sao tomean">Sao Tomean</option>
                        <option value="saudi">Saudi</option>
                        <option value="scottish">Scottish</option>
                        <option value="senegalese">Senegalese</option>
                        <option value="serbian">Serbian</option>
                        <option value="seychellois">Seychellois</option>
                        <option value="sierra leonean">Sierra Leonean</option>
                        <option value="singaporean">Singaporean</option>
                        <option value="slovakian">Slovakian</option>
                        <option value="slovenian">Slovenian</option>
                        <option value="solomon islander">Solomon Islander</option>
                        <option value="somali">Somali</option>
                        <option value="south african">South African</option>
                        <option value="south korean">South Korean</option>
                        <option value="spanish">Spanish</option>
                        <option value="sri lankan">Sri Lankan</option>
                        <option value="sudanese">Sudanese</option>
                        <option value="surinamer">Surinamer</option>
                        <option value="swazi">Swazi</option>
                        <option value="swedish">Swedish</option>
                        <option value="swiss">Swiss</option>
                        <option value="syrian">Syrian</option>
                        <option value="taiwanese">Taiwanese</option>
                        <option value="tajik">Tajik</option>
                        <option value="tanzanian">Tanzanian</option>
                        <option value="thai">Thai</option>
                        <option value="togolese">Togolese</option>
                        <option value="tongan">Tongan</option>
                        <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                        <option value="tunisian">Tunisian</option>
                        <option value="turkish">Turkish</option>
                        <option value="tuvaluan">Tuvaluan</option>
                        <option value="ugandan">Ugandan</option>
                        <option value="ukrainian">Ukrainian</option>
                        <option value="uruguayan">Uruguayan</option>
                        <option value="uzbekistani">Uzbekistani</option>
                        <option value="venezuelan">Venezuelan</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="welsh">Welsh</option>
                        <option value="yemenite">Yemenite</option>
                        <option value="zambian">Zambian</option>
                        <option value="zimbabwean">Zimbabwean</option>
                        </select>
                        </div>
                            <div className="form-group">
                            <p>Preferred Mode of Payment:</p>
                            <select name="mode" className="form-control" onChange={this.onChange}>
                    <option value="">-- Select Mode of Payment --</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="e-Wallet">e-Wallet</option>
			                      </select>
                            </div>
                         {this.state.res_count >= this.state.max_res?   <a class="btn btn-primary rounded submit p-3 px-5">Sorry! No Vacancy on this Date</a>:
                         <div>

                        <a class="btn btn-primary rounded submit p-3 px-5" href={paynowLink}> Pay Now Reservation</a>
                        <div id="recaptcha"></div>
                            <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.onSubmit(children)}>Pay Later Reservation</button>
                         </div>
                         
                         }
                            
                            
                        </div>
                     {this.state.exercises.rate_mode == "Promo"? null:   <div className="form-group">
                            <p>Voucher Code:</p>
                    
                            <input type="text" class="form-control rounded-left" placeholder="Voucher Code" name="code" value={code=='empty'?null:code}
						onChange={this.onChange} /> 

    
            <br />
              <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.onSubmitVoucher}>{this.state.label}</button>
                            </div>}
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
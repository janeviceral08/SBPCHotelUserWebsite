import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import Loaders from './loader';
import cogoToast from 'cogo-toast';
import img from "../files/img/logo2.png"
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;

const INITIAL_STATE = {

    name: '',
    email: '',
    phone_no: '',
    address: '',
    nationality: '',
    mode: '',
	error: null,
    date_diff:'',
    guest: '',
    check_in: '',
    check_out: '',
    user_email: '',
    reservation_code: '',
    room_type: '',
rate_mode: '',
roomprice: '',
duration_mode: '',
promo_duration: '',
hour_duration: '',
roomprice_hour: '',
status: '',
reason: '',
    
};

export default class Check_reservation extends Component {
    constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE, Loading: false,exercises: [] };
	}

  componentDidMount() {

const hotel = {  val: "project=60641fde66ceb2089b1bc468", }
axios.post('http://gloreto.herokuapp.com/room_type/', hotel)
.then(response => {
    let room = 'b894d0-129205'
    let res = response.data.find(element => element.temp_id === room)
  this.setState({ exercises:  res})
  console.log('response.data',res)
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


  }

  

  onSubmit = () => {
   
    const { user_email, reservation_code} = this.state;
  


 
      if (!reservation_code.trim()) {
        cogoToast.error('Please Enter Reservation Code');
        return;
      }
      if (!user_email.trim()) {
        cogoToast.error('Please Enter Email');
        return;
      }


      cogoToast.success('Gathering Data. Please Wait a Moment...')
   
      const hotel = {  email: user_email, 
                        reservation_code: reservation_code,  }
axios.post('http://gloreto.herokuapp.com/reservation/reserve_info', hotel)
.then(response => {
    console.log('response.data: ', response.data)
this.setState({
  name: response.data.name,
  email: response.data.email,
  phone_no: response.data.phone_no,
  address: response.data.address,
  nationality: response.data.nationality,
  mode: response.data.mode,
  guest: response.data.guest,
  check_in: response.data.in_check,
  check_out: response.data.out_check,
  user_email: response.data.email,
  reservation_code: response.data.reservation_code,
  status: response.data.status,
  reason: response.data.reason,
})

let in_check_diff =  moment(response.data.in_check  * 1000 ).format('MMMM D, YYYY')
            let out_check_diff = moment(response.data.out_check  * 1000 ).format('MMMM D, YYYY')
            let sub = new Date(out_check_diff)- new Date(in_check_diff);
            this.setState({date_diff: sub})
console.log('sub: ', sub)

  
const hotel = {  val: response.data.room, }
axios.post('http://gloreto.herokuapp.com/room_type/searchroom', hotel)
.then(response => {
 
  this.setState({
    room_type: response.data.room_type,
rate_mode: response.data.rate_mode,
roomprice: response.data.roomprice,
duration_mode: response.data.duration_mode,
promo_duration: response.data.promo_duration,
hour_duration: response.data.hour_duration,
roomprice_hour: response.data.roomprice_hour,
})
  console.log('response.data searchroom',response.data)
})
.catch((error) => {
  console.log(error);
})

})
.catch((error) => {
  console.log(error);
})

    
     
   
};

onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};

  render() {
	const { name, email,phone_no,address,nationality,mode,error, user_email, reservation_code } = this.state;

		const isInvalid = name === '' || phone_no === ''|| address === ''|| nationality === ''|| mode === '';
        //console.log('res',this.state.roomprice)
        console.log('date_diff: ', this.state.mode)
    return (
        <body style={{ background: `-webkit-linear-gradient(left, #f53803, #f5d020)`}}>
  <div className="container" style={{ padding: '3%'}}>
    <div className="row">
        <div className="col-md-3 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
            <img src={img} alt="" />
            <h3  style={{color: '#fff'}}>{this.state.status === ''? 'Hello!' :this.state.status }</h3>
            <p  style={{color: '#fff'}}>{this.state.status === ''? 'You are one step on your reservation information! Fill in the Necessary Information.' :this.state.status === 'Cancelled'?'Sorry Your Reservation got Cancelled because '+this.state.reason:this.state.status === 'For Reservation'?'The Status of your Reservation is yet to be Confirmed':'Yehey! Your Reservation is Confirmed!' }</p>
            <div className="form-group">
                            <p  style={{color: '#fff'}}>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" value={user_email} name="user_email"	onChange={this.onChange}
						/>  </div>
                            <div className="form-group">
                            <p  style={{color: '#fff'}}>Reservation Code:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Reservation Code" name="reservation_code" value={reservation_code}
						onChange={this.onChange} />
                          </div>
                          <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.onSubmit}>Check Reservation</button>
        </div>
        <div className="col-md-9" style={{ background: `#f8f9fa`, 'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist" style={{'margin-top':'3%',border: 'none',
    background:' #e87b1c', 'border-radius': '1.5rem',width: '28%','float': 'right'}}>
                <li>
                    <a className="nav-link active" style={{width: '100px',
    color: '#e87b1c',
    border: '2px solid #e87b1c',
    'border-top-left-radius': '1.5rem',
    'border-bottom-left-radius':' 1.5rem'}} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">All</a>
                </li>
                <li>
                    <a className="nav-link" style={{padding: '2%',paddingTop:'8%', height: '34px', 'font-weight': 600,  color: '#fff',
    'border-top-right-radius': '1.5rem',
    'border-bottom-right-radius': '1.5rem'}}>Information</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Reservation Information</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Room Type" value={this.state.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Room Price" value={this.state.rate_mode == "Daily"?this.state.roomprice+ '/night': this.state.rate_mode == "Promo" && this.state.duration_mode == 'Daily'?this.state.roomprice+"("+this.state.promo_duration+"nights)"/**/ :this.state.rate_mode == "Promo" && this.state.duration_mode == 'Hour'?this.state.roomprice+"/"+this.state.hour_duration+"hours":this.state.roomprice_hour+ "/"+this.state.hour_duration+"hours" }
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Guest" value={this.state.guest}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Check In" value={ moment(this.state.check_in  * 1000).format('MMMM D, YYYY')}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Check Out" value={moment(this.state.check_out  * 1000).format('MMMM D, YYYY')}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Amount to Pay:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Amount to Pay" value={this.state.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.roomprice)/**/: this.state.rate_mode == "Promo" && this.state.duration_mode == 'Daily'?parseFloat(this.state.roomprice)/**/:this.state.rate_mode == "Promo" && this.state.duration_mode == 'Hour'?parseFloat(this.state.roomprice)/**/: parseFloat(this.state.roomprice_hour)}
						onChange={this.onChange} disabled/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>FullName:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={name}
						onChange={this.onChange} disabled/>
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={email}
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={phone_no}
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Address" name="address" value={address}
						onChange={this.onChange} disabled/>
                        </div>
                            <div className="form-group">
                            <p>Nationality:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Nationality" name="nationality" value={nationality}
						onChange={this.onChange} disabled/>
                            </div>

                            <div className="form-group">
                            <p>Mode of Payment:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Mode of Payment" name="payment" value={mode}
						onChange={this.onChange} disabled/>
                            </div>
                           
                            
                        </div>
                    </div>
                    <Loaders loading={this.state.Loading} />
                </div>
                



            </div>
        </div>
    </div>

</div>
        
        </body>
    )
  }
}
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

const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;



export default class Print_info extends Component {
    constructor(props) {
		super(props);
		this.state = { Loading: false,exercises: [], date_diff: '',  map: "",
    img:"",
    tagsLandmarks: [],
    tagsPolicies: [],
    tags: [], };
	}

  componentDidMount() {
    this.setState({userlocal: localStorage.getItem('user_id')})
const hotel = {  val: this.props.match.params.hotel, }
axios.post('http://localhost:5000/room_type/', hotel)
.then(response => {
    let room = this.props.match.params.room
    let res = response.data.find(element => element.temp_id === room)
  this.setState({ exercises:  res})

})
.catch((error) => {
  console.log(error);
})



let in_check = moment(this.props.match.params.in_check).unix()
let out_check = moment(this.props.match.params.out_check).unix()

let in_check_diff =  moment(in_check* 1000).format('MMMM D, YYYY')
            let out_check_diff = moment(out_check* 1000).format('MMMM D, YYYY')
            let sub = new Date(out_check_diff)- new Date(in_check_diff);
            this.setState({date_diff: sub})


            axios.post('http://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
            .then(response => {
              console.log('hotel_info: ', response.data)
                  this.setState({ 
                    
                      hotel_info: response.data.hotel_info,
                  map: response.data.map_address,
                  img: response.data.hotel_image,
                  tagsLandmarks:response.data.tagsLandmarks === undefined?[]:response.data.tagsLandmarks,
                  tagsPolicies:response.data.tagsPolicies === undefined?[]: response.data.tagsPolicies,
                  tags:response.data.tags === undefined?[]: response.data.tags,
                    })
            })
            .catch((error) => {
              console.log(error);
            })

  }

  back (){
    this.props.history.push("/Home")
  }

  printform() {
    window.print()
  }

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
// Makes the back button work

  render() {
const amount = this.state.exercises.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour)
    return (
    
<body>
<div class="tm-main-content" id="top">
       
            
            
           

            <div>
                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">                                                        
                    <div class="container ie-h-align-center-fix">
                        <div class="row tm-flex-align-center">
                          
                        <div className="container" style={{ padding: '3%'}}>
    <div className="row">
        <div className="col-md-3 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
        
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
          
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Reservation Information</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                        <div class="form-group"><p>Reservation Code:</p>
                              <input type="text" class="form-control rounded-left" placeholder="Room Type" value={this.props.match.params.reservation_code}
						disabled/>
                          </div>
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" value={this.state.exercises.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" value={this.state.exercises.rate_mode == "Daily"?this.state.exercises.roomprice+ '/night': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.roomprice+"("+this.state.exercises.promo_duration+"nights)"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.roomprice+"/"+this.state.exercises.hour_duration+"hours":this.state.exercises.roomprice_hour+ "/"+this.state.exercises.hour_duration+"hours" }
						onChange={this.onChange} disabled/>
                          </div>
                          <div className="form-group">
                            <p>Stay:</p>
                            <input type="text" class="form-control rounded-left"  value={Math.floor(this.state.date_diff/(1000*60 * 60 * 24))+'Night(s)'}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left" value={this.props.match.params.guest}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" value={moment(this.props.match.params.in_check).format('MMMM D, YYYY hh:mm a')}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.exercises.rate_mode == "Daily"?moment(this.props.match.params.out_check).format('MMMM D, YYYY'): this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?moment(this.props.match.params.in_check).add(this.state.exercises.promo_duration, 'days').format('MMMM D, YYYY')/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?moment(this.props.match.params.in_check).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY'):moment(this.props.match.params.in_check).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY hh:mm a')}
						onChange={this.onChange} disabled/>
                            </div>
                            {this.props.match.params.vmode ==='empty'?null:
                            <div className="form-group">
                            <p>Voucher:</p>
                            <input type="text" class="form-control rounded-left"  value={this.props.match.params.code}
						onChange={this.onChange} disabled/>
                            </div>}
                            
                            <div className="form-group">
                            <p>{this.props.match.params.vmode ==='empty'?'Total':'Subtotal'}:</p>
                            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount)}
						onChange={this.onChange} disabled/>

{this.props.match.params.vmode ==='empty'?null:
            this.props.match.params.vmode === 'Percentage'?
            <div>
                      <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.props.match.params.vamount+'% = '+ amount/this.props.match.params.vamount}
					 />
             <p>Total:</p>
               <input type="text" class="form-control rounded-left" value={amount-(amount/this.props.match.params.vamount)}
						/> </div>
            :
            <div>
               <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(parseFloat(this.props.match.params.vamount))}
						 />
             <p>Total:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount-parseFloat(this.props.match.params.vamount).toFixed(2))}
						/>
             </div>
          
          }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Full Name:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={this.props.match.params.name}
						onChange={this.onChange} disabled/>
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={this.props.match.params.email}
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={this.props.match.params.phone_no}
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <div class="form-control rounded-left"><span>{this.props.match.params.address}</span></div>
                        </div>
                            <div className="form-group">
                            <p>Nationality:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Nationality" name="nationality" value={this.props.match.params.nationality}
						onChange={this.onChange} disabled/>
                            </div>

                            <div class="form-group"><p>Mode of payment:</p>
                    <input type="text" class="form-control rounded-left" placeholder="Address" name="address" value={this.props.match.params.mode} disabled/>
                   
                    </div>
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.printform()} style={{marginRight: '10px'}}>Print/Save</button>
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.back()}>Go to Home Page</button>
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
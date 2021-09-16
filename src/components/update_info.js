import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
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
    last_name: '',
        first_name: '',
        middle_name: '',
        suffix: '',
        valid_id: '',
        email: '',
        password: '',
        phone_no: '',
        address: '',
        nationality: '',
        cpassword: '',
        userlocal: "",
        
  
};

export default class Update_Info extends Component {
    constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

  componentDidMount() {
    this.setState({userlocal: localStorage.getItem('user_id')})
    const hotel = {    val: localStorage.getItem('user_id') }

   
    console.log('hotel: ', hotel)
	axios.post('http://localhost:5000/guest_account/info_guest_account', hotel)
.then(res => {
console.log('response: ', res.data)
this.setState({     last_name: res.data.last_name,
first_name: res.data.first_name,
middle_name: res.data.middle_name,
suffix: res.data.suffix,
valid_id: res.data.valid_id,
email: res.data.email,
phone_no: res.data.phone_no,
address: res.data.address,
nationality: res.data.nationality,})
})
.catch((error) => {
console.log(error);
})
  }

 

  onSubmit = () => {
   console.log('pressed')
    const {  last_name,
        first_name,
        middle_name,
        suffix,
        password,
        phone_no,
        address,
        nationality} = this.state;
   const reservation_code = Math.floor(Math.random() * 9999)+moment().unix();
    const exercise = {
        last_name,
        first_name,
        middle_name,
        suffix,
        password,
        phone_no,
        address,
        nationality,
        temp_id: localStorage.getItem('user_id')
      }
      if (!first_name.trim()) {
        cogoToast.error(
            
            <div style={{marginTop: '25%'}}>
    <b>Please Enter First Name</b>
    <div>Complete All the Information</div>
  </div>, { position: 'top-center'}
            );
        return;
      }
      if (!middle_name.trim()) {
        cogoToast.error(
            <div style={{marginTop: '25%'}}>
    <b>Please Enter Middle Name</b>
    <div>Complete All the Information</div>
  </div>, { position: 'top-center'}
            );
        return;
      }
      if (!last_name.trim()) {
        cogoToast.error(
            <div style={{marginTop: '25%'}}>
    <b>Please Enter Last Name</b>
    <div>Complete All the Information</div>
  </div>, { position: 'top-center'}
            );
        return;
      }
      //Check for the Email TextInput
      if (!phone_no.trim()) {
        cogoToast.error(
            <div style={{marginTop: '25%'}}>
    <b>Please Enter Phone Number</b>
    <div>Complete All the Information</div>
  </div>, { position: 'top-center'}
            );
        return;
      }
      if (!address.trim()) {
        cogoToast.error(
            <div style={{marginTop: '25%'}}>
    <b>Please Enter Address</b>
    <div>Complete All the Information</div>
  </div>, { position: 'top-center'}
            );
        return;
      }
   
      if (!nationality.trim()) {
        cogoToast.error(
            <div style={{marginTop: '25%'}}>
    <b>Please Enter Natinality</b>
    <div>Complete All the Information</div>
  </div>, { position: 'top-center'}
            );
        return;
      }
     
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => { 
                cogoToast.loading(
                    <div style={{marginTop: '25%'}}>
            <b>Loading..</b>
            <div>Plase Wait a Moment</div>
          </div>, { position: 'top-center'}
                    ).then(() => {
                      
                axios.post('http://localhost:5000/guest_account/update_guest_account', exercise)
                .then(res =>{
                    console.log('datas', res.data)
                    if(res.data === 'Exercise updated!'){
                        window.location.reload();  }
                    else{
                        cogoToast.error(<div style={{marginTop: '25%'}}>
                        <b>Sorry..</b>
                        <div>Plase Wait Try Again</div>
                      </div>);
                    }
                    
                });
          
             
            });
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
onSubmitPassword = () => {
    console.log('pressed')

    var regex = /^[0-9a-zA-Z\_]+$/
     const {  cpassword,password } = this.state;
     const exercise = {
        cpassword,
         temp_id: localStorage.getItem('user_id')
       }
       if(regex.test(password) === false){
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Sorry. Change Your Password</b>
      <div>Please Avoid Using Special Characters</div>
      </div>, { position: 'top-center'}
          )
          return;
      }
      if(!password.length > 7){
        cogoToast.error(
          <div style={{marginTop: '25%'}}>
      <b>Sorry, Please Check Password</b>
      <div>Minimum of 8 Characters</div>
      </div>, { position: 'top-center'}
          )
          return;
      }
      
        if(!cpassword.trim() || cpassword !== password){
          cogoToast.error(
            <div style={{marginTop: '25%'}}>
      <b>Please Match the Password</b>
      <div>Password and Confirm</div>
      </div>, { position: 'top-center'}
            )
            return;
        }
       confirmAlert({
         title: 'Confirm to submit',
         message: 'Are you sure to do this.',
         buttons: [
           {
             label: 'Yes',
             onClick: () => { 
                 cogoToast.loading(
                     <div style={{marginTop: '25%'}}>
             <b>Loading..</b>
             <div>Plase Wait a Moment</div>
           </div>, { position: 'top-center'}
                     ).then(() => {
                       
                 axios.post('http://localhost:5000/guest_account/update_password_guest_account', exercise)
                 .then(res =>{
                     console.log('datas', res.data)
                     if(res.data === 'Exercise updated!'){
                         window.location.reload();  }
                     else{
                         cogoToast.error(<div style={{marginTop: '25%'}}>
                         <b>Sorry..</b>
                         <div>Plase Wait Try Again</div>
                       </div>);
                     }
                     
                 });
           
              
             });
             }
             
           },
           {
             label: 'No',
             onClick: () => console.log('No')
           }
         ]
       });
     
      
    
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
  this.props.history.push('/Home')
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
                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">                                                        
                    <div class="container ie-h-align-center-fix">
                        <div class="row tm-flex-align-center">
                          
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist" style={{border: 'none',
    background:' #e87b1c', 'border-radius': '1.5rem',width: '28%','float': 'right'}}>
                <li className="nav-item">
                    <a className="nav-link active" style={{width: '100px',
    color: '#e87b1c',
    border: '2px solid #e87b1c',
    'border-top-left-radius': '1.5rem',
    'border-bottom-left-radius':' 1.5rem'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">User</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" style={{padding: '2%',paddingTop:'8%', height: '34px', 'font-weight': 600,  color: '#fff',
    'border-top-right-radius': '1.5rem',
    'border-bottom-right-radius': '1.5rem'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Information</a>
                </li>
            </ul>




                        <div className="container" style={{ padding: '2%'}}>
    <div className="row">
        <div className="col-md-2 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
            <img src={img} alt="" />
            <h3  style={{color: 'black'}}>Hello!</h3>
            <p  style={{color: 'black'}}>Thank you for using Gloreto. Enjoy our Deals!</p>
  
        </div>
        <div className="col-md-10" style={{'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
          
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                   
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>First Name:</p>
                            <input type="text" class="form-control rounded-left" placeholder="First Name" name="first_name" value={this.state.first_name}
						    onChange={this.onChange} required/>
                            </div>
                            <div className="form-group">
                            <p>Middle Name:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Middle Name" name="middle_name" value={this.state.middle_name}
						    onChange={this.onChange} required/>
                            </div>
                            <div className="form-group">
                            <p>Last Name:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Last Name" name="last_name" value={this.state.last_name}
						    onChange={this.onChange} required/>
                            </div>
                            <div className="form-group">
                            <p>Suffix:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Suffix" name="suffix" value={this.state.suffix}
						    onChange={this.onChange}/>
                          </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={this.state.email}
						   disabled/>
                          </div>
                        
                        </div>



                        <div className="col-md-6">
                        <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={this.state.phone_no}
						    onChange={this.onChange} required/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Address" name="address" value={this.state.address}
						    onChange={this.onChange} required/>
                            </div>
                         
                            <div className="form-group">
                            <p>Nationality:{this.state.nationality}</p>
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
                            <p>Password:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Password" name="password" value={this.state.password}
						onChange={this.onChange}/>
                          </div>
                          <div className="form-group">
                            <p>Confirm Password:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Confirm Password" name="cpassword" value={this.state.cpassword}
						onChange={this.onChange}/>
                          </div>
                          <div style={{display:'grid',	'grid-template-columns': 'auto auto'}}>
                          <div style={{'text-align': 'left'}} > 
                            <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.onSubmit}>Save</button>  </div>
                            <div  style={{'text-align': 'right'}}> <button type="submit" class="btn btn-primary rounded submit p-3 px-3" onClick={this.onSubmitPassword}>Change Password</button>
                            </div>
                            </div>
                        </div>





                    </div>
                </div>
                



            </div>
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
     









            
            <footer class="tm-bg-dark-blue">
                <div class="container">
                    <div class="row">
                        <p class="col-sm-12 text-center tm-font-light tm-color-white p-4 tm-margin-b-0">
                        Copyright &copy; <span class="tm-current-year">2021</span> Your Company
                        
                        - Design: Tooplate</p>        
                    </div>
                </div>                
            </footer>
        </div>

</body>
    )
  }
}
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

  
const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
const INITIAL_STATE = {
    room_info: {},
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
    tagsLandmarks: [],
    tagsPolicies: [],
    tags: [],
    offset: 0,
    tableData: [],
    orgtableData: [],
    perPage: 5,
    currentPage: 0,
    setAge: '',
    sorting:false,
    setOpen:false,
    setOpenVideo:false,
  
    loading: null,
    room_id:'',
    idinfo:'',
    car: [],
    car_default: [
        {original: 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg',
        thumbnail: 'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'}
    ],
    userlocal: "",
    vou: [],
};

export default class Room_Info extends Component {
    constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

  componentDidMount() {
    this.setState({userlocal: localStorage.getItem('user_id')})
    const hotel = {    val: this.props.match.params.hotel }
	axios.post('http://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
	.then(response => {
    console.log('response.data.tags: ', response.data.tags)
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
        tagsLandmarks:response.data.tagsLandmarks === undefined?[]:response.data.tagsLandmarks,
        tagsPolicies: response.data.tagsPolicies === undefined?[]:response.data.tagsPolicies,
        tags: response.data.tags === undefined?[]:response.data.tags,
          })
	})
	.catch((error) => {
	  console.log(error);
	})
	axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
        let room = this.props.match.params.room;
        console.log('room: ', response.data);
        let res = response.data.find(element => element.temp_id === room);
        console.log('res: ', res);

        let car = res.img.map(({original, thumbnail}) => ({original, thumbnail }))
       
	  this.setState({ exercises: response.data ,  room_info:  response.data.find(element => element.temp_id === room), car: car})
	})
	.catch((error) => {
	  console.log(error);
	})
  console.log('roomInfo: ', this.state.room_info)
  const hotel_voucher = {    val: this.props.match.params.hotel, date_value: moment().unix() }

	axios.post('http://localhost:5000/voucher/hotel_voucher/', hotel_voucher)
	.then(response =>this.setState({ vou: response.data }))
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

  render() {
	const { name, email,phone_no,address,nationality,mode,vou } = this.state;

		const isInvalid = name === '' || phone_no === ''|| address === ''|| nationality === ''|| mode === '';
        

        console.log('roomInfo: ', this.state.room_info)
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
            <div class="tm-bg-primary tm-sidebar-pad">
                                    <div class="form-row">
                                       
                                       <div class="form-group tm-form-element tm-form-element-50" style={{backgroundColor: 'white'}}>
                                           <i class="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                           <input type="text" class="form-control" value={this.props.match.params.check_in} disabled style={{marginLeft: '50px'}} name="check_in" onChange={this.select}/>
                                       </div>
                                       <div class="form-group tm-form-element tm-form-element-50" style={{backgroundColor: 'white'}}>
                                           <i class="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                           <input type="text" class="form-control" value={this.props.match.params.check_out} disabled name="check_out" style={{marginLeft: '50px'}} onChange={this.select}/>
                                       </div>
                                       <div class="form-group tm-form-element tm-form-element-50">
                                           <i class="fa fa-map-marker fa-2x tm-form-element-icon"></i>
                                           <input type="text" class="form-control" value={this.props.match.params.address} disabled name="check_out" style={{marginLeft: '50px'}} onChange={this.select}/>
                                       </div>
                                       <div class="form-group tm-form-element tm-form-element-50">
                                           <i class="fa fa-user-o fa-2x tm-form-element-icon"></i>
                                           <input type="text" class="form-control" value={this.props.match.params.guest+' Person'} disabled name="check_out" style={{marginLeft: '50px'}} onChange={this.select}/>
                                       </div>
                                   </div>
                                                                          </div>
           
            
            
           

            <div>











                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">     

                  <div class="container ie-h-align-center-fix">


                    <div class="grid-container-room-info">
                      <div class="grid-item-room-info"> 
                            <div className="register_user-left">
                                <h3  style={{color: 'black'}}>{this.state.room_info.name}</h3>
                                <p  style={{color: 'black',  fontSize: '20px'}}>Good For {this.state.room_info.max_person}</p>
                              </div>
                      </div>
                      <div class="grid-item-room-info-right">  
                            <span style={{'float': 'right',fontWeight: 'bolder', fontSize: '25px'}}>₱{this.state.room_info.rate_mode == "Daily"? currencyFormat(parseFloat(this.state.room_info.roomprice)): this.state.room_info.rate_mode == "Promo" && this.state.room_info.duration_mode == 'Daily'?currencyFormat(parseFloat(this.state.room_info.roomprice)):this.state.room_info.rate_mode == "Promo" && this.state.room_info.duration_mode == 'Hour'?currencyFormat(parseFloat(this.state.room_info.roomprice)):currencyFormat(parseFloat(this.state.room_info.roomprice_hour))}<small>{this.state.room_info.rate_mode == "Daily"? '/night': this.state.room_info.rate_mode == "Promo" && this.state.room_info.duration_mode == 'Daily'?"("+this.state.room_info.promo_duration+"nights)":this.state.room_info.rate_mode == "Promo" && this.state.room_info.duration_mode == 'Hour'?"/"+this.state.room_info.hour_duration+"hours": "/"+this.state.room_info.hour_duration+"hours"}</small></span><br />
                            <ul className="nav nav-tabs nav-justified" id="myTab" onClick={this.book_now} role="tablist" style={{'margin-top':'3%',border: 'none', background:' #e87b1c', 'border-radius': '1.5rem',width: '40%','float': 'right'}}>
                              <li className="nav-item">
                                  <a className="nav-link active" style={{width: '100px',color: '#e87b1c',  border: '2px solid #e87b1c','border-top-left-radius': '1.5rem',
                                  'border-bottom-left-radius':' 1.5rem'}} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">Book</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" style={{padding: '2%',paddingTop:'8%', height: '34px', 'font-weight': 600,  color: '#fff', 'border-top-right-radius': '1.5rem',
                                      'border-bottom-right-radius': '1.5rem'}} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">Now</a>
                              </li>
                          </ul>
                      </div>
                    </div>
                    <div class="container">
                          <div class="row">
                              <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <div class="tm-article-carousel"> 
                                  {this.state.car.length === 0 ?
                                                                        
                                    <ImageGallery items={this.state.car_default}  defaultImage="http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg" 
                                      infinite={true}
                                      showBullets={true}
                                      showFullscreenButton={true}
                                      showPlayButton={true}
                                      showThumbnails={true}
                                      showIndex={true}
                                      showNav={true}
                                      thumbnailPosition={'right'}
                                      slideDuration={450}
                                      slideInterval={2000}
                                      slideOnThumbnailOver={true}
                                      additionalClass="app-image-gallery"
                                      useWindowKeyDown={true}/>
                                  :
                                    <ImageGallery items={this.state.car}  defaultImage="http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg" 
                                    infinite={true}
                                    showBullets={true}
                                    showFullscreenButton={true}
                                    showPlayButton={true}
                                    showThumbnails={true}
                                    showIndex={true}
                                    showNav={true}
                                    thumbnailPosition={'right'}
                                    slideDuration={450}
                                    slideInterval={2000}
                                    slideOnThumbnailOver={true}
                                    additionalClass="app-image-gallery"
                                    useWindowKeyDown={true}/>
                                  }
                                </div>    
                              </div>
                                                                    
                              <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-recommended-container">
                                  <div class="tm-bg-white">
                                        <div class="tm-sidebar-pad-2">
                                            <a href="#" class="media tm-media tm-recommended-item">
                                                <iframe src={this.state.map} width="100%" height="100%" style={{border:0}} allowfullscreen=""></iframe>
                                            </a>
                                            <a href="#" class="media tm-media tm-recommended-item">
                                                <div class="form-group tm-form-element tm-form-element-50" style={{'text-align': 'left'}}>
                                                  <i class="fa fa-map-marker" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '20px'}}> </i>
                                                  <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{this.state.address}</span>
                                                </div>
                                            </a>
                                                                              
                                        </div>
                                  </div>                            
                              </div>
                          </div>
                        </div>



                        <br />
                        <hr />
                        <br />
                        <p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>About Room</p>
                        <p style={{fontSize: '18px','text-indent': '10px', color: 'black', fontStyle: 'italic'}}> <i class="fa fa-arrows" style={{color: '#e87b1c', fontSize: '15px'}}> </i> <b>Room Area:</b> {this.state.room_info.area}</p>
                        <p style={{fontSize: '18px','text-indent': '10px', color: 'black', fontStyle: 'italic'}}> <i class="fa fa-bed" style={{color: '#e87b1c', fontSize: '15px'}}> </i> <b>Bed:</b> {this.state.room_info.bed}</p>
                        {this.state.room_info.specialAmeneties != undefined && this.state.room_info.specialAmeneties.length > 0?  <p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>Room Anemeties</p>:null }
                          <div class="grid-room-infos">
                                          {this.state.room_info.specialAmeneties != undefined && this.state.room_info.specialAmeneties.length > 0? this.state.room_info.specialAmeneties.map((info, index)=>
                                            <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                                  <i class="fa fa-check-square-o" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                                  <span style={{marginLeft: '20px', fontSize: '15px'}}>{info}</span>
                                            </div>
                                          ): null}
                            </div>



                        <br />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>About This Hotel</p>
                        <p style={{fontSize: '18px','text-indent': '90px', color: 'black', fontStyle: 'italic'}}>{this.state.hotel_info}</p>








                        <br />
                        <br />
                        <br />
                        <hr />
                        <br />
{console.log('this.state.tags: ', this.state.tags )}
                        { this.state.tags.length > 0?  <p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>Hotel Anemeties</p>:null }
                        <div class="grid-room-infos">
                            {this.state.tags.map((info, index)=>
                                <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                      <i class="fa fa-check-square-o" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                      <span style={{marginLeft: '20px', fontSize: '15px'}}>{info}</span>
                                </div>
                            )}
                        </div>



                          <br />
                          <br />
                          <br />
                          <hr />
                          <br />

                        {this.state.tagsLandmarks != undefined &&  this.state.tagsLandmarks.length > 0?  <p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>Landmarks</p>:null }
                          <div class="grid-room-infos">
                                          {this.state.tagsLandmarks.map((info, index)=>
                                            <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                                  <i class="fa fa-university" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                                  <span style={{marginLeft: '20px', fontSize: '15px'}}>{info}</span>
                                            </div>
                                          )}
                            </div>










                            <br />
                            <br />
                            <br />
                            <hr />
                            <br />
                                {this.state.tagsPolicies != undefined && this.state.tagsPolicies.length > 0?  <p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>Fees & policies</p>:null }
                                  <div class="grid-room-infos">
                                          {this.state.tagsPolicies.map((info, index)=>
                                            <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                                    <i class="fa fa-circle" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                                    <span style={{marginLeft: '20px', fontSize: '15px'}}>{info}</span>
                                            </div>
                                            )}
                                    </div>




                              <br />
                              <br />
                              <br />
                              <br />
                              <br />

                                {this.state.exercises != undefined &&  this.state.exercises.length > 0?<p style={{fontSize: '25px', color: 'black', fontWeight: 'bold'}}>Other Rooms Available </p>:null}
                                    <div class="row tm-flex-align-center">
                              



                            <Carousel
                              ssr
                              partialVisbile
                              deviceType={'desktop'}
                              itemClass="image-item"
                              responsive={responsive}
                            >
                                  {this.state.exercises.map(image => 
                                        <div class="card" style={{width: '18rem'}} >
                                            {image.img.length > 1 ?
                                             image.img.map((info, index)=>{
                                              if (index === 0) { 
                                              return( <img src={info.original} alt="Image"  class="card-img-top" height={160} />   )
                                              } }
                        )
                                                  : <img src={'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'} alt="Image"  class="card-img-top" height={160} />  
                                         
                                               }
                                            <div class="card-body">
                                              <h5 class="card-title">{image.name}</h5>
                                              <p class="card-text">Good for {image.max_person}</p>
                                              <a class="btn btn-primary" onClick={()=> this.room_info_direct(image.temp_id)}>₱{image.rate_mode == "Daily"? currencyFormat(parseFloat(image.roomprice)): image.rate_mode == "Promo" && image.duration_mode == 'Daily'?currencyFormat(parseFloat(image.roomprice)):image.rate_mode == "Promo" && image.duration_mode == 'Hour'?currencyFormat(parseFloat(image.roomprice)):currencyFormat(parseFloat(image.roomprice_hour))}<small>{image.rate_mode == "Daily"? '/night': image.rate_mode == "Promo" && image.duration_mode == 'Daily'?"("+image.promo_duration+"nights)":image.rate_mode == "Promo" && image.duration_mode == 'Hour'?"/"+image.hour_duration+"hours": "/"+image.hour_duration+"hours"}</small></a>
                                            </div>
                                        </div>
                                    )}
                            </Carousel>
                            </div>
                        </div>
                                  <div class="grid-room-infos-room-in">
              
                                       {this.state.vou.map((info, index)=>{
                                              if (index < 5){return(
                                        <article class="card-voucher fl-left-voucher">
                                        <section class="date-voucher">
                                          <time>
                                            <span>{moment(info.expiration_date * 1000).format('D')}</span><span>{moment(info.expiration_date * 1000).format('MMM')}</span><span>{moment(info.expiration_date * 1000).format('YYYY')}</span>
                                          </time>
                                        </section>
                                        <section class="card-cont-voucher">
                                          <small>Code</small>
                                          <h3>{info.code}</h3>
                                          <div class="even-date-voucher">
                                           <i class="fa fa-calendar"></i>
                                           <time>
                                             <span>Minimum of {info.min_stay} Nights</span>
                                             <span>Maximum of {info.max_stay} Nights</span>
                                           </time>
                                          </div>
                                          <div class="even-info-voucher">
                                            <i class="fa fa-map-marker"></i>
                                            <p>
                                             {info.description}
                                            </p>
                                          </div>
                                          <a onClick={()=> {
                                             confirmAlert({
                                              title: 'How to Use Voucher?',
                                              message: 'Copy the voucher and paste it on the Reservation form',
                                              buttons: [
                                                {
                                                  label: 'Okay',
                                                  onClick: () =>null
                                                }
                                               
                                              ]
                                            });
                                          }}>Get Voucher</a>
                                        </section>
                                      </article>)}
                                      }
                                    
                                       )}
                                    <a class="btn btn-primary" onClick={()=> console.log('View Vouchers')} >View All Vouchers</a>
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
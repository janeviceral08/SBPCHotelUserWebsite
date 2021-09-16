import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import img from "../files/img/logo.png"
import ReactPaginate from 'react-paginate';
import moment from "moment";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Carousel from 'react-bootstrap/Carousel'

import { ReactVideo, ReactAudio } from "reactjs-media";





export default class Search_page extends Component {
  constructor(props) {
    super(props);


    this.state = {
        exercises: [],
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
        setOpenVideo:false
    
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  handleChange = (event) => {
    this.setState({setAge: event.target.value});
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });

};

loadMoreData() {
  const data = this.state.orgtableData;
  
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
  this.setState({
    pageCount: Math.ceil(data.length / this.state.perPage),
    tableData:slice
  })

  }
  componentDidMount() {
  

  this.getData();
   
  }

  getData(){
    const hotel = { 
      val: "project=60641fde66ceb2089b1bc468",
      check_in: this.props.match.params.check_in,
      check_out:this.props.match.params.check_out,
      address:this.props.match.params.address,
      guest:this.props.match.params.guest,
     
     }


axios.post('http://gloreto.herokuapp.com/room_type/search_result', hotel)
.then(res => {

  var tdata = res.data.sort((a, b) => Number(a.roomprice) - Number(b.roomprice));
 
var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)


  this.setState({
      pageCount: Math.ceil(tdata.length / this.state.perPage),
      orgtableData : tdata,
      tableData:slice
  })
     //console.log('response: ', response.data)
// this.setState({ exercises: response.data })
})
.catch((error) => {
 console.log(error);
})

  }

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 getHotelInfo (idinfo)  {
    
    const hotel = {    val: idinfo }
	axios.post('http://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
	.then(response => {
    
         this.setState({ 
             
            email: response.data.email,
  mobile: response.data.mobile,
  tel_no: response.data.tel_no,
  website: response.data.website,
  address: response.data.address,
  name: response.data.hotel_name,
        map: response.data.map_address,
        img: response.data.hotel_image,
          })
	})
	.catch((error) => {
	  console.log(error);
	})
   
if(window.innerWidth < 990){
  this.handleOpen()}

 }
 handleOpen = () => {
  this.setState({ setOpen:true})
 };

  handleClose = () => {
   this.setState({ setOpen:false})
 };


 handleOpenVideo = () => {
  this.setState({ setOpenVideo:true})
 };

  handleCloseVideo = () => {
   this.setState({ setOpenVideo:false})
 };


 reseve (res_info)  {
    if( this.props.match.params.guest !== "" && this.props.match.params.check_out!== "" && this.props.match.params.check_in!== ""  && res_info.temp_id!== ""){
        this.props.history.push('/Additional_info_user/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.guest+'/'+res_info.temp_id)
    }
       else{
        console.log("Please Complete the fields");
       }
    
   

 }
 filters = () =>{
   console.log('filter: ', this.state.sorting)
   console.log('chenge filter: ', !this.state.sorting)
   this.sortByPriceAsc()
 }

 
  render() {
    let in_check = moment(this.props.match.params.check_in).unix()
let out_check = moment(this.props.match.params.check_out).unix()

    let in_check_diff =  moment(in_check  * 1000 ).format('MMMM D, YYYY')
    let out_check_diff = moment(out_check  * 1000 ).format('MMMM D, YYYY')
    let sub = new Date(out_check_diff)- new Date(in_check_diff);
 const date_diff= sub;
console.log('window.innerHeight: ', window.innerHeight)
    return (
      
<body>
<div class="tm-main-content" id="top" >
            <div class="tm-top-bar-bg"></div>
            <div class="tm-top-bar" id="tm-top-bar">
                <div class="container">
                    <div class="row">
                        
                    <nav class="navbar navbar-expand-lg narbar-light">
                            <Link to={'/Home'} class="navbar-brand mr-auto" href="#">
                                <img src={img} alt="Site logo" style={{marginTop: -20}}/>
                                Gloreto
                            </Link>
                            <button type="button" id="nav-toggle" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#mainNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div id="mainNav" class="collapse navbar-collapse tm-bg-white">
                                <ul class="navbar-nav ml-auto">
                                  <li class="nav-item">
                                    <Link to={'/Home'}>
                                    <a class="nav-link" href="#top">Home <span class="sr-only">(current)</span></a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                  <Link to={'/Home'}>
                                    <a class="nav-link" href="#tm-section-4">Hotels</a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                  <Link to={'/Home'}>
                                    <a class="nav-link" href="#tm-section-5">Featured Rooms</a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                      <Link to={'/Check_reservation'}>
                                    <a class="nav-link" href="#tm-section-5">Check Reservation</a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                  <Link to={'/Home'}>
                                    <a class="nav-link" href="#tm-section-6">Contact Us</a>
                                    </Link>
                                  </li>
                                </ul>
                            </div>                            
                        </nav>              
                    </div>
                </div>
            </div>
            <div class="tm-section-result">
           



                                <div class="row" >
                                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-recommended-container">
                            <div class="tm-bg-white" style={{maxHeight:window.innerHeight-150, 'overflow': 'scroll'}}>
                                <div class="tm-bg-primary tm-sidebar-pad" onClick={this.filters}>
                                    <h3 class="tm-color-white tm-sidebar-title">Search Results</h3>
                               
                                                                          </div>
                                        <br />

 {this.state.tableData.map((res, index)=>(

<article class="media tm-margin-b-20 tm-media-1" key={index}>
<img src={res.img} alt="Image" width={150} height={120} onClick={()=> this.handleOpenVideo()}/>                        

                                        <div class="media-body tm-media-body-1 tm-media-body-v-center">
                                            <h3 class="tm-font-semibold tm-article-title-3"  onClick={()=>  this.getHotelInfo(res._partition)}>{res.name}</h3>
                                            
                                            <p  onClick={()=>  this.getHotelInfo(res._partition)}>
                                            <span> {res.hotel_name} </span>  <br />
                                                
                                                <span>₱ {res.rate_mode == "Daily"? this.currencyFormat(parseFloat(res.roomprice)): res.rate_mode == "Promo" && res.duration_mode == 'Daily'?this.currencyFormat(parseFloat(res.roomprice)):res.rate_mode == "Promo" && res.duration_mode == 'Hour'?this.currencyFormat(parseFloat(res.roomprice)):this.currencyFormat(parseFloat(res.roomprice_hour)) } {res.rate_mode == "Daily"? '/night': res.rate_mode == "Promo" && res.duration_mode == 'Daily'?"("+res.promo_duration+"nights)":res.rate_mode == "Promo" && res.duration_mode == 'Hour'?"/"+res.hour_duration+"hours": "/"+res.hour_duration+"hours"}
                                               &nbsp;&nbsp;&nbsp;(₱{this.currencyFormat(res.rate_mode == "Daily"? Math.floor(date_diff/(1000*60 * 60 * 24))*parseFloat(res.roomprice)/**/: res.rate_mode == "Promo" && res.duration_mode == 'Daily'?parseFloat(res.roomprice)/**/:res.rate_mode == "Promo" && res.duration_mode == 'Hour'?parseFloat(res.roomprice)/**/: parseFloat(res.roomprice_hour))} Total)
                                                
                                                
                                                 </span>  
                                               
                                            <span style={{'float': 'right'}}>&nbsp; Good for {res.max_person}</span>
                                            <br />
                                            <span style={{fontSize: 10}}>Address: {res.hotel_address+ ' '+res.hotel_city}</span>
                                            
                                              </p>
                                              
                                            <a class="btn btn-primary" onClick={()=>  this.reseve(res)} style={{'float': 'right'}}>Reserve Now</a>
                                        </div>    
                                        <Modal
        open={this.state.setOpenVideo}
        onClose={this.handleCloseVideo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.setOpenVideo}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '80%',
  marginTop: '10%',
marginLeft: '10%',
height: '80%'
    
    }}> 
    
 
    <ReactVideo
                src={res.video}
                autoPlay
               poster={img}
              //  primaryColor="red"
                // other props
                primaryColor="#efa463"
                pip
                type="video/mp4" 
            />
                            </div>        
        </Fade>
      </Modal>   
               
                                    </article>

 ))}



             </div>     
                            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    subContainerClassName={"pages pagination"}
                    
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
/>                          
                        </div>
{window.innerWidth < 990? <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={this.state.setOpen}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.setOpen}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '80%',
  marginTop: '10%',
marginLeft: '10%',
height: '80%'
    
    }}>
                                    <article class="media" >
                                        <img src={this.state.img} alt="Hotel Image" width={100} height={100} style={{backgroundColor: 'gray'}}/>
                                        <div class="media-body tm-media-body-1" style={{flexDirection: 'row'}}>
                                            <div style={{width: '40%'}}>
                                            <p><span class="tm-color-primary">Hotel Name:</span> <span>{this.state.name}</span></p>
                                            <p><span class="tm-color-primary">Tel. No.:</span> <span>{this.state.tel_no}</span></p>
                                            <p><span class="tm-color-primary">Mobile No.:</span> <span>{this.state.mobile}</span></p>
                                            </div>
                                            <div style={{width: '60%'}}>
                                            <p><span class="tm-color-primary">Hotel Address:</span> <span>{this.state.address}</span></p> 
                                            <p><span class="tm-color-primary">Email:</span> <span>{this.state.email}</span></p>
                                            <p><span class="tm-color-primary">Website:</span> <span>{this.state.website}</span></p>
                                            
                                            </div>
                                        </div>        
                                                                   
                                    </article>
                                    <div>
            
      
                                    <iframe src={this.state.map} width="100%" height="270" style={{border:0}} allowfullscreen=""></iframe>       
                                     </div>
                                                  
                            </div>        
        </Fade>
      </Modal> :

                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-recommended-container" style={{'position':'relative', 'right': 0}}>
                                <div class="ml-auto tm-bg-white-shadow tm-pad tm-media-container">
                                <article class="media" style={{maxHeight:window.innerHeight-150}}>
                                      <div style={{maxHeight:'100px', maxWidth: '100px', backgroundColor: "gray", backgroundImage: `url(${this.state.img})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',}}>&nbsp;</div>
                                        <div class="media-body tm-media-body-1" style={{flexDirection: 'row'}}>
                                            <div style={{width: '40%'}}>
                                            <p><span class="tm-color-primary">Hotel Name:</span> <span>{this.state.name}</span></p>
                                            <p><span class="tm-color-primary">Tel. No.:</span> <span>{this.state.tel_no}</span></p>
                                            <p><span class="tm-color-primary">Mobile No.:</span> <span>{this.state.mobile}</span></p>
                                            </div>
                                            <div style={{width: '60%'}}>
                                            <p><span class="tm-color-primary">Hotel Address:</span> <span>{this.state.address}</span></p> 
                                            <p><span class="tm-color-primary">Email:</span> <span>{this.state.email}</span></p>
                                            <p><span class="tm-color-primary">Website:</span> <span>{this.state.website}</span></p>
                                            
                                            </div>
                                        </div>        
                                                                   
                                    </article>
                                    <div>
                   
 
                                    <iframe src={this.state.map} width="100%" height="450" style={{border:0}} allowfullscreen=""></iframe>       
                                     </div>
                                </div>                     
                            </div>
  }
                       
                    </div>  
   
            </div>
            

            
         
           
                      

              
            
           
            
           
        </div>

</body>
    )
  }
}
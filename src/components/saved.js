import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from "../files/img/logo.png"
import ReactPaginate from 'react-paginate';
import moment from "moment";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ReactVideo } from "reactjs-media";
import GoogleMapReact from 'google-map-react';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { confirmAlert } from 'react-confirm-alert'; // Import
import cogoToast from 'cogo-toast';



import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlaceIcon from '@material-ui/icons/Place';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
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




export default class Saved_page extends Component {
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
        setOpenVideo:false,
        tagsLandmarks: [],
        tagsPolicies: [],
        tags: [],
        orig: [],
        loading: null,
        room_id:'',
        idinfo:'',
        userlocal: "",
        center: {
          lat: 8.947890,
          lng: 125.532333
        },
        zoom: 14,
        setOpenModal:false,
        saved: [],
        user_saved_rooms: [],
        valueTabs: 0
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
    this.setState({userlocal: localStorage.getItem('user_id')})
 




   const user = {    val: localStorage.getItem('user_id') }


 axios.post('http://localhost:5000/guest_account/info_guest_account', user)
.then(res => {
console.log('response user: ', res.data)

this.setState({     
user_saved_rooms: res.data.saved_rooms,
})
this.getData();
})
.catch((error) => {
console.log(error);
})

  }

  getData(){
    const hotel = { 
      check_in: this.props.match.params.check_in,
      check_out:this.props.match.params.check_out,
      address:this.props.match.params.address,
      guest:this.props.match.params.guest,
      user_saved_rooms: this.state.user_saved_rooms,
     }









axios.post('http://localhost:5000/room_type/saved_result', hotel)
.then(res => {
    console.log('saved result: ', res.data)
 var tdata_sorted_excerise = res.data.sort((a, b) => Number(b.web_view) - Number(a.web_view));
  var tdata = tdata_sorted_excerise.sort((a, b) => Number(a.roomprice) - Number(b.roomprice));
 
var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)



console.log('tdata_sorted_excerise: ', tdata_sorted_excerise)
console.log('tdata: ', tdata_sorted_excerise)

  this.setState({
      pageCount: Math.ceil(tdata.length / this.state.perPage),
      orgtableData : tdata,
      orig : tdata,
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

 getHotelInfo (idinfo, room_id)  {
    this.setState({loading: true})
    const hotel = {    val: idinfo }
	axios.post('http://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
	.then(response => {
    
         this.setState({ 
          loading: '',
          room_id:room_id,
          idinfo:idinfo,
            email: response.data.email,
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

 handleOpenModal = () => {
  this.setState({ setOpenModal:true})
 };

 handleCloseModal = () => {
   this.setState({ setOpenModal:false})
 };

 room_info = () => {
	this.props.history.push('/Room_Info/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.guest+'/'+this.props.match.params.address+'/'+this.state.idinfo +'/'+this.state.room_id  )
};
room_info_direct = (res) => {
	this.props.history.push('/Room_Info/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.guest+'/'+this.props.match.params.address+'/'+res._partition +'/'+res.temp_id  )
};

 reseve (res_info)  {
    if( this.props.match.params.guest !== "" && this.props.match.params.check_out!== "" && this.props.match.params.check_in!== ""  && res_info.temp_id!== ""&& res_info.temp_id!== ""){
        this.props.history.push('/Additional_info_user/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.guest+'/'+res_info.temp_id+'/'+res_info._partition)
    }
       else{
        console.log("Please Complete the fields");
       }
    
   

 }
 select = event =>{
   console.log('filter: ', event.target.value)
   if(event.target.value === '1'){


    const newDataGoods = this.state.orig.filter(item => {
      const itemData = item.rate_mode;
      const textData = 'Daily';
     
      return itemData.indexOf(textData) > -1
    });

    var tdata = newDataGoods.sort((a, b) => Number(b.roomprice) - Number(a.roomprice));

    var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) -  Number(a.web_view));
    var slice = web_tdata_sorted_excerise.slice(this.state.offset, this.state.offset + this.state.perPage)

    console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
    console.log('select tdata: ', tdata)
    console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
    
      this.setState({
        orgtableData : web_tdata_sorted_excerise,
          tableData:slice
      })
      return;
  }
  else if(event.target.value === '2'){
  console.log('2')

    const newDataGoods = this.state.orig.filter(item => {
      const itemData = item.rate_mode;
      const textData = 'Daily';
     
      return itemData.indexOf(textData) > -1
    });
    var tdata_sorted_excerise = newDataGoods.sort((a, b) => Number(b.web_view) - Number(a.web_view));
    var tdata = tdata_sorted_excerise.sort((a, b) => Number(a.roomprice) + Number(b.roomprice));
    var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
    var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) - Number(a.web_view));

    console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
    console.log('select tdata: ', tdata_sorted_excerise)
    console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
    
      this.setState({
        orgtableData : tdata,
          tableData:slice
      })
      return;
  }
  else if(event.target.value === '3'){

  
      const newDataGoods = this.state.orig.filter(item => {
        const itemData = item.rate_mode;
        const textData = 'Hour';
       
        return itemData.indexOf(textData) > -1
      });
  
      var tdata = newDataGoods.sort((a, b) => Number(b.roomprice) - Number(a.roomprice));
  
      var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) -  Number(a.web_view));
      var slice = web_tdata_sorted_excerise.slice(this.state.offset, this.state.offset + this.state.perPage)
  
      console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
      console.log('select tdata: ', tdata)
      console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
      
        this.setState({
          orgtableData : web_tdata_sorted_excerise,
            tableData:slice
        })
        return;
    }
    else if(event.target.value === '4'){

  
      const newDataGoods = this.state.orig.filter(item => {
        const itemData = item.rate_mode;
        const textData = 'Hour';
       
        return itemData.indexOf(textData) > -1
      });
      var tdata_sorted_excerise = newDataGoods.sort((a, b) => Number(b.web_view) - Number(a.web_view));
      var tdata = tdata_sorted_excerise.sort((a, b) => Number(a.roomprice) + Number(b.roomprice));
      var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
      var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) - Number(a.web_view));
  
      console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
      console.log('select tdata: ', tdata_sorted_excerise)
      console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
      
        this.setState({
          orgtableData : tdata,
            tableData:slice
        })
        return;
    }
    else if(event.target.value === '5'){

    
        const newDataGoods = this.state.orig.filter(item => {
          const itemData = item.rate_mode;
          const textData = 'Promo';
         
          return itemData.indexOf(textData) > -1
        });
    
        var tdata = newDataGoods.sort((a, b) => Number(b.roomprice) - Number(a.roomprice));
    
        var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) -  Number(a.web_view));
        var slice = web_tdata_sorted_excerise.slice(this.state.offset, this.state.offset + this.state.perPage)
    
        console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
        console.log('select tdata: ', tdata)
        console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
        
          this.setState({
            orgtableData : web_tdata_sorted_excerise,
              tableData:slice
          })
          return;
      }
      else if(event.target.value === '6'){

    
        const newDataGoods = this.state.orig.filter(item => {
          const itemData = item.rate_mode;
          const textData = 'Promo';
         
          return itemData.indexOf(textData) > -1
        });
        var tdata_sorted_excerise = newDataGoods.sort((a, b) => Number(b.web_view) - Number(a.web_view));
        var tdata = tdata_sorted_excerise.sort((a, b) => Number(a.roomprice) + Number(b.roomprice));
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
        var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) - Number(a.web_view));
    
        console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
        console.log('select tdata: ', tdata_sorted_excerise)
        console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
        
          this.setState({
            orgtableData : tdata,
              tableData:slice
          })
          return;
      }
      else if(event.target.value === '7'){
      
      
          var tdata = this.state.orig.sort((a, b) => Number(b.roomprice) - Number(a.roomprice));
      
          var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) -  Number(a.web_view));
          var slice = web_tdata_sorted_excerise.slice(this.state.offset, this.state.offset + this.state.perPage)
      
          console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
          console.log('select tdata: ', tdata)
          console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
          
            this.setState({
              orgtableData : web_tdata_sorted_excerise,
                tableData:slice
            })
            return;
        }
        else if(event.target.value === '8'){
    
          var tdata_sorted_excerise = this.state.orig.sort((a, b) => Number(b.web_view) - Number(a.web_view));
          var tdata = tdata_sorted_excerise.sort((a, b) => Number(a.roomprice) + Number(b.roomprice));
          var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
          var web_tdata_sorted_excerise = tdata.sort((a, b) => Number(b.web_view) - Number(a.web_view));
      
          console.log('select tdata_sorted_excerise: ', tdata_sorted_excerise)
          console.log('select tdata: ', tdata_sorted_excerise)
          console.log('select web_tdata_sorted_excerise: ', web_tdata_sorted_excerise)
          
            this.setState({
              orgtableData : tdata,
                tableData:slice
            })
            return;
        }
 }
 handleChangeTabs = (event, newValue) => {
  this.setState({valueTabs: newValue});
};
 save_room = (info)=> {
  const save_room_info = {
    email:  this.state.userlocal,
    saved_rooms: info.temp_id
   }
console.log('save Room')
 }

 remove_save_room = (info)=> {
  console.log('remove_save_room temp_id: ', info.temp_id)
  cogoToast.info("Please, Wait A Moment", { position: 'bottom-right', heading: 'Information' });

  
 const save_room_info = {
   email:  this.state.userlocal,
   saved_rooms: info.temp_id
  }

  axios.post('http://localhost:5000/guest_account/remove_save_room', save_room_info)
  .then(res =>{
   
      if(res.data == 'success'){
        this.setState({user_saved_rooms:this.state.user_saved_rooms.filter((value)=>value!=info.temp_id)})
        this.getData()
      }
      else{
          console.log('Please Try Again');
      }
      
  });
}


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
    let in_check = moment(this.props.match.params.check_in).unix()
let out_check = moment(this.props.match.params.check_out).unix()

    let in_check_diff =  moment(in_check  * 1000 ).format('MMMM D, YYYY')
    let out_check_diff = moment(out_check  * 1000 ).format('MMMM D, YYYY')
    let sub = new Date(out_check_diff)- new Date(in_check_diff);
 const date_diff= sub;
console.log('window.innerHeight: ', window.innerHeight)
console.log('this.state.user_saved_rooms',this.state.user_saved_rooms);

const AnyReactComponent = ({ text,info }) =>

<div className="AnyReactComponentstyle" >
        <p className="bubble_arrow">₱ {info.rate_mode == "Daily"? this.currencyFormat(parseFloat(info.roomprice)): info.rate_mode == "Promo" && info.duration_mode == 'Daily'?this.currencyFormat(parseFloat(info.roomprice)):info.rate_mode == "Promo" && info.duration_mode == 'Hour'?this.currencyFormat(parseFloat(info.roomprice)):this.currencyFormat(parseFloat(info.roomprice_hour)) } </p>
        
        <figure className="snip1336">

        {info.img === null?<img src={'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'} alt="Image" />:
        
        
        info.img.map((infos, index)=>
                                   {
                                    if (index === 0) { 
                                    return( <img src={infos.original} alt={info.name} key={index} onClick={()=> this.handleOpenVideo()} /> )
                                    } }
                       
                               
        
        
        )}



  <figcaption>
    <h3>{info.name}<span>{info.hotel_name}<br/> ₱ {info.rate_mode == "Daily"? this.currencyFormat(parseFloat(info.roomprice)): info.rate_mode == "Promo" && info.duration_mode == 'Daily'?this.currencyFormat(parseFloat(info.roomprice)):info.rate_mode == "Promo" && info.duration_mode == 'Hour'?this.currencyFormat(parseFloat(info.roomprice)):this.currencyFormat(parseFloat(info.roomprice_hour)) } {info.rate_mode == "Daily"? '/night': info.rate_mode == "Promo" && info.duration_mode == 'Daily'?"("+info.promo_duration+"nights)":info.rate_mode == "Promo" && info.duration_mode == 'Hour'?"/"+info.hour_duration+"hours": "/"+info.hour_duration+"hours" }<br/>(₱{this.currencyFormat(info.rate_mode == "Daily"? Math.floor(date_diff/(1000*60 * 60 * 24))*parseFloat(info.roomprice)/**/: info.rate_mode == "Promo" && info.duration_mode == 'Daily'?parseFloat(info.roomprice)/**/:info.rate_mode == "Promo" && info.duration_mode == 'Hour'?parseFloat(info.roomprice)/**/: parseFloat(info.roomprice_hour))} Est.Total) <br/> Good for {info.max_person}</span></h3>
    <p><b>Address: </b>{info.hotel_address+ ' '+info.hotel_city} </p>
    <a onClick={()=>  this.reseve(info)} className="follow">Book Now</a>
    <a onClick={()=> this.room_info_direct(info)} className="info">Hotel Info</a>
  </figcaption>
</figure>

        </div>

;


    return (
      
<body >
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
                           
                            <div id="mainNav" class="collapse navbar-collapse tm-bg-white">
                                <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                  <Link to={'/Home'}>
                                    <a class="nav-link" href="#top">Home <span class="sr-only">(current)</span></a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                      <Link to={'/Check_reservation'}>
                                    <a class="nav-link" href="#tm-section-5">Reservations</a>
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
                                   {this.state.userlocal === null || this.state.userlocal === undefined ? null:
                                     <li class="nav-item">
                                     <Link to={'/Voucher'}>
                                <a class="nav-link">Saved</a>
                                </Link>
                              </li>
                                  }
                                   {this.state.userlocal === null || this.state.userlocal === undefined ? null:
                                     <li class="nav-item">
                                     <Link to={'/Voucher'}>
                                <a class="nav-link">Reviews</a>
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

            <div class="tm-section-result" >
           



                                <div class="row-search-page" >
                                  
                                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 tm-recommended-container">
                            <div class="tm-bg-white">
                            
                  
                               { window.innerWidth > 979?null:<div>   <div style={{width: '35%', marginLeft: '30%'}}><AppBar position="static" color="default">
        <Tabs
          value={this.state.valueTabs}
          onChange={this.handleChangeTabs}
          variant="scrollable"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
            <Tab icon={<ArtTrackIcon />} aria-label="List" {...a11yProps(0)} />
          <Tab icon={<PlaceIcon />} aria-label="Map" {...a11yProps(1)} />
        
         
        </Tabs>
      </AppBar>
      </div>
      <TabPanel value={this.state.valueTabs} index={0}>
<div style={{height:window.innerHeight-220, 'overflow': 'scroll'}} >
<div class="col-lg-5 col-xl-5 tm-recommended-container list-of-rooms">
 {this.state.tableData.map((res, index)=>(

<div class="card_CARDS green_CARDS">
    <div class="additional_CARDS">
      <div class="user-card_CARDS">
 
        {res.img === null?<img src={'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'} alt="Image" style={{width: '100%', height: '100%'}}/>:
        
        
        res.img.map((info, index)=>
                                   {
                                    if (index === 0) { 
                                    return( <img src={info.original} alt="Image" style={{width: '100%', height: '100%'}}key={index} onClick={()=> this.handleOpenVideo()} /> )
                                    } }
                       
                               
        
        
        )}
   
      </div>
      <div class="more-info_CARDS" onClick={()=>  this.getHotelInfo(res._partition, res.temp_id)}>
        <h5>{res.name}</h5>
        <p>{res.hotel_name} <br /> <span>Good for {res.max_person}</span></p>
        <div class="coords_CARDS">
          <span class="price_font">₱ {res.rate_mode == "Daily"? this.currencyFormat(parseFloat(res.roomprice)): res.rate_mode == "Promo" && res.duration_mode == 'Daily'?this.currencyFormat(parseFloat(res.roomprice)):res.rate_mode == "Promo" && res.duration_mode == 'Hour'?this.currencyFormat(parseFloat(res.roomprice)):this.currencyFormat(parseFloat(res.roomprice_hour)) } {res.rate_mode == "Daily"? '/night': res.rate_mode == "Promo" && res.duration_mode == 'Daily'?"("+res.promo_duration+"nights)":res.rate_mode == "Promo" && res.duration_mode == 'Hour'?"/"+res.hour_duration+"hours": "/"+res.hour_duration+"hours"}</span>
          <span class="price_font">(₱{this.currencyFormat(res.rate_mode == "Daily"? Math.floor(date_diff/(1000*60 * 60 * 24))*parseFloat(res.roomprice)/**/: res.rate_mode == "Promo" && res.duration_mode == 'Daily'?parseFloat(res.roomprice)/**/:res.rate_mode == "Promo" && res.duration_mode == 'Hour'?parseFloat(res.roomprice)/**/: parseFloat(res.roomprice_hour))} Est.Total)</span>
        </div>
        <div class="coords_CARDS">
          <span class="address">Address: {res.hotel_address+ ' '+res.hotel_city}</span>
          <span> </span>
        </div>
     
        <div class="stats_CARDS">
        <button class="btn_CARDS" onClick={()=>  this.reseve(res)}>
   <span class="buy_CARDS">Book</span>
 </button>  <button class="btn_CARDS" onClick={()=> this.room_info_direct(res)} style={{marginLeft: '20px'}}>
   <span class="buy_CARDS">View</span>

 </button>
 {this.state.user_saved_rooms.includes(res.temp_id) === false?
  <span  onClick={()=> this.save_room(res)} style={{marginLeft: '20px'}}><FavoriteBorderRoundedIcon  /></span>
:  <span  onClick={()=> this.remove_save_room(res)} style={{marginLeft: '20px'}}><FavoriteRoundedIcon  /></span>
}

        </div>
      </div>
    </div>
    <div class="general_CARDS">
    <h5>{res.name} {res.rate_mode === 'Promo'?<aside><p>PROMO</p></aside>:null}</h5>
        <p>{res.hotel_name}  <br /> Good for {res.max_person}</p>
        <div class="coords_CARDS">
          <span class="price_font">₱ {res.rate_mode == "Daily"? this.currencyFormat(parseFloat(res.roomprice)): res.rate_mode == "Promo" && res.duration_mode == 'Daily'?this.currencyFormat(parseFloat(res.roomprice)):res.rate_mode == "Promo" && res.duration_mode == 'Hour'?this.currencyFormat(parseFloat(res.roomprice)):this.currencyFormat(parseFloat(res.roomprice_hour)) } {res.rate_mode == "Daily"? '/night': res.rate_mode == "Promo" && res.duration_mode == 'Daily'?"("+res.promo_duration+"nights)":res.rate_mode == "Promo" && res.duration_mode == 'Hour'?"/"+res.hour_duration+"hours": "/"+res.hour_duration+"hours"}</span>
          <span class="price_font">(₱{this.currencyFormat(res.rate_mode == "Daily"? Math.floor(date_diff/(1000*60 * 60 * 24))*parseFloat(res.roomprice)/**/: res.rate_mode == "Promo" && res.duration_mode == 'Daily'?parseFloat(res.roomprice)/**/:res.rate_mode == "Promo" && res.duration_mode == 'Hour'?parseFloat(res.roomprice)/**/: parseFloat(res.roomprice_hour))} Est.Total)</span>
        </div>
      <p class="address">Address: {res.hotel_address+ ' '+res.hotel_city}</p>
      <span class="more_CARDS">Mouse over the card for more info</span>
    </div>
    <Modal
        open={this.state.setOpenVideo}
        onClose={this.handleCloseVideo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={this.state.setOpenVideo}>
          <div className="video-search"> 
    
 
    <ReactVideo
                src={res.video}
                autoPlay
               poster={img}
                primaryColor="#efa463"
                type="video/mp4" 
                className="video-search-height"
            />
                            </div>        
        </Fade>
      </Modal>   
  </div>

 ))}

</div>
<br /><br /><br />
</div>
      </TabPanel>
      <TabPanel value={this.state.valueTabs} index={1}>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAszvWsGAXB3FUjfn2WhhZwwhF26vLEkI4' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          
        >
          {this.state.orgtableData.map((info)=>



           <AnyReactComponent
           key={info.temp_id}
           lat={info.lat}
           lng={info.lng}
           text="₱1,000"
           info={info}
         />
        
          )}
         
        </GoogleMapReact>
      </div>             
      </TabPanel>
      </div>
   }
      { window.innerWidth > 979? <div>
                                        <br />
<div style={{height:window.innerHeight-220, 'overflow': 'scroll'}} >
<div class="col-lg-5 col-xl-5 tm-recommended-container list-of-rooms">
 {this.state.tableData.map((res, index)=>(

<div class="card_CARDS green_CARDS">
    <div class="additional_CARDS">
      <div class="user-card_CARDS">
 
        {res.img === null?<img src={'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'} alt="Image" style={{width: '100%', height: '100%'}}/>:
        
        
        res.img.map((info, index)=>
                                   {
                                    if (index === 0) { 
                                    return( <img src={info.original} alt="Image" style={{width: '100%', height: '100%'}}key={index} onClick={()=> this.handleOpenVideo()} /> )
                                    } }
                       
                               
        
        
        )}
   
      </div>
      <div class="more-info_CARDS" onClick={()=>  this.getHotelInfo(res._partition, res.temp_id)}>
        <h5>{res.name}</h5>
        <p>{res.hotel_name} <br /> <span>Good for {res.max_person}</span></p>
        <div class="coords_CARDS">
          <span>₱ {res.rate_mode == "Daily"? this.currencyFormat(parseFloat(res.roomprice)): res.rate_mode == "Promo" && res.duration_mode == 'Daily'?this.currencyFormat(parseFloat(res.roomprice)):res.rate_mode == "Promo" && res.duration_mode == 'Hour'?this.currencyFormat(parseFloat(res.roomprice)):this.currencyFormat(parseFloat(res.roomprice_hour)) } {res.rate_mode == "Daily"? '/night': res.rate_mode == "Promo" && res.duration_mode == 'Daily'?"("+res.promo_duration+"nights)":res.rate_mode == "Promo" && res.duration_mode == 'Hour'?"/"+res.hour_duration+"hours": "/"+res.hour_duration+"hours"}</span>
          <span>(₱{this.currencyFormat(res.rate_mode == "Daily"? Math.floor(date_diff/(1000*60 * 60 * 24))*parseFloat(res.roomprice)/**/: res.rate_mode == "Promo" && res.duration_mode == 'Daily'?parseFloat(res.roomprice)/**/:res.rate_mode == "Promo" && res.duration_mode == 'Hour'?parseFloat(res.roomprice)/**/: parseFloat(res.roomprice_hour))} Est.Total)</span>
        </div>
        <div class="coords_CARDS">
          <span class="address">Address: {res.hotel_address+ ' '+res.hotel_city}</span>
          <span> </span>
        </div>
     
        <div class="stats_CARDS">
        <button class="btn_CARDS" onClick={()=>  this.reseve(res)}>
   <span class="buy_CARDS">Book</span>
 </button>  <button class="btn_CARDS" onClick={()=> this.room_info_direct(res)} style={{marginLeft: '20px'}}>
   <span class="buy_CARDS">View</span>

 </button>
 {this.state.user_saved_rooms.includes(res.temp_id) === false?
  <span  onClick={()=> this.save_room(res)} style={{marginLeft: '20px'}}><FavoriteBorderRoundedIcon  /></span>
:  <span  onClick={()=> this.remove_save_room(res)} style={{marginLeft: '20px'}}><FavoriteRoundedIcon  /></span>
}

        </div>
      </div>
    </div>
    <div class="general_CARDS">
    <h5>{res.name} {res.rate_mode === 'Promo'?<aside><p>PROMO</p></aside>:null}</h5>
        <p>{res.hotel_name}  <br /> Good for {res.max_person}</p>
        <div class="coords_CARDS">
          <span>₱ {res.rate_mode == "Daily"? this.currencyFormat(parseFloat(res.roomprice)): res.rate_mode == "Promo" && res.duration_mode == 'Daily'?this.currencyFormat(parseFloat(res.roomprice)):res.rate_mode == "Promo" && res.duration_mode == 'Hour'?this.currencyFormat(parseFloat(res.roomprice)):this.currencyFormat(parseFloat(res.roomprice_hour)) } {res.rate_mode == "Daily"? '/night': res.rate_mode == "Promo" && res.duration_mode == 'Daily'?"("+res.promo_duration+"nights)":res.rate_mode == "Promo" && res.duration_mode == 'Hour'?"/"+res.hour_duration+"hours": "/"+res.hour_duration+"hours"}</span>
          <span>(₱{this.currencyFormat(res.rate_mode == "Daily"? Math.floor(date_diff/(1000*60 * 60 * 24))*parseFloat(res.roomprice)/**/: res.rate_mode == "Promo" && res.duration_mode == 'Daily'?parseFloat(res.roomprice)/**/:res.rate_mode == "Promo" && res.duration_mode == 'Hour'?parseFloat(res.roomprice)/**/: parseFloat(res.roomprice_hour))} Est.Total)</span>
        </div>
      <p class="address">Address: {res.hotel_address+ ' '+res.hotel_city}</p>
      <span class="more_CARDS">Mouse over the card for more info</span>
    </div>
    <Modal
        open={this.state.setOpenVideo}
        onClose={this.handleCloseVideo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={this.state.setOpenVideo}>
          <div className="video-search"> 
    
 
    <ReactVideo
                src={res.video}
                autoPlay
               poster={img}
                primaryColor="#efa463"
                type="video/mp4" 
                className="video-search-height"
            />
                            </div>        
        </Fade>
      </Modal>   
  </div>

 ))}
</div>
</div>

{/* end of scroll col*/}




{ window.innerWidth > 979?
   <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-recommended-container width-serachpage-hotel-info" style={{ 
    'position': 'fixed',
    right: '0%',height:window.innerHeight}}>
  <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAszvWsGAXB3FUjfn2WhhZwwhF26vLEkI4' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          
        >
          {this.state.orgtableData.map((info)=>



           <AnyReactComponent
           key={info.temp_id}
           lat={info.lat}
           lng={info.lng}
           text="₱1,000"
           info={info}
         />
        
          )}
         
        </GoogleMapReact>
      </div>                     
                              </div>
  
 :null
}
</div>

: null
}
{/* end of scroll*/}
             </div>    

             { window.innerWidth > 979? 
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
:null                    
  }
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
     

</body>
    )
  }
}
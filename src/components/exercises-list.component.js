import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import { Tooltip } from "@material-ui/core";

 

export default class ExercisesList extends Component {
  constructor(props) {
		super(props);
		this.state = {   center: {
      lat: 8.947890,
      lng: 125.532333
    },
    zoom: 14};
	}
  

  render() {

   const AnyReactComponent = ({ text }) =>

  <div style={{ color: 'black', 

  padding: '1px 1px',
  display: 'inline-flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',}}>
          <p className="marker-style">{text}</p></div>

;
    return (
   
      
<div>

<div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAszvWsGAXB3FUjfn2WhhZwwhF26vLEkI4' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={8.947890}
            lng={125.532333}
            text="₱1,000"
          />
        </GoogleMapReact>
      </div>
</div>

    );
  }
}
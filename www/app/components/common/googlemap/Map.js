import React from "react";
import {GoogleApiWrapper} from "google-maps-react";


class Map extends React.Component{
    constructor(props){
        super(props);
        this.googleMapApi = props.google.maps;

        this.mapDiv = React.createRef();

        this.state = {
            currentLocation : new this.googleMapApi.LatLng(-33.8576161,151.2032192)
        }
    }

    showMap () {
        if(!this.googleMapApi) {
            return <div>Cannot load map as Google Api not available.</div>
        }
        const mapOptions = {
            center: this.state.currentLocation,
            zoom: 14
        };
        this.map = new this.googleMapApi.Map(this.mapDiv.current, mapOptions)
    }

    componentDidMount() {
        if(window.navigator && window.navigator.geolocation && window.navigator.geolocation.getCurrentPosition){
            window.navigator.geolocation.getCurrentPosition( position => {
                // console.log("componentDidMount pos =", pos, pos instanceof this.googleMapApi.LatLng)
                // console.log("componentDidMount pos.coords.latitude/longitude =", pos.coords.latitude, pos.coords.longitude)
                let currentLocation = new this.googleMapApi.LatLng(position.coords.latitude, position.coords.longitude)
                this.setState(
                    {currentLocation : currentLocation}
                )
                this.map.panTo(currentLocation)
            })
        }
        this.showMap();
    }

    showChildren(){
        if(!this.map || !this.props.children){
            return;
        }
        // console.log("showChildren ", this.props.children)
        return React.Children.map(this.props.children, (c)=>{
            // console.log("showChildren this.map =", this.map)
            return React.cloneElement(c, {
                position: this.state.currentLocation,
                map: this.map,
                googleMapApi: this.googleMapApi,
            })
        })
    }

    render(){
        const mapStyle = {
            position: "relative",
            height: "600px",
            width: "100%",
            left: "0",
            right: "0",
            margin: "auto",
            boxShadow: "10px 10px 5px #888888",
        }
        return <div ref={this.mapDiv} style={mapStyle}>
            Google Map.
            {this.showChildren.call(this)}
        </div>
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCbJYgZHCZoBLhgbJB5AjIB103aXuLtcQc'
    // apiKey: 'AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc'
    // apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Map);
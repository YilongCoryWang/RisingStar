import React from "react";

class Marker extends React.Component{
    constructor(props){
        super(props);
        console.log("A marker component. Constructed.", props)
        this.allMarkers = [];
    }

    componentWillUpdate() {
        console.log("Marker componentWillUpdate.", this.props);
        // console.log("window.allMarkers.length =", window.allMarkers.length)
        // if (this.props.markers.origin === "PlaceOfInterest") {
        this.allMarkers.forEach(function (marker, index) {
            marker.setMap(null);
            console.log("PlaceOfInterest marker cleared.", index)
        })
        this.allMarkers = [];
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Marker componentDidUpdate.", this.props);
    }
    componentWillMount() {
        console.log("Marker componentWillMount.");
    }
    componentDidMount() {
        console.log("Marker componentDidMount.");
    }
    componentWillUnmount() {
        console.log("Marker componentWillUnmount.");
        this.allMarkers.forEach(function (marker) {
            marker.setMap(null);
            console.log("PlaceOfInterest marker cleared.", marker)
        })
        this.allMarkers = [];
    }

    showMarker(){
        // if(!this.props.map){
        //     // console.log("showMarker: this.props.map is not there!");
        //     return null;
        // }

        // if(!this.props.position){
        //     // console.log("showMarker: this.props.position is not there!");
        //     return null;
        // }

        if(!this.props.googleMapApi){
            // console.log("showMarker: this.props.googleMapApi is not there!");
            return null;
        }
        // console.log("One marker added");
        // let markerOptions = {
        //     map: this.props.map,
        //     position: this.props.position,
        //     animation: this.props.animation,
        //     icon: this.props.icon,
        // }

        if(this.props.markers.length === 0){
            return null;
        }

        this.props.markers.items.forEach((item)=>{
            let newMarker = new this.props.googleMapApi.Marker(item);
            newMarker.setZIndex(1);
            // if (this.props.markers.origin === "PlaceOfInterest") {
            this.allMarkers.push(newMarker);
            // }
            // console.log("item.position =", item.position.lat(), item.position.lng())
            // console.log("Marker item/this.props.map =", item, this.props.map)
            this.props.googleMapApi.event.addListener(newMarker, 'click', this.props.markers.clickHanler, item);
        })
    }

    render () {
        return <div>{this.showMarker.call(this)}</div>;
    }
}

export default Marker;
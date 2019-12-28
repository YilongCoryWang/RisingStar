import React from "react";

class InfoWindow extends React.Component{
    constructor(props){
        super(props);
        console.log("InfoWindow constructor, props =", props)
        this.infoWindow = new this.props.googleMapApi.InfoWindow({
            content:""
        })
        this.marker = null; //anchor marker
        this.props.googleMapApi.event.addListener(this.infoWindow, 'closeclick', ()=>{
            console.log("InfoWindow EVENT closeclick!!!!!! Remove old marker.");
            if(this.marker){
                this.marker.setMap(null);
                this.marker = null;
            }
        });
    }

    showInfoWindow(){
        console.log("InfoWindow showInfoWindow", this.props);
        if(this.props.InfoWindow.infoWindow){
            console.log("InfoWindow componentWillUpdate opening an new InfoWindow.", this.props.InfoWindow.infoWindow.anchorMarker);
            this.marker = new this.props.googleMapApi.Marker({
                map: this.props.map,
                position: this.props.InfoWindow.infoWindow.anchorMarker.position,
                icon: this.props.InfoWindow.infoWindow.anchorMarker.icon
            });
            this.marker.setZIndex(0);
            this.infoWindow.setContent(this.props.InfoWindow.infoWindow.content)
            this.infoWindow.open(this.props.map, this.marker);
        }
        return null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("InfoWindow componentWillUpdate nextProps=",nextProps, "nextState=",nextState, "nextContext=", nextContext);
        if(this.marker){
            console.log("InfoWindow componentWillUpdate remove old anchor marker.");
            this.marker.setMap(null);
            this.marker = null;
        }
        this.infoWindow.close(); //close previous InfoWindow
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("InfoWindow componentDidUpdate prevProps =", prevProps, " this.props =", this.props);
        console.log("InfoWindow componentDidUpdate prevState =", prevState, " this.state =", this.state);

        if(!prevProps.InfoWindow.shownHanler && this.props.InfoWindow.shownHanler){
            //When adding a new infoWindow, telling father component infowindow is shown,
            //so next time infoWindow will not be shown when father component adds marks
            console.log("InfoWindow componentDidUpdate, telling father component infowindow is shown");
            this.props.InfoWindow.shownHanler();
        }
    }

    componentDidMount() {
        console.log("InfoWindow componentDidMount");
    }

    render(){
        return (
            this.showInfoWindow.call(this)
        );
    }
}

export default InfoWindow
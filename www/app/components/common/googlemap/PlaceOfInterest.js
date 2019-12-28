import React from "react";

class PlaceOfInterest extends React.Component{
    constructor(props){
        super(props);
        this.MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
console.log("PlaceOfInterest props =", props);
        this.state = {
            markers: [],
            results: [],
            routeOnMap: false,
            InfoWindow : null,
        }
        this.dest = null;
        this.showInfo = false; //false: show route not infoWindow when clicking marker; true: show InfoWindow when clicking panel of place of interest results
        this.directionsService = new this.props.googleMapApi.DirectionsService;
        this.directionsDisplay = new this.props.googleMapApi.DirectionsRenderer;
        this.markerClickHanler = this.markerClickHanler.bind(this);
        this.removeRouteHandler = this.removeRouteHandler.bind(this);
        this.changeWayOfTravel = this.changeWayOfTravel.bind(this);
        this.changePlaceOfInterest = this.changePlaceOfInterest.bind(this);
        this.InfoWindowShownHanler = this.InfoWindowShownHanler.bind(this);
        this.methodOfTravel = React.createRef();
        this.placeOfInterest = React.createRef();
    }

    componentDidMount() {
        console.log("PlaceOfInterest componentDidMount");
        this.search();
    }
    componentWillMount() {
        console.log("PlaceOfInterest componentWillMount");
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log("PlaceOfInterest componentWillReceiveProps. nextProps =",nextProps, " nextContext =", nextContext);

        //SearchBox places_changed: searching a new location
        // if(nextProps.markers.origin === "SearchBox"){
        if(this.props !== nextProps && nextProps.markers.origin === "SearchBox") {
            console.log("PlaceOfInterest componentWillReceiveProps is removing old route");
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = new this.props.googleMapApi.DirectionsRenderer;
            this.directionsDisplay.setMap(this.props.map);
            this.setState({
                routeOnMap: false
            })
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("PlaceOfInterest componentWillUpdate this.state =", this.state, " nextState =" , nextState);
        console.log("PlaceOfInterest componentWillUpdate this.props =", this.props, " nextProps =" , nextProps);

        // clicking another marker to find route.
        if(this.state.routeOnMap === true && nextState.routeOnMap === false){
            console.log("PlaceOfInterest componentWillUpdate will remove route, this =", this);
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = new this.props.googleMapApi.DirectionsRenderer;
            this.directionsDisplay.setMap(this.props.map);
        }

        //SearchBox places_changed: searching a new location
        if(this.props !== nextProps && nextProps.markers.origin === "SearchBox") {
            console.log("PlaceOfInterest componentWillUpdate searched another place from SearchBox.");

            //clear previous infoWindow
            this.showInfo = false;

            this.search();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("PlaceOfInterest componentDidUpdate", this.state, prevProps, prevState);
    }

    search () {
        var searchOptions = {
            bounds: this.props.map.getBounds(),
            types: [this.placeOfInterest.current.value || 'lodging']
        };

        console.log("================= searchOptions.types =", searchOptions.types);

        this.places = new this.props.googleMapApi.places.PlacesService(this.props.map)
        this.places.nearbySearch(searchOptions, (results, status) => {
            if (status === this.props.googleMapApi.places.PlacesServiceStatus.OK) {
                let markers = []
                for (let i = 0; i < results.length; i++) {
                    console.log(i, "search results =", results[i].geometry.location.lat(), results[i].geometry.location.lng());
                    this.position = results[i].geometry.location;
                    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                    var markerIcon = this.MARKER_PATH + markerLetter + '.png';
                    markers.push({
                        map: this.props.map,
                        position: results[i].geometry.location,
                        animation: this.props.googleMapApi.Animation.DROP,
                        icon: markerIcon
                    });
                    markers[i].placeResult = results[i];
                }
                console.log("----------------------------------- results =",results)
                this.setState({
                    markers: markers,
                    results: results,
                })
            } else {
                console.log("nearbySearch Failed!", status);
                this.setState({
                    markers: [],
                    results: [],
                });
            }
            this.showInfo = false;
        });
    }

    showInfoWindow(marker, result){
        console.log("showInfoWindow this.props.map=", this.props.map, " marker =", marker, " result =" ,result);

        this.setState({
            InfoWindow : {
                content: result.name.toString(),
                anchorMarker: marker
            },
        })

        this.showInfo = true;
    }

    showResults() {
        if(!this.state.results || !this.state.markers){
            //remove current markers and routes.
            return null;
        }
        return this.state.results.map((result, index) => {
            let markerLetter = String.fromCharCode('A'.charCodeAt(0) + (index % 26));
            let markerIcon = this.MARKER_PATH + markerLetter + '.png';
            let icon = <img src={markerIcon} className="placeIcon"></img>
            let name = result.name;
            let trStyle = {background: (index % 2 === 0) ? '#F0F0F0' : '#FFFFFF'};
            return <tr onClick={this.showInfoWindow.bind(this, this.state.markers[index], result)} style={trStyle} key={index}><td key={0}>{icon}</td><td key={1}>{name}</td></tr>
        })
    }

    markerClickHanler(dest){
        console.log("clicked marker!!!!!!!!")
        this.dest = dest;
        if(this.state.routeOnMap == false){
            console.log("creating new route...")
            this.directionsDisplay.setMap(this.props.map);
        } else {
            // console.log("clearing old route...")
            this.directionsDisplay.setMap(null);
            console.log("Old route cleared... this =", this)
            this.directionsDisplay.setMap(this.props.map);
            this.setState({routeOnMap:false});
        }
        this.calculateAndDisplayRoute();
        $("#TravelMethod-panel").show();
    }

    calculateAndDisplayRoute () {
        if(!this.directionsService){
            console.log("calculateAndDisplayRoute this.directionsService, get a new one");
            this.directionsService = new this.props.googleMapApi.DirectionsService;
        }
        if(!this.dest || !this.directionsDisplay){
            console.log("calculateAndDisplayRoute return null this.dest =", this.dest, "this.directionsDisplay =", this.directionsDisplay);
            return null;
        }
        console.log("calculateAndDisplayRoute calculating", this.methodOfTravel.current.value);
        this.directionsService.route({
            origin: this.props.markers.items[0].position,
            destination: this.dest.latLng,
            travelMode: this.methodOfTravel.current.value
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
                console.log("NEW ROUTE =", response.routes[0].legs[0].distance.text,  response.routes[0].legs[0].duration.text )
                this.setState({routeOnMap:true});
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    InfoWindowShownHanler(){
        console.log("PlaceOfInterest InfoWindowShownHanler.");
        this.showInfo = false;
    }

    showChildren(){
        console.log("PlaceOfInterest showChildren.");
        if(!this.props.map){
            return null;
        }
        if(!this.props.children){
            return null;
        }
        console.log("PlaceOfInterest showChildren. this.props.children =", this.props.children);
        return React.Children.map(this.props.children, (child)=>{
            if(!child){
                return null;
            }
            if(this.state.markers.length === 0){
                console.log("PlaceOfInterest showChildren. markers.length === 0");
                return null;
            }
            console.log("PlaceOfInterest showChildren. this.markers.length =", this.state.markers.length, this.state.markers);
            return React.cloneElement(child, {
                map: this.props.map,
                markers: {
                    origin: "PlaceOfInterest",
                    items: this.state.markers,
                    clickHanler: this.markerClickHanler,
                },
                InfoWindow: {
                    shownHanler: this.showInfo && this.InfoWindowShownHanler.bind(this),
                    infoWindow: this.showInfo && this.state.InfoWindow,
                },
                googleMapApi: this.props.googleMapApi,
            })
        })
    }

    removeRouteHandler(){
        console.log("removeRouteHandler is called!!!!");
        this.directionsDisplay.setMap(null);
        this.setState({
            markers: [],
            results: [],
        })
        $("#TravelMethod-panel").hide();
    }

    changeWayOfTravel(){
        // remove current route and reset
        // if(this.state.routeOnMap){
        //     this.directionsDisplay.setMap(null);
        //     this.directionsDisplay.setMap(this.props.map);
            console.log("changeWayOfTravel: Old route cleared...")
            this.setState({
                routeOnMap:false,
                //keep markers and result list
            });
        // }

        // re-calc route
        this.calculateAndDisplayRoute();
    }

    changePlaceOfInterest(){
        console.log("changePlaceOfInterest happened! this.state.routeOnMap = ", this.state.routeOnMap)
        // remove current route and reset
        if(this.state.routeOnMap){
            this.directionsDisplay.setMap(null); // why does not work?
            console.log("changeWayOfTravel: Old route cleared...")
            this.setState({routeOnMap:false});
            this.directionsDisplay.setMap(this.props.map);
        }
        this.search();
    }

    render() {
        return (
            <div>
                <div id="TravelMethod-panel">
                    <b>Mode of Travel: </b>
                    <select id="mode" ref={this.methodOfTravel} onChange={this.changeWayOfTravel}>
                        <option value="DRIVING">Driving</option>
                        <option value="WALKING">Walking</option>
                        <option value="BICYCLING">Bicycling</option>
                        <option value="TRANSIT">Transit</option>
                    </select>
                    <input id="TravelMethod-panel_remove" type="button" value="X" onClick={this.removeRouteHandler}/>
                    <p id="PoI"><b>Place of Interest: </b>
                    <select id="type" ref={this.placeOfInterest} onChange={this.changePlaceOfInterest}>
                        <option value="lodging">LODGING</option>
                        <option value="parking">PARKING</option>
                        <option value="atm">ATM</option>
                    </select></p>
                    <div id="listing">
                        <table id="resultsTable">
                            <tbody id="results">
                                {this.showResults.call(this)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.showChildren.call(this)}
            </div>
        )
    }
}

export default PlaceOfInterest;
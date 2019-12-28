import React from "react";

class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.searchBox = React.createRef();
        this.state = {
            showMarker : false
        }
        console.log("SearchBox constructor. this.props.map", this.props.map);
    }

    componentDidMount() {
        this.showSearchBox();
    }

    showSearchBox(){
        // console.log("input =", this.searchBox.current.querySelector("input"));
        let searchBoxObj = new this.props.googleMapApi.places.SearchBox(this.searchBox.current.querySelector("input"));
        this.props.map.controls[this.props.googleMapApi.ControlPosition.TOP].push(this.searchBox.current);

        const self = this;
        this.props.map.addListener('bounds_changed', function() {
            console.log("bounds_changed happened!!!!")
            searchBoxObj.setBounds(self.props.map.getBounds());
        });

        searchBoxObj.addListener('places_changed', function() {
            console.log("SearchBox: places_changed !!!!")
            var places = searchBoxObj.getPlaces();

            if (places.length == 0) {
                return;
            }

            let bounds = new self.props.googleMapApi.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                // let icon = {
                //     url: place.icon,
                //     size: new self.props.googleMapApi.Size(71, 71),
                //     origin: new self.props.googleMapApi.Point(0, 0),
                //     anchor: new self.props.googleMapApi.Point(17, 34),
                //     scaledSize: new self.props.googleMapApi.Size(25, 25)
                // };

                // Create a marker for each place.
                // markers.push(new self.props.googleMapApi.Marker({
                //     map: self.props.map,
                //     icon: icon,
                //     title: place.name,
                //     position: place.geometry.location
                // }));
                self.newMarker = {
                    map: self.props.map,
                    position: place.geometry.location,
                    animation: self.props.googleMapApi.Animation.BOUNCE,
                    icon: null,
                }

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            self.props.map.fitBounds(bounds);
            self.setState({
                showMarker : !self.state.showMarker
            })
        });
    }
    markerClickHanler(){
        alert("SearchBox Marker!");
    }

    showChildren(){
        if(!this.props.map){
            return null;
        }
        if(!this.props.children){
            return null;
        }
        return React.Children.map(this.props.children, (child)=>{
            if(!child){
                return null;
            }
            if(!this.newMarker){
                return null;
            }
            return React.cloneElement(child, {
                googleMapApi: this.props.googleMapApi,
                map: this.props.map,
                markers: {
                    origin: "SearchBox",
                    items: [{
                        map: this.newMarker.map,
                        position: this.newMarker.position,
                        animation: this.newMarker.animation
                    }],
                    clickHanler: this.markerClickHanler,
                }
            })
        })
    }

    clearInput(){
        $(this.searchBox.current.querySelector("input")).val("");
    }

    render(){
        return (
            <div ref={this.searchBox}>
                <input id="searchInput" type="text" placeholder="Input your address here."/>
                <input id="searchInput_clear" type="button" value="X" onClick={this.clearInput.bind(this)}/>
                {this.showChildren.call(this)}
            </div>
        )
    }
}

export default SearchBox;
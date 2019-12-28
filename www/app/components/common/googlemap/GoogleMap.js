import React from "react";
import Marker from "./Marker";
import Map from "./Map";
import SearchBox from "./SearchBox";
import PlaceOfInterest from "./PlaceOfInterest";
import InfoWindow from "./InfoWindow";

class GoogleMap extends React.Component{
    render(){
        return(
            <Map>
                <SearchBox>
                    <Marker></Marker>
                    <PlaceOfInterest>
                        <Marker/>
                        <InfoWindow/>
                    </PlaceOfInterest>
                </SearchBox>
            </Map>
        )
    }
}

export default GoogleMap
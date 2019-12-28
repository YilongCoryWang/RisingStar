import React from "react";
import GoogleMap from "../common/googlemap/GoogleMap";

class About extends React.Component{
    render(){
        return (
            <div id="about_container" className="container">
                <p><strong>Please find us on the map.</strong></p>
                <p> Our location is indicated by the red marker.</p>
                <GoogleMap />
            </div>
        )
    }
}

export default About;
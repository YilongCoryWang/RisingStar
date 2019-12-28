import React from "react";
import {withRouter} from 'react-router-dom';

export default function (ComposedComponent){
    class CheckAuth extends React.Component{
        constructor(props){
            super(props);
            console.log("CheckAuth constructor!");
        }
        componentWillMount(){
            console.log("CheckAuth componentWillMount!");
            if(this.props.authRole != ""){  //has logged in
                this.isAuth = true;
            } else {                //not logged in
                this.props.history.push('/');
                this.isAuth = false;
            }
        }
        componentWillUpdate(nextProps){
            console.log("CheckAuth componentWillUpdate!");
            if(nextProps.authRole != ""){   //has logged in
                this.isAuth = true;
            } else {                //not logged in
                this.props.history.push('/');
                this.isAuth = false;
            }
        }
        componentWillUnmount() {
            console.log("CheckAuth componentWillUnmount.");
        }

        render(){
            if(this.isAuth == false){
                console.log("CheckAuth this.isAuth == false");
                return null;
            } else {
                console.log("CheckAuth this.isAuth == true");
                return (
                    <ComposedComponent {...this.props}/>
                )
            }
        }
    }

    return withRouter(CheckAuth);
}
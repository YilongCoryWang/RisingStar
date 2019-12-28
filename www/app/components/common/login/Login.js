import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../../../actions/logInUpActions";
import {bindActionCreators} from "redux";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username_in : "",
            password_in : "",
            userType_in : "",
            username_up : "",
            password_up : "",
            confirmpassword : "",
            userType_up : "",
        }

        this.onSignIn = this.onSignIn.bind(this);
        this.saveInputContent = this.saveInputContent.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.userTypeChanged = this.userTypeChanged.bind(this);
    }

    signUpInfoPanelSignUpButtonHandler() {
        $(".signUpInfoPanel").hide("0.1");
        $(".slidingPanel").addClass("slidingPanelRight");
        $(".signInPanel").hide();
        $(".signUpPanel").show();
        $(".signInInfoPanel").show("0.1");
    }

    signInInfoPanelSignUpButtonHandler() {
        $(".signInInfoPanel").hide("0.1");
        $(".slidingPanel").removeClass("slidingPanelRight");
        $(".signInPanel").show();
        $(".signUpPanel").hide();
        $(".signUpInfoPanel").show("0.1");
    }

    onSignIn () {
        if(!this.state.username_in){
            // alert("Username cannot be empty!");
            this.props.changeMsg("Username cannot be empty!");
            $(".toast").toast("show");
            return;
        } else if (!this.state.password_in){
            // alert("Password cannot be empty!");
            this.props.changeMsg("Password cannot be empty!");
            $(".toast").toast("show");
            return;
        } else if(!this.state.userType_in){
            // alert("Please select user type...");
            this.props.changeMsg("Please select user type...");
            $(".toast").toast("show");
            return;
        }
        let loginCredentials = {username : this.state.username_in, password : this.state.password_in, userType : this.state.userType_in};
        console.log("login to server!!!", loginCredentials);
        console.log("login to server!!! this.props =", this.props);
        this.props.actions.signIn(loginCredentials, this.props.history, this.props.handleToggle);
    }

    onSignUp () {
        if(!this.state.username_up){
            // alert("Username cannot be empty!");
            this.props.changeMsg("Username cannot be empty!");
            $(".toast").toast("show");
            return;
        } else if (!this.state.password_up){
            // alert("Password can not be empty!");
            this.props.changeMsg("Password can not be empty!");
            $(".toast").toast("show");
            return;
        } else if (!this.state.confirmpassword){
            // alert("Confirm password can not be empty!");
            this.props.changeMsg("Confirm password can not be empty!");
            $(".toast").toast("show");
            return;
        } else if(this.state.password_up != this.state.confirmpassword){
            // alert("Password is not align with confirm password.");
            this.props.changeMsg("Password is not align with confirm password.");
            $(".toast").toast("show");
            return;
        } else if(!this.state.userType_up){
            // alert("Please select user type.");
            this.props.changeMsg("Please select user type.");
            $(".toast").toast("show");
            return;
        }
        if( !/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(this.state.username_up) ) {
            // alert("Username invalid. The rules are: \n " +
            //     "1. 8-20 characters long \n " +
            //     "2. no _ or . at the beginning\n" +
            //     "3. no __ or _. or ._ or .. inside\n" +
            //     "4. no _ or . at the end\n" +
            //     "5. allowed characters: a-zA-Z0-9._");
            this.props.changeMsg("Username invalid. The rules are: \n " +
                "1. 8-20 characters long \n " +
                "2. no _ or . at the beginning\n" +
                "3. no __ or _. or ._ or .. inside\n" +
                "4. no _ or . at the end\n" +
                "5. allowed characters: a-zA-Z0-9._");
            $(".toast").toast("show");
            return;
        }
        if( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(this.state.password_up) ){
            console.log("Signup failed: weak password.");
            alert("Password is too weak. The rules are:\n" +
                "1. Must contain at least 1 lowercase alphabetical character\n" +
                "2. Must contain at least 1 uppercase alphabetical character\n" +
                "3. Must contain at least 1 numeric character\n" +
                "4. Must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict\n" +
                "5. Must be eight characters or longer");
            return;
        }
        let signUpCredentials = {username : this.state.username_up, password : this.state.password_up, userType : this.state.userType_up};
        console.log("signup to server!!!", signUpCredentials);
        this.props.actions.signUp(signUpCredentials, this.props.history, this.props.handleToggle);
    }

    saveInputContent (e) {
        const target = e.target;
        const name = target.name;
        // console.log("saveInputContent", target.value, name);
        if(name){
            this.setState({
                [name] : target.value,
            })
        }
    }

    userTypeChanged(e) {
        const name = e.target.name;
        this.setState({
            [name] : e.currentTarget.value
        });
        // console.log("userTypeChanged name/e.currentTarget.value =", name, e.currentTarget.value);
    }

    render() {
        return (
            <div id="signInUpContainer">
                <div className="signInUpPanel">
                    <div className="slidingPanel">
                        <div className="signInPanel">
                            <div className="signInPanelTitle">Sign In:</div>
                            <div className="signInPanelUserContainer">
                                <input className="signInPanelUser" type="text" placeholder="username" name="username_in" onChange={this.saveInputContent}/>
                            </div>
                            <div className="signInPanelPasswordContainer">
                                <input className="signInPanelPassword" type="password" placeholder="password" name="password_in" onChange={this.saveInputContent}/>
                            </div>
                            <div className="signInPanelUserTypeContainer">
                                <label className="userTypeLabel">
                                    Student
                                    <input className="userTypeInput" name="userType_in" type="radio" value="student" onChange={this.userTypeChanged}/>
                                </label>
                                <label className="userTypeLabel">
                                    Investor
                                    <input className="userTypeInput" name="userType_in" type="radio" value="investor" onChange={this.userTypeChanged}/>
                                </label>
                            </div>
                            <input className="signInButton" type="button" value="Sign In" onClick={this.onSignIn}/>
                        </div>
                        <div className="signUpPanel">
                            <div className="signUpPanelTitle">Sign Up:</div>
                            <div className="signUpPanelUserContainer">
                                <input className="signUpPanelUser" type="text" onChange={this.saveInputContent} name="username_up" placeholder="username"/>
                            </div>
                            <div className="signUpPanelPasswordContainer">
                                <input className="signUpPanelPassword" onChange={this.saveInputContent} name="password_up" type="password" placeholder="password"/>
                            </div>
                            <div className="signUpPanelPasswordContainer">
                                <input className="signUpPanelPassword" onChange={this.saveInputContent} name="confirmpassword" type="password" placeholder="confirm password"/>
                            </div>
                            <div className="signUpPanelUserTypeContainer">
                                <label className="userTypeLabel">
                                    Student
                                    <input className="userTypeInput" name="userType_up" type="radio" value="student" onChange={this.userTypeChanged}/>
                                </label>
                                <label className="userTypeLabel">
                                    Investor
                                    <input className="userTypeInput" name="userType_up" type="radio" value="investor" onChange={this.userTypeChanged}/>
                                </label>
                            </div>
                            <input className="signUpButton" type="button" value="Sign Up" onClick={this.onSignUp}/>
                        </div>
                    </div>

                    <div className="signInInfoPanel">
                        <p>Already a member?</p>
                        <p className="signInInfoPanelPrompt">Sign in here:</p>
                        <input className="signInInfoPanelSignUpButton" type="button" value="Sign In" onClick={this.signInInfoPanelSignUpButtonHandler}/>
                    </div>

                    <div className="signUpInfoPanel">
                        <p>Not a member yet?</p>
                        <p className="signUpInfoPanelPrompt">Sign up here:</p>
                        <input className="signUpInfoPanelSignUpButton" type="button" value="Sign Up" onClick={this.signUpInfoPanelSignUpButtonHandler}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(withRouter(Login));
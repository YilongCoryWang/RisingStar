import React from 'react';
import Home from "./home/Home.js";
import Invest from "./invest/Invest.js";
import About from "./about/About.js";
import Student from "./student/Student.js";
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import * as actions from "../actions/logInUpActions";
import {bindActionCreators} from "redux";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: true
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.showStudentTag = this.showStudentTag.bind(this);
        this.showInvestTag = this.showInvestTag.bind(this);
        this.showLogoutTag = this.showLogoutTag.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //clicking "Link" cannot trigger render(), so
    //method 1:
    componentDidMount() {
        let navBar = $(this.refs.navbar);
        navBar.delegate("li", "click", function (event) {
            navBar.find("li").each(function (index, item) {
                if(item === $(event.target).parent()[0]) {
                    $(item).attr("class", "active");
                } else {
                    $(item).attr("class", "");
                }
            })
        })
    }
    //clicking "Link" cannot trigger render(), so
    //method 2:
    // clickHandle(event){
    //     $(this.refs.navbar).find("li").each(function (index, item) {
    //         if(item === $(event.target).parent()[0]) {
    //             $(item).attr("class", "active");
    //         } else {
    //             $(item).attr("class", "");
    //         }
    //     })
    // }
    setActive(match){
        // console.log(match, "setActive window.location =", window.location.pathname.slice(1))
        if(match === window.location.pathname.slice(1)){
            return "active";
        } else {
            return "";
        }
    }

    handleToggle(){
        this.setState({
            show: this.state.show ? false : true
        })
    }

    showStudentTag(){
        // console.log("showStudentTag this.props.authRole =", this.props.authRole);
        if(this.props.authRole == "student"){
            return (
                <li className="nav-item" onClick={this.handleToggle.bind(this)} className={this.setActive.call(this, 'student')}>
                    <Link className="nav-link" to="/student">Student</Link>
                </li>
            )
        } else {
            return null;
        }
    }

    clickInvestTagHandler(event){
        event.preventDefault();
        if(localStorage.jwtToken){
            let location = {};
            location.pathname = '/invest';
            location.state = {};
            this.props.history.push(location);
        } else {
            console.log("App: user not logged in.");
            return null;
        }
    }

    showInvestTag(){
        // console.log("showInvestTag this.props.authRole =", this.props.authRole);
        if(this.props.authRole == "investor"){
            return (
                <li className="nav-item" onClick={this.handleToggle.bind(this)} className={this.setActive.call(this, 'invest')}>
                    <Link className="nav-link" to="/invest" onClick={this.clickInvestTagHandler.bind(this)}>Invest</Link>
                </li>
            )
        } else {
            return null;
        }
    }

    showLogoutTag(){
        if(this.props.authRole !== "") {
            return (
                <li className="nav-item" onClick={this.handleLogout.bind(this)}>
                    <Link className="nav-link" to="/">Logout</Link>
                </li>
            )
        } else {
            return null;
        }
    }

    handleLogout(){
        let logoutRst = confirm("Are you sure to logout?");
        console.log("handleLogout logoutRst =", logoutRst);
        if(logoutRst) {
            this.props.actions.logout();
        }
    }

    render(){
        return (
            <section>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">P2P FINANCE</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item" onClick={this.handleToggle.bind(this)} className={this.setActive.call(this, '')}>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {this.showStudentTag()}
                            {this.showInvestTag()}
                            <li className="nav-item" onClick={this.handleToggle.bind(this)} className={this.setActive.call(this, 'about')}>
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            {this.showLogoutTag()}
                        </ul>
                    </div>
                </nav>
                <TransitionGroup>
                    <Switch>
                        <Route exact path="/">
                            {({match})=>(
                                <CSSTransition timeout={500} classNames="fade" in={match!=null} key="1" appear={true} unmountOnExit>
                                    <Home handleToggle={this.handleToggle}/>
                                </CSSTransition>
                            )}
                        </Route>
                        <Route path="/student">
                            {({match})=>(
                                <CSSTransition timeout={1000} classNames="fade" in={match!=null} key="2" appear={true} unmountOnExit>
                                    <Student />
                                </CSSTransition>
                            )}
                        </Route>
                        <Route path="/invest">
                            {({match})=>(
                            <CSSTransition timeout={1000} classNames="fade" in={match!=null} key="3" appear={true} unmountOnExit>
                                <Invest />
                            </CSSTransition>
                             )}
                        </Route>
                        <Route path="/about">{({match})=>(
                            <CSSTransition timeout={1000} classNames="fade" in={match!=null} key="4" appear={true} unmountOnExit>
                                <About />
                            </CSSTransition>
                        )}
                        </Route>
                    </Switch>
                </TransitionGroup>
            </section>
        )
    }
}

export default connect(
    (state) => {
        return {
            authRole:state.logInUpReducer.authRole
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(withRouter(App));
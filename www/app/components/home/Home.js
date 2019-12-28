import React from 'react';
import Login from '../common/login/Login';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toast from '../common/toast/Toast';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.showHomeFilter = this.showHomeFilter.bind(this);
        this.changeMsg = this.changeMsg.bind(this);
        this.state = {
            msg: ""
        };
    }

    showHomeFilter() {
        if(!this.props.authRole) {
            // alert("Please log in to take advantage of this website...");
            this.setState({
                msg: "Please log in to explore more of this website..."
            });
            $(".toast").toast("show");
        }else if (this.props.authRole === "investor") {
            // alert("loggin as " + this.props.authRole);
            this.props.history.push("/invest");
        } else if (this.props.authRole === "student") {
            this.props.history.push("/student");
        }
    }

    changeMsg(newMsg) {
        this.setState({
            msg: newMsg
        });
        // console.log("changeMsg(newMsg)", newMsg);
    }

    render() {
        return (
            <div className="container">
                <Toast msg={this.state.msg}></Toast>

                <Login handleToggle={this.props.handleToggle} changeMsg={this.changeMsg}></Login>

                <section id="filters" className="clearfix">
                    <div className="title">
                        <b>FILTER RESULTS TO BETTER SUIT YOUR NEEDS: </b>
                    </div>
                    <ul>
                        <li>
                            <a href="#" onClick={this.showHomeFilter}><img
                                src="../../pic/checklist.jpg" alt="checklist"/></a>
                        </li>
                        <li>
                            <a href="#" onClick={this.showHomeFilter}><img
                                src="../../pic/checkbox.jpg" alt="checkbox"/></a>
                        </li>
                        <li>
                            <a href="#" onClick={this.showHomeFilter}><img
                                src="../../pic/slider.jpg" alt="slider"/></a>
                        </li>
                        <li>
                            <a href="#" onClick={this.showHomeFilter}><img
                                src="../../pic/calendar.jpg" alt="calendar"/></a>
                        </li>
                    </ul>

                    <div id="SmallCarousel" className="carousel slide carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#SmallCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#SmallCarousel" data-slide-to="1"></li>
                            <li data-target="#SmallCarousel" data-slide-to="2"></li>
                            <li data-target="#SmallCarousel" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="../../pic/checklist.jpg" className="d-block w-100" alt="checklist"/>
                            </div>
                            <div className="carousel-item">
                                <img src="../../pic/checkbox.jpg" className="d-block w-100" alt="checkbox"/>
                            </div>
                            <div className="carousel-item">
                                <img src="../../pic/slider.jpg" className="d-block w-100" alt="slider"/>
                            </div>
                            <div className="carousel-item">
                                <img src="../../pic/calendar.jpg" className="d-block w-100" alt="calendar"/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#SmallCarousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#SmallCarousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </section>

                <div id="HomeCarousel" className="carousel slide carousel-fade" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#HomeCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#HomeCarousel" data-slide-to="1"></li>
                        <li data-target="#HomeCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="../../pic/Carousel_01.jpg" className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="../../pic/Carousel_02.jpg" className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="../../pic/Carousel_03.jpg" className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#HomeCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#HomeCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            authRole:state.logInUpReducer.authRole
        }
    },
    null
)(withRouter(Home));;
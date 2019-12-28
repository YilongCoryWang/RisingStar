import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import * as actions from "../../actions/logInUpActions";
import {bindActionCreators} from "redux";

class Student extends React.Component {
    constructor(props){
        super(props);
        console.log("Student constructor this.props.student =", this.props.student);
        this.state = {
            username : this.props.student.username || "",
            email : this.props.student.email || "",
            university : this.props.student.university || "",
            project_name : this.props.student.project_name || "",
            industry : this.props.student.industry || "",
            investment_amount : this.props.student.investment_amount || "",
            Date_start : this.props.student.Date_start || "",
            Date_end : this.props.student.Date_end || "",
            project_description : this.props.student.project_description || "",
        }
        this.changeValueHandler = this.changeValueHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    changeValueHandler (e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        if(name){
            this.setState({
                [name] : target.value,
            })
        }
    }

    submitUpdate (e) {
        e.preventDefault();
        if(!this.state.project_name){
            alert("Project name cannot be empty!");
            return;
        } else if(!this.state.username){
            alert("Username cannot be empty!");
            return;
        } else if(!this.state.email){
            alert("Email cannot be empty!");
            return;
        } else if(!this.state.university){
            alert("University cannot be empty!");
            return;
        } else if(!this.state.industry){
            alert("Industry cannot be empty!");
            return;
        } else if(!this.state.investment_amount){
            alert("Expected investment amount cannot be empty!");
            return;
        } else if(!this.state.Date_start){
            alert("Project starting date cannot be empty!");
            return;
        } else if(!this.state.Date_end){
            alert("Project ending date cannot be empty!");
            return;
        } else if(!this.state.project_description){
            alert("Project description cannot be empty!");
            return;
        }
        // console.log("Updating student project");
        this.props.actions.updateStudent({
            ...this.state,
        });
    }

    render() {
        return (
            <div id="student_container" className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="mb-3">Investment Expectations</h4>
                        <form className="needs-validation" noValidate="">
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="username" placeholder="Username"
                                           required="" value={this.state.username} readOnly/>
                                    <div className="invalid-feedback" style={{"width": "100%"}}>
                                        Your username is required.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="email">
                                    Email <span className="text-muted">(Optional)</span>
                                </label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                       name="email" onChange={this.changeValueHandler} value={this.state.email}/>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="university">University</label>
                                <select className="custom-select d-block w-100" id="university" required=""
                                        name="university" onChange={this.changeValueHandler} value={this.state.university}>
                                    <option value="">Choose...</option>
                                    <option>UNSW</option>
                                    <option>UTS</option>
                                    <option>USYD</option>
                                    <option>MU</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid university.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Project Name:
                                    <input type="text" className="form-control" placeholder="Project Name" required={true}
                                           name="project_name" onChange={this.changeValueHandler} value={this.state.project_name}/>
                                </label>
                                <div className="invalid-feedback">
                                    Project Name cannot be empty.
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="industry">Industry</label>
                                    <select className="custom-select d-block w-100" id="industry" required=""
                                            name="industry" value={this.state.industry} onChange={this.changeValueHandler}>
                                        <option value="">Choose...</option>
                                        <option>Website</option>
                                        <option>Big Data</option>
                                        <option>Smartphone App</option>
                                        <option>AI</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid industry.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Investment Amount: <span className="text-muted">(AUD)</span>
                                    <input type="number" className="form-control" name="investment_amount"
                                           placeholder="9999" min="100" max="9999" onChange={this.changeValueHandler}
                                           value = {this.state.investment_amount}/>
                                </label>
                                <div className="invalid-feedback">
                                    Please enter a valid expected amount of money of investment.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date">Project Starting Date: </label>
                                <div className="input-group">
                                    <input type="date" id="date_start" name="Date_start" value={this.state.Date_start}
                                           onChange={this.changeValueHandler}/>
                                    <div className="invalid-feedback">
                                        Please enter a valid start Date.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date">Investment Return Date: </label>
                                <div className="input-group">
                                    <input type="date" id="date_end" name="Date_end" value={this.state.Date_end}
                                           onChange={this.changeValueHandler}/>
                                    <div className="invalid-feedback">
                                        Please enter a valid end Date.
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-12">
                                    <label htmlFor="textarea">Project Description: </label>
                                    <div className="input-group">
                                        <textarea id="textarea" rows="3" name="project_description"
                                                  value = {this.state.project_description} onChange={this.changeValueHandler}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4"/>
                                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.submitUpdate}>
                                    Update
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    // null,
    (state)=>{
        return {
            "student" : state.logInUpReducer.student,
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(withRouter(Student));
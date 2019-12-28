import React from 'react';
import * as actions from "../../actions/logInUpActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom';

class Investor extends React.Component {
    constructor(props){
        super(props);
        console.log("Investor constructor... investor =", this.props.investor);
        this.state = {
            username            : this.props.investor.username || "",
            email               : this.props.investor.email || "",
            phone               : this.props.investor.phone || "",
            address1            : this.props.investor.address1 || "",
            address2            : this.props.investor.address2 || "",
            city                : this.props.investor.city || "",
            state               : this.props.investor.state || "",
            zip                 : this.props.investor.zip || "",
            total_funds         : this.props.investor.total_funds || "",
        }
        this.changeValueHandler = this.changeValueHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    changeValueHandler(e){
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        if(name){
            this.setState({
                [name] : target.value,
            })
        }
    }

    submitUpdate(e){
        e.preventDefault();
        this.props.actions.updateInvestor({
            ...this.state,
            "username": this.state.username
        });
    }

    render() {
        return (
            <div>
                <form className="needs-validation" noValidate="">
                    <div className="mb-3">
                        <label  htmlFor="email">
                            Email
                        </label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com"
                               name="email" onChange={this.changeValueHandler} value={this.state.email}/>
                        <div className="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label  htmlFor="phone">
                            Phone
                        </label>
                        <input type="text" className="form-control" id="mobile" placeholder="phone number"
                               name="phone" onChange={this.changeValueHandler} value={this.state.phone}/>
                        <div className="invalid-feedback">
                            Please enter your phone number.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Apartment, studio, or floor"
                               name="address1" onChange={this.changeValueHandler} value={this.state.address1}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" name="address2" onChange={this.changeValueHandler} value={this.state.address2}
                               placeholder="1234 Main St"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity" name="city" onChange={this.changeValueHandler} value={this.state.city}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">State</label>
                            <select id="inputState" className="form-control" name="state" onChange={this.changeValueHandler} value={this.state.state}>
                                <option defaultValue>Choose...</option>
                                <option>NSW</option>
                                <option>VIC</option>
                                <option>TAS</option>
                                <option>WA</option>
                                <option>NT</option>
                                <option>SA</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputZip">Zip</label>
                            <input type="text" className="form-control" id="inputZip" name="zip" onChange={this.changeValueHandler} value={this.state.zip}/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Total Funds: <span className="text-muted">(AUD)</span>
                            <input type="number" className="form-control" name="total_funds"
                                   placeholder="9999" onChange={this.changeValueHandler}
                                   value = {this.state.total_funds}/>
                        </label>
                        <div className="invalid-feedback">
                            Please enter a valid expected amount of money of investment.
                        </div>
                    </div>

                    <hr className="mb-4"/>
                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.submitUpdate}>
                        Update
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(
    // null
    (state)=>{
        // console.log("Invest.js connect data:", state.investReducer.data);
        return {
            "investor" : state.logInUpReducer.investor,
        };
    }
    ,
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(withRouter(Investor));
import React from 'react';
import * as actions from "../../actions/logInUpActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom';
import BasicTable from "../common/basicTable/BasicTable";

class InvestmentDetails extends React.Component {
    constructor(props){
        super(props);
        console.log("InvestmentDetails constructor props =", this.props, typeof this.props.investment, this.props.investment instanceof Array);

        this.source = {
            datatype: 'json',
            localdata: [{...this.props.investment}],
            datafields:[
                { name : 'PID'},
                { name : 'USERNAME'},
                { name : 'UNIVERSITY'},
                { name : 'EMAIL'},
                { name : 'PROJECTNAME'},
                { name : 'CREDIT'},
                { name : 'INDUSTRY'},
                { name : 'DESCRIPTION'},
                { name : 'RETURN_RATE'},
                { name : 'FUND_RAISED'},
                { name : 'EXPECTATION'},
                { name : 'MIN_INVEST'},
                { name : 'MAX_INVEST'},
                { name : 'PROJECT_START_DATE'},
                { name : 'PROJECT_END_DATE'},
            ],
        };

        this.columns = [
            { text: 'PID', datafield: 'PID', width: 80 },
            { text: 'USERNAME', datafield: 'USERNAME', width: 100 },
            { text: 'UNIVERSITY', datafield: 'UNIVERSITY', width: 100 },
            { text: 'EMAIL', datafield: 'EMAIL', width: 100 },
            { text: 'PROJECTNAME', datafield: 'PROJECTNAME', width: 140 },
            { text: 'CREDIT', datafield: 'CREDIT', width: 100 },
            { text: 'INDUSTRY', datafield: 'INDUSTRY', width: 100 },
            { text: 'DESCRIPTION', datafield: 'DESCRIPTION', width: 200 },
            { text: 'RETURN_RATE', datafield: 'RETURN_RATE', width: 140 },
            { text: 'FUND_RAISED', datafield: 'FUND_RAISED', width: 140 },
            { text: 'EXPECTATION', datafield: 'EXPECTATION', width: 200 },
            { text: 'MIN_INVEST', datafield: 'MIN_INVEST', width: 100 },
            { text: 'MAX_INVEST', datafield: 'MAX_INVEST', width: 100 },
            { text: 'PROJECT_START_DATE', datafield: 'PROJECT_START_DATE', width: 160 },
            { text: 'PROJECT_END_DATE', datafield: 'PROJECT_END_DATE', width: 160 },
        ];

        this.columngroups = [{}];

        this.doInvestment = this.doInvestment.bind(this);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // console.log("InvestmentDetails componentWillUpdate. nextProps.investment =", nextProps.investment);
        this.source = {
            ...this.source,
            localdata: [ nextProps.investment ],
        }
    }

    doInvestment (e) {
        e.preventDefault();
        console.log("InvestmentDetails doInvestment props =", this.props);
        for(let idx = 0; idx < this.props.project_invested.length; idx++) {
            if(this.props.project_invested[idx].PID == this.props.investment.PID){
                alert("You have already invested this project, PID = " + this.props.investment.PID + ", please choose another one.");
                return;
            }
        }
        let updatedDocument = {
            username : this.props.investorName,
            pid : this.props.investment.PID
        };
        this.props.actions.doInvestment(updatedDocument, this.props.investment);
    }

    render() {
        return (
            <div>
                <BasicTable id="investmentDetails" source={this.source} columns={this.columns} columngroups={this.columngroups}></BasicTable>
                <div className="btnBox">
                    <button className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={this.doInvestment}>invest</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">cancel</button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            project_invested : state.logInUpReducer.investor.project_invested,
            investorName : state.logInUpReducer.investor.username
        }
    }
    ,
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(withRouter(InvestmentDetails));
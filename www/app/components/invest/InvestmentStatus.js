import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import BasicTable from "../common/basicTable/BasicTable";

class InvestmentStatus extends React.Component {
    constructor(props){
        super(props);
        // console.log("InvestmentStatus constructor project_invested =", props.investor.project_invested);
        this.source =
            {
                datatype: 'json',
                localdata: props.investor.project_invested,
                // localdata: props.project_invested,
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
        this.columngroups = [
            {
                //text: 'Product Details', align: 'center', name: 'ProductDetails'
            }
        ];
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // console.log("InvestmentStatus componentWillUpdate this.props.location.state.project_invested =", this.props.location.state.project_invested);
        // console.log("InvestmentStatus componentWillUpdate history.state.state.project_invested =", history.state.state.project_invested);
        console.log("InvestmentStatus componentWillUpdate nextProps =", nextProps);
        this.source = {
            ...this.source,
            localdata: nextProps.investor.project_invested,
            // localdata: nextProps.project_invested,
        }
    }

    render() {
        return (
            <div>
                <span>Invested project table:</span>
                <BasicTable id="investmentStatus" source={this.source} columns={this.columns} columngroups={this.columngroups}></BasicTable>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            investor : state.logInUpReducer.investor
            // project_invested : state.logInUpReducer.investor.project_invested
        }
    }
    ,
    null
)(withRouter(InvestmentStatus));
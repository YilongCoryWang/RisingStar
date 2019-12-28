import React from "react";
import FilterBar from "./FilterBar";
import ActiveFilterBar from "./ActiveFilterBar";
import {fetchInitFilter, fetchData, addFilters} from "../../actions/investActions";
import {connect} from "react-redux";
import InvestCalendar from "../common/investCalendar/InvestCalendar";
import RangeBar from "../common/range/RangeBar";
import Investor from "./Investor";
import Pagination from "./Pagination";
import InvestmentStatus from "./InvestmentStatus";
import {withRouter} from 'react-router-dom';

class Invest extends React.Component{
    constructor(props){
        super(props);
        this.props.dispatch(fetchInitFilter());
        this.props.dispatch(fetchData());
        this.toggleInvestmentStatus = this.toggleInvestmentStatus.bind(this);
        this.changeContent = this.changeContent.bind(this);
        console.log("Invest constructing...");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps != this.props){
            console.log("Invest update as props changed. this.props/nextProps =", this.props, nextProps);
        } else if(nextState != this.state) {
            console.log("Invest update as state changed.");
        }
        return true;
    }

    componentWillUnmount() {
        console.log("Invest componentWillUnmount.");
    }

    onPick(obj){
        console.log("Invest onPick obj =", obj);
        this.props.dispatch(addFilters(obj));
    }

    showUniversityFilters(){
        let propsObj = {
            "title" : "UNIVERSITY", //title: for display on webpage
            "options" : this.props.filters.university,
            "onpick" : this.onPick.bind(this),
        }
        let showFlag = true;
        this.props.activeFilters.forEach(function (item) {
            if(item.title == propsObj.title){
                showFlag = false;
                return;
            }
        })
        if(showFlag){
            return (
                <FilterBar {...propsObj}/>
            )
        } else {
            return;
        }
    }

    showIndustryFilters(){
        let propsObj = {
            "title" : "INDUSTRY", //title: for display on webpage
            "options" : this.props.filters.industry,
            "onpick" : this.onPick.bind(this),
        }
        let showFlag = true;
        this.props.activeFilters.forEach(function (item) {
            if(item.title == propsObj.title){
                showFlag = false;
                return;
            }
        })
        if(showFlag) {
            return (
                <FilterBar {...propsObj}/>
            )
        }
    }

    showActiveFilters(){
        let propsObj = {
            "activeFilters" : this.props.activeFilters,
            "dispatch" : this.props.dispatch,
        }
        return (
            <ActiveFilterBar {...propsObj}/>
        )
    }

    showInvestCalendar() {
        let showFlag = true;
        this.props.activeFilters.forEach(function (item) {
            if(item.title == "DURATION"){
                showFlag = false;
                return;
            }
        })
        if(showFlag){
            let propsObj = {
                "title" : "DURATION",
                "duration" : this.props.filters.duration,
                "onpick" : this.onPick.bind(this),
            }

            return (
                <InvestCalendar {...propsObj}></InvestCalendar>
            )
        }
    }

    showRangeBar() {
        let showFlag = true;
        this.props.activeFilters.forEach(function (item) {
            if(item.title == "EXPECTATION"){
                showFlag = false;
                return;
            }
        })

        if(showFlag) {
            let propsObj = {
                "title": "EXPECTATION",
                "width": 250,
                "minValue": 100,
                "maxValue": 7800,
                "onpick": this.onPick.bind(this),
            }

            return (
                <RangeBar {...propsObj}></RangeBar>
            )
        }
    }

    showData(){
        if(this.props.data.length == 0){
            return;
        } else if(this.props.activeFilters.length == 0){
            return <Pagination data={this.props.data}></Pagination>
        } else {
            return <Pagination data={this.props.filtedData}></Pagination>
        }
    }

    toggleInvestmentStatus(e){
        $("#investmentStatus").toggle(300);
        this.changeContent(e);
    }

    changeContent(e){
        // console.log(/[+]/.test(e.target.innerHTML), /[-]/.test(e.target.innerHTML));
        if(/[+]/.test(e.target.innerHTML)){
            e.target.innerHTML = e.target.innerHTML.replace(/[+]/, "-");
        } else {
            e.target.innerHTML = e.target.innerHTML.replace(/[-]/, "+");
        }
    }

    render(){
        return (
            <div id="invest_container" className="container">
                <h3>Welcome {this.props.investorName}!</h3>
                <p>
                    <a className="btn-sm btn-light" data-toggle="collapse" href="#investorProfile" role="button"
                       aria-expanded="false" aria-controls="investorProfile" onClick={this.changeContent}>
                        + Investor Profilet
                    </a>
                </p>
                <div className="collapse" id="investorProfile">
                    <div className="card card-body">
                        <Investor></Investor>
                    </div>
                </div>
                <p>
                    <a className="btn-sm btn-light" href="javascript:;" onClick={this.toggleInvestmentStatus}>
                        + Investment Status
                    </a>
                </p>
                <div className="collapse" id="investmentStatus">
                    <div className="card card-body">
                        <InvestmentStatus></InvestmentStatus>
                    </div>
                </div>
                <p>
                    <a className="btn-sm btn-light" data-toggle="collapse" href="#investOptions" role="button"
                       aria-expanded="false" aria-controls="investOptions" onClick={this.changeContent.bind(this)}>
                        - Investment Options
                    </a>
                </p>
                <div className="collapse show" id="investOptions">
                    <div className="card card-body">
                        {this.showActiveFilters()}
                        {this.showUniversityFilters()}
                        {this.showIndustryFilters()}
                        {this.showInvestCalendar()}
                        {this.showRangeBar()}
                        {this.showData()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state)=>{
        // console.log("Invest.js connect data:", state.investReducer.data);
        return {
            "filters" : state.investReducer.filters,
            "activeFilters" : state.investReducer.activeFilters,
            "data" : state.investReducer.data,
            "filtedData" : state.investReducer.filtedData,
            "investorName" : state.logInUpReducer.investor.username
        }
    }
    ,
    null
)(withRouter(Invest));
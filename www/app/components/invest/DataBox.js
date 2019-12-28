import React from "react";
import DataRow from "./DataRow";
import SetTableBox from "./SetTableBox";
import InvestmentDetails from "./InvestmentDetails";
import {connect} from "react-redux";

class DataBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            // settableboxshow : false ,
            investment : {}
        };
        console.log("DataBox constructor, this.props.tableCol =", this.props.tableCol);
        this.setInvestment = this.setInvestment.bind(this);
    }

    // Another way to register click event handler, it works!
    // componentDidMount() {
    //     var self = this;
    //     $(this.refs.Select_columns).click(function () {
    //         self.setState ({
    //             settableboxshow : true,
    //         })
    //     })
    // }

    // setSetTableBoxShow(display){
    //     this.setState ({
    //         settableboxshow : display,
    //     })
    // }

    keyDownHandler(e){
        if(e.key === "Escape"){
            $('#SetTableBox').modal('hide')
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.keyDownHandler)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyDownHandler)
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("DataBox componentWillUpdate. nextState =", nextState)
    }

    setInvestment(obj){
        console.log("setInvestment obj =", obj);
        this.setState({
                ...this.state,
                investment : obj
        });
    }

    render(){
        let self = this;
        console.log("DataBox render(): self.props.tableCol/typeof =", self.props.tableCol, typeof self.props.tableCol);
        return (
            <div className="DataBox table-responsive">
                {/*<a ref="Select_columns">Select columns</a>*/}
                {/*1..下面做法不行，说render次数超上限*/}
                {/*<a href="javascript:;" onClick={self.setSetTableBoxShow(true)}>Select columns</a>*/}
                {/*2..应该写成下面这样*/}
                {/*<a href="javascript:;" onClick={()=>{self.setSetTableBoxShow(true)}}>Select columns</a>*/}
                {/*3..还可以写成这样*/}
                {/*<a href="javascript:;" onClick={self.setSetTableBoxShow.bind(this,true)}>Select columns</a>*/}
                {/*{self.showSetTableBox()}*/}
                {/*4..使用bootstrap的modal*/}
                {/*<a href="javascript:;" data-toggle="modal" data-target="#SetTableBox">Select Columns</a>*/}
                {/*<div className="modal fade" id="SetTableBox">*/}
                {/*    <SetTableBox setSetTableBoxShow={this.setSetTableBoxShow.bind(this)}></SetTableBox>*/}
                    <SetTableBox></SetTableBox>
                {/*</div>*/}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {self.props.tableCol.map(function (item, index) {
                                if(item.show) {return <th className="dataTh" key={index}>{item.fieldname}</th>;} })}
                        </tr>
                    </thead>
                    <tbody>
                        {self.props.data.map(function (item, index) {
                            // return <div key={index}>{JSON.stringify(item)}</div>
                            return <DataRow key={index} item={item} setInvestment={self.setInvestment}></DataRow>
                        })}
                    </tbody>
                </table>
                <div className="modal fade" id="projectDetail" tabIndex="-1" role="dialog" aria-labelledby="projectDetailLabel" aria-hidden="true">
                    <div className="innerProjectDetailCentralize modal-dialog">
                        <div className="innerProjectDetail">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-content">
                                <InvestmentDetails investment={this.state.investment}></InvestmentDetails>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            tableCol:state.investReducer.tableCol
        }
    },
    null
)(DataBox);
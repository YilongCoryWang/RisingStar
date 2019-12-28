import React from "react";
import * as actions from "../../actions/investActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class SetTableBox extends React.Component{
    constructor(props){
        super(props);
        console.log("SetTableBox constructor tableCol =", this.props.tableCol);
        this.state = (function () {
            let obj = {};

            // Good example! Creating state using IIFE
            props.tableCol.forEach(function (item, index) {
                //Adding new item by setting key/value without push
                obj[item.fieldname] = item.show;
            });
            return obj;
        })();
        console.log("SetTableBox constructor this.state =", this.state);
    }

    submitHandler(){
        this.props.actions.changeTableColumn(this.state);
    }

    // exit(){
    //     // console.log("exit clicked!");
    //     this.props.setSetTableBoxShow(false);
    //     $('#SetTableBox').hide();
    // }

    setC(k) {
        // console.log("setC =", k, this.state[k]);
        this.setState({
            [k] : !this.state[k] //第一个【】用于展开变量内容，否则就会增加一个键——K
        });
        // console.log(k, this.state[k])

        // 新写一个obj去替换state是不可以的
        // let obj = {}
        // for (let key in this.state) {
        //     if(key == k){
        //         obj[k] = !this.state[k]
        //     } else{
        //         obj[k] = this.state[k]
        //     }
        // }
        // this.state = obj;
    }

    showCheckbox(){
        var arr = []
        //for in 可以遍历object，k是obj中一项的key
        for (let k in this.state){
            arr.push(<label key={arr.length}>
                <input type="checkbox" value={k} checked={this.state[k]} onChange={this.setC.bind(this, k)} disabled={k=="USERNAME" || k=="PID"}></input>{k}</label>)
        }
        return arr;
    }

    selectAllHandler(){
        for(let item in this.state){
            this.setState({
                [item] : true,
            });
        }
    }

    cancelAllHandler(){
        for(let item in this.state){
            if(item != "USERNAME" && item != "PID"){
                this.setState({
                    [item] : false,
                });
            }
        }
    }

    render () {
        return (
            <div>
                {/*<a href="javascript:;" data-toggle="modal" data-target="#SetTableBox">Select Columns</a>*/}
                {/*<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">*/}
                {/*    Launch demo modal*/}
                {/*</button>*/}

                {/*<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"*/}
                {/*     aria-labelledby="exampleModalLabel" aria-hidden="true">*/}
                {/*    <div className="modal-dialog" role="document">*/}
                {/*        <div className="modal-content">*/}
                {/*            <div className="modal-header">*/}
                {/*                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>*/}
                {/*                <button type="button" className="close" data-dismiss="modal" aria-label="Close">*/}
                {/*                    <span aria-hidden="true">&times;</span>*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*            <div className="modal-body">*/}
                {/*                ...*/}
                {/*            </div>*/}
                {/*            <div className="modal-footer">*/}
                {/*                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
                {/*                <button type="button" className="btn btn-primary">Save changes</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <button type="button" className="btn-sm btn-light" data-toggle="modal" data-target="#SetTableBox">
                    Select Columns
                </button>
                <div className="modal fade" id="SetTableBox" tabIndex="-1" role="dialog" aria-labelledby="SetTableBoxLabel" aria-hidden="true">
                    <div className="SetTableBox modal-dialog" role="document">
                        <div className="innerBox modal-content">
                            {/*<a href="javascript:;" className="closebtn" onClick={this.exit.bind(this)}>x</a>*/}
                            {/*<a href="javascript:;" className="closebtn" onClick={this.exit.bind(this)}>x</a>*/}
                            <button type="button" className="close closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="labelbox">
                                {/*{this.props.tableCol.map(function(item, index){*/}
                                {/*    return <label key={index}><input type="checkbox" value={item.fieldname}></input>{item.fieldname}</label>*/}
                                {/*})}*/}
                                {this.showCheckbox()}
                            </div>
                            <div className="btnbox">
                                <input className="btn" type="button" value="Select All" onClick={this.selectAllHandler.bind(this)}/>
                                <input className="btn" type="button" value="Cancel All" onClick={this.cancelAllHandler.bind(this)}/>
                                <input className="btn btn-success submit" type="button" value="Submit" onClick={this.submitHandler.bind(this)} data-dismiss="modal"/>
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
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(SetTableBox);

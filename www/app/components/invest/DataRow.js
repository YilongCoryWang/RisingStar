import React from "react";
import {connect} from "react-redux";

class DataRow extends React.Component {
    constructor(props){
        super(props);
        this.showProject = this.showProject.bind(this);
    }

    showProject () {
        this.props.setInvestment(this.props.item);
        console.log(this.props.index, this.props);
    }

    render(){
        var self = this;
        return (
                <tr key={self.props.index} onClick={this.showProject} data-toggle="modal" data-target="#projectDetail">
                    {self.props.tableCol.map(function (item, index) {
                        if(item.show) {return <td className="dataTd" key={index}>{self.props.item[item.fieldname]}</td>;} })}
                </tr>
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
)(DataRow);
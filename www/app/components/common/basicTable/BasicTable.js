import React from 'react';
import * as actions from "../../../actions/logInUpActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom';

class BasicTable extends React.Component {
    constructor(props){
        super(props);
        console.log("BasicTable this.props =", this.props);
    }

    componentDidMount() {
        let dataAdapter = new $.jqx.dataAdapter(this.props.source, {
            downloadComplete: function (data, status, xhr) { },
            loadComplete: function (data) { },
            loadError: function (xhr, status, error) { }
        });

        // initialize jqxGrid
        $("#" + this.props.id).jqxGrid(
            {
                width: "100%",
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                sortable: true,
                altrows: true,
                enabletooltips: true,
                editable: true,
                selectionmode: 'multiplecellsadvanced',
                columns: this.props.columns,
                columngroups: this.props.columngroups,
            }
        );
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("BasicTable componentWillUpdate nextProps.source =", nextProps.source);
        let dataAdapter = new $.jqx.dataAdapter(nextProps.source, {
            downloadComplete: function (data, status, xhr) { },
            loadComplete: function (data) { },
            loadError: function (xhr, status, error) { }
        });

        // initialize jqxGrid
        $("#" + this.props.id).jqxGrid(
            {
                width: "100%",
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                sortable: true,
                altrows: true,
                enabletooltips: true,
                editable: true,
                selectionmode: 'multiplecellsadvanced',
                columns: this.props.columns,
                columngroups: this.props.columngroups,
            }
        );
    }

    render() {
        return (
            <div>
                <span>Basic table</span>
                <div id={this.props.id}></div>
            </div>
        )
    }
}

export default connect(
    null
    ,
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(withRouter(BasicTable));
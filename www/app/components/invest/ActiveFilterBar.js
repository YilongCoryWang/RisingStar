import React from "react";
import {delItem} from "../../actions/investActions";

class ActiveFilterBar extends React.Component{
    constructor(props){
        super(props);
        // console.log("ActiveFilterBar constructor props =", props);
    }

    showFilters(){
        console.log("ActiveFilterBar showFilters", this.props.activeFilters);
        if(this.props.activeFilters.length == 0){
            console.log("ActiveFilterBar showFilters: Error, this.props.activeFilters is empty.");
            return;
        }
        var self = this;
        var arrFilters = this.props.activeFilters.map(function(item, index){
            // console.log("showFilters item =", item.title, typeof(item), item)
            if(item.title == "UNIVERSITY" || item.title == "INDUSTRY"){
                var arrItem = item.v.map(function (item, index) {
                    if(index == 0) {
                        return item;
                    } else {
                        return " & " + item
                    }
                })
                return <li className="activefilter_item" key={index} onClick={()=>{self.props.dispatch(delItem(item.title))}}>{item.title} : {arrItem}</li>
            } else if (item.title == "DURATION") {
                let dur = item.v.year_start + "/" + item.v.month_start + "/" + item.v.day_start + " - " + item.v.year_end + "/" + item.v.month_end + "/" + item.v.day_end;
                return <li className="activefilter_item" key={index} onClick={()=>{self.props.dispatch(delItem(item.title))}}>{item.title} : {dur}</li>
            } else if (item.title == "EXPECTATION") {
                let dur = item.v.min + " AUD -- " + item.v.max + " AUD";
                return <li className="activefilter_item" key={index} onClick={()=>{self.props.dispatch(delItem(item.title))}}>{item.title} : {dur}</li>
            }
        })

        return (
            <div>
                {arrFilters}
            </div>
        )
    }

    render() {
        return (
            <div className="FilterBar row">
                <div className="col-2">
                    <b className="FilterTitle">FILTERS</b>
                </div>
                <div className="col-10 filterOptions">
                    {this.showFilters()}
                </div>
            </div>
        )
    }
}

export default ActiveFilterBar;
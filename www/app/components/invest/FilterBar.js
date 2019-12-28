import React from "react";

class FilterBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            "radio" : true,
            "showBar" : true,
        }
    }

    submitHandler(item){
        var selected = [];
        if(this.state.radio){
            // console.log("submitHandler item =", item);
            selected.push(item);
        } else {
            $(this.refs.multiSelection).find("label>input:checked").each(function (index, item) {
                // console.log("submitHandler", item.name, index);
                selected.push(item.name);
            })
        }
        if(selected.length > 0){
            this.props.onpick({"title":this.props.title, "v" : selected});
        } else {
            alert("Please select by checking the boxes.");
            return;
        }

        this.setState({
            "showBar" : false,
        })
    }

    showItems(){
        if(this.state.radio == true) {
            var self = this;
            return (
                <div>
                    {this.props.options.map(function(item, index){
                        return <a id="filter_item" onClick={self.submitHandler.bind(self, item)} key={index}>{item}</a>
                    })}
                    <input type="button" value="MultiSelect" className="filterBtn btn btn-outline-primary btn-sm" onClick={()=>{this.setState({"radio":false})}}/>
                </div>
            )
        } else {
            return (
                <div ref="multiSelection">
                    {this.props.options.map(function(item, index){
                        return <label key={index}>{item}<input type="checkbox" key={index} className="filterCheckBox" name={item}></input></label>
                    })}
                    <input type="button" value="Submit" className="filterBtn btn btn-outline-success btn-sm" onClick={this.submitHandler.bind(this)}/>
                    <input type="button" value="Cancel" className="filterBtn btn btn-outline-dark btn-sm" onClick={()=>{this.setState({"radio":true})}}/>
                </div>
            )
        }
    }

    showFilterBar(){
        if(this.state.showBar) {
            return (
                <div className="FilterBar row">
                    <div className="col-2">
                        <b className="FilterTitle">{this.props.title}</b>
                    </div>
                    <div className="col-10 filterOptions">
                        {this.showItems()}
                    </div>
                </div>
            )
        } else {
            return "";
        }
    }

    render(){
        return (
            <div >
                {this.showFilterBar()}
            </div>
        )
    }
}

export default FilterBar;
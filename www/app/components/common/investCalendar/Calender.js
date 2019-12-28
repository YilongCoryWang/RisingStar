import React from "react";
import CreateDateTable from "./CreateDateTable";
import YearMonthPicker from "./YearMonthPicker";

class Calendar extends React.Component{
    constructor(props){
        super(props);
        var now = new Date();

        // console.log("Calendar", this.props);

        this.state = {
            year : now.getFullYear(),
            month : parseInt(now.getMonth()) + 1,
            showPicker : true,
        }
    }

    showMonth(){
        var {lastMonth, thisMonth, nextMonth} = CreateDateTable(this.state.year, this.state.month);
        var days = lastMonth.concat(thisMonth, nextMonth);
        var week = [];
        var needFlashFlg = false;
        return days.map((item,index)=>{
            if(needFlashFlg == true){
                week = [];
                needFlashFlg = false;
            }
            week.push(<td key={index} className={(index<lastMonth.length)||(index>=(lastMonth.length + thisMonth.length)) ? "gray" : "cur_month"}>{item}</td>);
            if(index > 0 && (index + 1) % 7 == 0){
                needFlashFlg = true;
                return <tr key={index/7}>{week}</tr>;
            }
            if(index + 1 == days.length && needFlashFlg == false){
                return <tr key={index/7}>{week}</tr>;
            }
        })
    }

    goNextMonth(){
        if(this.state.month < 12){
            this.setState({
                month : parseInt(this.state.month) + 1,
            });
        } else {
            this.setState({
                year : parseInt(this.state.year) + 1,
                month : 1,
            });
        }
    }

    goPrevMonth(){
        if(this.state.month > 1){
            this.setState({
                year : this.state.year,
                month : parseInt(this.state.month) - 1,
            });
        } else {
            this.setState({
                year : parseInt(this.state.year) - 1,
                month : 12,
            });
        }
    }

    onpick(year, month){
        this.setState({
            year,
            month,
            showPicker : false,
        })
    }

    showPicker(){
        if(this.state.showPicker)
            return <YearMonthPicker onpick={this.onpick.bind(this)}></YearMonthPicker>
    }
    
    componentDidMount() {
        var self = this;
        $(this.refs.table).delegate("td.cur_month", "click", function () {
            self.props.onpick(self.state.year, self.state.month, $(this)[0].textContent);
        })

        $(this.refs.dateTag).click(function () {
            self.setState({
                "showPicker" : !self.state.showPicker,
            })
        })
    }

    render(){
        return (
            <div className="calendarChooser">
                <h5>
                    <a onClick={(this.goPrevMonth).bind(this)}>Prev</a>{" "}
                    <span ref="dateTag">{this.state.year} / {this.state.month}</span>{" "}
                    <a onClick={(this.goNextMonth).bind(this)}>Next</a>
                </h5>

                {this.showPicker()}

                <table ref="table">
                    <thead>
                    <tr>{["Sun","Mon","Tus","Wes","Thu","Fri","Sat"].map((item, index)=>{
                        return <th key={index}>{item}</th>
                    })}</tr>
                    </thead>
                    <tbody>
                        {this.showMonth()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Calendar;
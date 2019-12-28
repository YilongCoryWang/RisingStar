import React from "react";
import Calender from "./Calender";

class InvestCalendar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            year_start : props.duration.year_start,
            month_start : props.duration.month_start,
            day_start : props.duration.day_start,
            year_end : props.duration.year_end,
            month_end : props.duration.month_end,
            day_end : props.duration.day_end,
            showStartCalendar : true,
            showEndCalendar : true,
            showInvestCalendar: false,
        }
        console.log("BEC constructor state =", this.state)
        console.log("BEC constructor this.props =", this.props)
        console.log("BEC constructor props =", props)
    }

    onpickstart(year, month, day){
        // console.log("InvestCalendar onpickstart", year, month, day);
        this.setState({
            year_start : year,
            month_start : month,
            day_start : day,
            showStartCalendar : false,
        })
        //this.props.onpick();
    }

    onpickend(year, month, day){
        // console.log("InvestCalendar onpickend", year, month, day);
        this.setState({
            year_end : year,
            month_end : month,
            day_end : day,
            showEndCalendar : false,
        });
        //this.props.onpick(this.state);
    }

    showStartCalendar () {
        if(this.state.showStartCalendar){
            return <Calender onpick={this.onpickstart.bind(this)}></Calender>
        }
    }

    showEndCalendar () {
        if(this.state.showEndCalendar){
            return <Calender onpick={this.onpickend.bind(this)}></Calender>
        }
    }

    // componentDidMount() {
        // ***** 写成这样的不行：InvestCalendar只要隐藏一次，begin_result/end_result的click就不能识别了 *****
        // var self = this;
        // $(this.refs.begin_result).click(function () {
        //     alert("begin_result clicked!")
        //     self.setState({
        //         showStartCalendar : !self.state.showStartCalendar,
        //     });
        // })
        // $(this.refs.end_result).click(function () {
        //     alert("end_result clicked!")
        //     self.setState({
        //         showEndCalendar : !self.state.showEndCalendar,
        //     });
        // })
    // }

    getTtlDays(){
        var start = new Date(this.state.year_start, this.state.month_start, this.state.day_start);
        var end = new Date(this.state.year_end, this.state.month_end, this.state.day_end);
        var dayGap = (end - start) /1000 /60 /3600;
        return Math.ceil(dayGap);
    }

    showInvestCalendar () {
        return (
            <div>
                <div className="chooseBox">
                    <input type="button" className="btn btn-success submitbtn btn-sm" value="Submit" onClick={this.submitHandler.bind(this)}/>
                    <div className="begin">
                        Start Time:
                        <div className="begin_result result" onClick={()=>{
                            this.setState({
                                showStartCalendar : !this.state.showStartCalendar,
                            })}}>
                            {this.state.year_start}/{this.state.month_start}/{this.state.day_start}
                            {/*<span className="glyphicon glyphicon-calendar calendarbtn"></span>*/}
                            <i className="far fa-calendar-alt calendarbtn"></i>
                        </div>
                        {this.showStartCalendar()}
                    </div>

                    <div className="days">
                        Total<span className="month"> {this.getTtlDays()} </span>Day(s)
                    </div>

                    <div className="end">
                        End Time:
                        <div className="end_result result" onClick={()=>{
                            this.setState({
                                showEndCalendar : !this.state.showEndCalendar,
                            })}}>
                            {this.state.year_end} / {this.state.month_end} / {this.state.day_end}
                            {/*<span className="glyphicon glyphicon-calendar calendarbtn"></span>*/}
                            <i className="far fa-calendar-alt calendarbtn"></i>
                        </div>
                        {this.showEndCalendar()}
                    </div>
                </div>
            </div>
        )
    }

    submitHandler(){
        let startDate = Date.parse(new Date(this.state.year_start, this.state.month_start, this.state.day_start));
        let endDate = Date.parse(new Date(this.state.year_end, this.state.month_end, this.state.day_end));

        if(startDate > endDate){
            alert("End date should be greater than starting date.");
            return;
        }

        let obj = {
            "title" : "DURATION",
            "v" : {
                "year_start" : this.state.year_start,
                "month_start" : this.state.month_start,
                "day_start" : this.state.day_start,
                "year_end" : this.state.year_end,
                "month_end" : this.state.month_end,
                "day_end" : this.state.day_end,
            },
        }
        this.props.onpick(obj);
        this.setState({
            showInvestCalendar: false,
        });
    }

    render() {
        return (
            <div className="FilterBar row">
                <div className="col-2 ">
                    <b className="FilterTitle">{this.props.title}</b>
                </div>
                <div className="col-10">
                    <div className="InvestCalendar">
                        <div id="InvestCalendar_bar" className="result" onClick={()=>{this.setState({showInvestCalendar : !this.state.showInvestCalendar})} }>
                            {this.state.year_start}/{this.state.month_start}/{this.state.day_start} - {this.state.year_end}/{this.state.month_end}/{this.state.day_end}
                            {/*<span className="glyphicon glyphicon-calendar calendarbtn"></span>*/}
                            <i id="InvestCalendar_bar_icon" className="far fa-calendar-alt"></i>
                        </div>
                        {this.state.showInvestCalendar && this.showInvestCalendar()}
                    </div>
                </div>
            </div>
    )}
}

export default InvestCalendar;
import React from "react";

class YearMonthPicker extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            year : 2019,
        }
    }

    llBtnHandler(){
        this.setState({
            "year" : Number(this.state.year) - 1
        })
    }

    rrBtnHandler(){
        this.setState({
            "year" : Number(this.state.year) + 1
        })
    }


    componentDidMount() {
        let self = this;
        $(this.refs.monthPanel).find("a").click(function(){
            let month = $(this).attr("data-month");
            self.setState({
                "month" : month
            });
            self.props.onpick(self.state.year, month);
            // console.log(self.state.year, month);
        })
        
        $(this.refs.span_container).delegate("span", "click", function (event) {
            event.preventDefault();

            let i = 0;
            let loop = 0;
            if($(this).index() > 2){
                loop = $(this).index() - 2;
                while(loop - i > 0){
                    self.rrBtnHandler();
                    i++;
                }
            } else {
                loop = 2 - $(this).index();
                while(loop - i > 0){
                    self.llBtnHandler();
                    i++;
                }
            }
        })
    }

    render(){
        return (
            <div className="YearMonthPicker">
                <div className="inner">
                    <div className="yearPanel">
                        <div className="span_container" ref="span_container">
                            <span>{this.state.year - 2}</span>
                            <span>{this.state.year - 1}</span>
                            <span className="cur">{this.state.year}</span>
                            <span>{this.state.year + 1}</span>
                            <span>{this.state.year + 2}</span>
                        </div>

                        <i className="ll" onClick={()=>{this.llBtnHandler()}}></i>
                        <i className="rr" onClick={()=>{this.rrBtnHandler()}}></i>

                    </div>
                    <div className="monthPanel" ref="monthPanel">
                        <div className="col">
                            <a href="javascript:void(0);" data-month="1">Jan</a>
                            <a href="javascript:void(0);" data-month="2">Feb</a>
                            <a href="javascript:void(0);" data-month="3">Mar</a>
                            <a href="javascript:void(0);" data-month="4">Apr</a>
                            <a href="javascript:void(0);" data-month="5">May</a>
                            <a href="javascript:void(0);" data-month="6">Jun</a>
                        </div>
                        <div className="col">
                            <a href="javascript:void(0);" data-month="7">Jul</a>
                            <a href="javascript:void(0);" data-month="8">Aug</a>
                            <a href="javascript:void(0);" data-month="9">Sep</a>
                            <a href="javascript:void(0);" data-month="10">Oct</a>
                            <a href="javascript:void(0);" data-month="11">Nov</a>
                            <a href="javascript:void(0);" data-month="12">Dec</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default YearMonthPicker;
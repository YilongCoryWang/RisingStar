import React from "react";

class RangeBar extends React.Component{
    constructor( props ){
        let {width, minValue, maxValue} = props;
        super(props);

        this.scaleNum_Big = Math.ceil(width / 60);
        this.scaleWidth_Big = width / this.scaleNum_Big;
        this.scaleWidth_Small = this.scaleWidth_Big / 5;
        this.unitScaleValue_Big = (maxValue - minValue) / this.scaleNum_Big;
        this.valuePerPx = (maxValue - minValue) / width;
        this.state = {
            minValue : minValue,
            maxValue : maxValue,
        }
        this.pinLeftPx;
        this.pinRightPx;
        this.init = true;

        this.bar = React.createRef();
        this.pin_left = React.createRef();
        this.pin_right = React.createRef();
        this.scale = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("RangeBar componentDidUpdate");

        this.setLeftPin();
        this.setRightPin();
    }

    componentDidMount() {
        // console.log("RangeBar componentDidMount", $);
        this.configureMarkings();

        if(this.init) {
            this.leftMostPx = $(this.bar.current).offset().left;
            this.barWidth = $(this.bar.current).width();
            this.rightMostPx = this.leftMostPx + this.barWidth;
            this.pinLeftPx = this.leftMostPx;    //initial value
            this.pinRightPx = (this.rightMostPx > 10) ? (this.rightMostPx - 10) : this.rightMostPx; //initial value
            // console.log("RangeBar initial componentDidMount this.pinLeft, this.pinRight =", this.pinLeftPx, this.pinRightPx);

            $(this.bar.current).find(".rangeSpan").css({
                "width" : this.barWidth,
                "left" : 0,
            });

            this.init = false;
        }
        this.setLeftPin();
        this.setRightPin();
    }

    showIs(){
        var Is = [];
        for(var index = 0; index < this.scaleNum_Big * 5 + 1; index++) {
            if((index == 0) || (index % 5 == 0)){
                Is.push(<i key={index} className="big"></i>);
            } else {
                Is.push(<i key={index}></i>);
            }
        }
        return Is;
    }

    configureMarkings(){
        let self = this;

        $(this.bar.current).find("i").css({"margin-right":self.scaleWidth_Small - 1});
        $(this.scale.current).find("i").css({"margin-right":self.scaleWidth_Small - 1});
        $(this.scale.current).find("i.big").each(function (index) {
            $(this).append("<u>"+(index * self.unitScaleValue_Big + self.props.minValue)+"</u>");
        })
    }

    setLeftPin () {
        let self = this;
        self.leftMostPx = $(self.bar.current).offset().left;
        // console.log("RangeBar setLeftPin leftMostPx, self.pinRightPx =", self.leftMostPx, self.pinRightPx);
        $(this.pin_left.current).draggable({
            "axis" : "x",
            "containment" : [self.leftMostPx,0,(self.pinRightPx > 10)?(self.pinRightPx - 10):self.pinRightPx,0], //[x1, y1, x2, y2]
            "drag" : function(event,ui){
                self.pinLeftPx = $(self.pin_left.current).offset().left;
                self.pinRightPx = $(self.pin_right.current).offset().left;
                $(self.bar.current).find(".rangeSpan").css({
                    "width" : self.pinRightPx - self.pinLeftPx,
                    "left" : parseInt($(self.pin_left.current).css("left"))
                });
                // console.log("setLeftPin drag offsetleft", self.pinLeftPx, self.pinRightPx);
                // console.log("setLeftPin drag cssleft", $(self.pin_left.current).css("left"), $(self.pin_right.current).css("left"));
                self.setRightPin();
                self.setState({
                    minValue : ((self.pinLeftPx - self.leftMostPx)  * self.valuePerPx + self.props.minValue) < self.props.minValue ? self.props.minValue : Math.ceil((self.pinLeftPx - self.leftMostPx)  * self.valuePerPx + self.props.minValue),
                })
            },
            // Optional approach: update result instantaneously, and remove "submit" button
            // "stop": function( event, ui ) {
            //     let obj = {
            //         "title" : "EXPECTATION",
            //         "v" : {
            //             max : self.state.maxValue,
            //             min : self.state.minValue,
            //         }
            //     }
            //     self.props.onpick(obj);
            // }
        });
    }

    setRightPin () {
        let self = this;
        self.rightMostPx = $(self.bar.current).offset().left + self.props.width;
        // console.log("RangeBar setRightPin self.pinLeftPx, rightMostPx =", self.pinLeftPx, self.rightMostPx);
        $(self.pin_right.current).draggable({
            "axis": "x",
            "containment": [self.pinLeftPx, 0, self.rightMostPx, 0], //left, up, right, down
            "drag": function (event, ui) {
                self.pinRightPx = $(self.pin_right.current).offset().left;
                self.pinLeftPx = $(self.pin_left.current).offset().left;
                $(self.bar.current).find(".rangeSpan").css({
                    "width" : self.pinRightPx - self.pinLeftPx
                });
                self.setLeftPin();
                self.setState({
                    maxValue : ((self.pinRightPx - self.leftMostPx)  * self.valuePerPx + self.props.minValue) > self.props.maxValue ? self.props.maxValue : Math.ceil((self.pinRightPx - self.leftMostPx)  * self.valuePerPx + self.props.minValue)
                })
            },
            // Optional approach: update result instantaneously, and remove "submit" button
            // "stop": function( event, ui ) {
            //     let obj = {
            //         "title" : "EXPECTATION",
            //         "v" : {
            //             max : self.state.maxValue,
            //             min : self.state.minValue,
            //         }
            //     }
            //     self.props.onpick(obj);
            // }
        });
    }

    submitRange(){
        let obj = {
            "title" : "EXPECTATION",
            "v" : {
                max : this.state.maxValue,
                min : this.state.minValue,
            }
        }
        this.props.onpick(obj);
    }

    render() {
        return (
            <div className="FilterBar row">
                <div className="col-2 col-md-2 col-lg-2 col-xl-2">
                    <b className="FilterTitle">{this.props.title}</b>
                </div>
                <div className="col-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="RangeBar" style={{width: this.props.width + 40}}>
                        <div className="bar" ref={this.bar} style={{width: this.props.width}}>
                            <b id="pin_left" className="pin_left" ref={this.pin_left} style={{left: 0}}>
                                <u>{this.state.minValue}</u>
                            </b>
                            <b id="pin_right" className="pin_right" ref={this.pin_right} style={{left: this.props.width}}>
                                <u>{this.state.maxValue}</u>
                            </b>
                            <span className="rangeSpan" style={{width:this.props.width}}></span>
                        </div>
                        <div className="scale"  ref={this.scale}>
                            {this.showIs()}
                        </div>
                    </div>
                </div>
                <div className="col-2 col-md-4 col-lg-5 col-xl-6">
                    <input type="button" className="btn btn-success submitRange btn-sm" value="Submit" onClick={this.submitRange.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default RangeBar;
import React from "react";
import DataBox from "./DataBox";
import { CSSTransition} from 'react-transition-group';

class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cur_page : 1,
            start_num : 1,
            itemNumPerPage : 50,
            transition: true,
        }
        this.groupNum = 9;
        this.totalPageNum = Math.ceil(this.props.data.length / this.state.itemNumPerPage);
        console.log("Pagination constructor this.state.totalPageNum =", this.props.data.length, this.state.itemNumPerPage,this.totalPageNum);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.totalPageNum = Math.ceil(nextProps.data.length / this.state.itemNumPerPage);
        if(this.props != nextProps){
            console.log("Pagination componentWillUpdate for Props change, nextProps/this.totalPageNum/nextState =", nextProps, this.totalPageNum, nextState);
        } else if(this.state != nextState){
            console.log("Pagination componentWillUpdate for state change, nextProps/this.totalPageNum/nextState =", nextState, this.totalPageNum, nextState);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("Pagination componentWillReceiveProps, nextProps =", nextProps);
        if(nextProps.data.length < (this.state.cur_page - 1) * this.state.itemNumPerPage + 1){
            this.setState({
                ...this.state,
                cur_page : 1,
            })
        }
    }

    changePage(page){
        if(page == null || page == this.state.cur_page){
            return null;
        }
        let start;
        if( page < this.groupNum ){
            start = 1;
        } else if (page < (this.totalPageNum - this.groupNum + 2)){
            start = page - 2;
        } else{
            start = this.totalPageNum - this.groupNum;
        }
        console.log("changePage cur_page will be", page);
        this.setState({
            ...this.state,
            cur_page : page,
            start_num : start,
            transition: !this.state.transition,
        })
    }

    createPages(){
        if(!this.totalPageNum){
            return ;
        }
        let arr = [];
        let ttlPgNum = this.totalPageNum;
        let prePage = (this.state.cur_page-1) > 0 ? (this.state.cur_page-1) : 1;
        arr.push(<li className="pageItem" key={0} onClick={this.changePage.bind(this, prePage)}>Prev</li>)
        if(ttlPgNum < 15){
            for(let page = 1 ; page <= ttlPgNum; page++){
                arr.push(<li key={page} onClick={this.changePage.bind(this, page)} className={this.state.cur_page == page ? "active pageItem" : "pageItem"}>{page}</li>)
            }
        } else {
            if(ttlPgNum - this.state.start_num - 1 > this.groupNum){
                if(this.state.start_num + 2 >= this.groupNum){
                    arr.push(<li className="pageItem" key={1} onClick={this.changePage.bind(this, 1)}>1</li>)
                    arr.push(<li className="pageItem" key={-2} onClick={this.changePage.bind(this, null)}>...</li>)
                }
                for(let page = this.state.start_num; page <= (this.state.start_num + this.groupNum - 1); page++){
                    arr.push(<li key={page} onClick={this.changePage.bind(this, page)} className={this.state.cur_page == page ? "active pageItem" : "pageItem"}>{page}</li>)
                }
                arr.push(<li className="pageItem" key={-3} onClick={this.changePage.bind(this, null)}>...</li>)
                arr.push(<li key={ttlPgNum-1} onClick={this.changePage.bind(this, ttlPgNum-1)} className={this.state.cur_page == ttlPgNum-1 ? "active pageItem" : "pageItem"}>{ttlPgNum-1}</li>)
                arr.push(<li key={ttlPgNum} onClick={this.changePage.bind(this, ttlPgNum)} className={this.state.cur_page == ttlPgNum ? "active pageItem" : "pageItem"}>{ttlPgNum}</li>)
            } else {
                arr.push(<li className="pageItem" key={1} onClick={this.changePage.bind(this, 1)}>1</li>)
                arr.push(<li className="pageItem" key={-4} onClick={this.changePage.bind(this, 1)}>...</li>)
                for(let page = this.state.start_num; page <= ttlPgNum; page++){
                    arr.push(<li key={page} onClick={this.changePage.bind(this, page)} className={this.state.cur_page == page ? "active pageItem" : "pageItem"}>{page}</li>)
                }
            }
        }

        let nextPage = (this.state.cur_page + 1) > ttlPgNum ? ttlPgNum : this.state.cur_page+1;
        arr.push(<li className="pageItem" key={-1} onClick={this.changePage.bind(this, nextPage)}>Next</li>)

        return arr;
    }

    dropdownHandler(itemNumPerPage){
        this.totalPageNum = Math.ceil(this.props.data.length / itemNumPerPage);

        let newChild = document.createElement('span');
        newChild.innerText = itemNumPerPage;
        // let ddBtn = document.querySelector("button#dropdownMenu1")
        let ddBtn = document.querySelector("button#dropdownMenuButton");
        ddBtn.replaceChild(newChild, ddBtn.firstChild);
console.log("Pagination: setting itemNumPerPage/ddBtn =", itemNumPerPage, ddBtn);
        this.setState({
            cur_page : 1,
            start_num : 1,
            itemNumPerPage : itemNumPerPage
        })
    }

    showDataA(){
        if(this.state.transition){
            return <DataBox data={this.props.data.slice((this.state.cur_page-1)*this.state.itemNumPerPage,(this.state.cur_page)*this.state.itemNumPerPage)}></DataBox>
        } else {
            return null;
        }
    }

    showDataB(){
        if(!this.state.transition){
            return <DataBox data={this.props.data.slice((this.state.cur_page-1)*this.state.itemNumPerPage,(this.state.cur_page)*this.state.itemNumPerPage)}></DataBox>
        } else {
            return null;
        }
    }

    render () {
        return (
            <div id="pagination">
                <CSSTransition timeout={1000} classNames="fadeRtg" in={this.state.transition} key="1" appear={true} unmountOnExit>
                    {this.showDataA.bind(this)}
                </CSSTransition>
                <CSSTransition timeout={1000} classNames="fadeRtg" in={!this.state.transition} key="2" appear={true} unmountOnExit>
                    {this.showDataB.bind(this)}
                </CSSTransition>
                <div id="pagination_main">
                    {/*<div className="dropdown">*/}
                    {/*    <span>Rows per page </span>*/}
                    {/*    <button type="button" className="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">*/}
                    {/*        <span>50</span><span className="caret"></span>*/}
                    {/*    </button>*/}
                    {/*    <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">*/}
                    {/*        <li>*/}
                    {/*            <a tabIndex="-1" href="#" onClick={this.dropdownHandler.bind(this,50)}>50</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a tabIndex="-1" href="#" onClick={this.dropdownHandler.bind(this,100)}>100</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a tabIndex="-1" href="#" onClick={this.dropdownHandler.bind(this,200)}>200</a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    <div className="dropdown">
                        <span>Rows per page </span>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>50</span><span className="caret"></span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#" onClick={this.dropdownHandler.bind(this,50)}>50</a>
                            <a className="dropdown-item" href="#" onClick={this.dropdownHandler.bind(this,100)}>100</a>
                            <a className="dropdown-item" href="#" onClick={this.dropdownHandler.bind(this,200)}>200</a>
                        </div>
                    </div>

                    <ul id="pagination_pages">
                        {this.createPages()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Pagination;

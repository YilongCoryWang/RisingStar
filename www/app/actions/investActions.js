export const fetchInitFilter = ()=>{return function (dispatch, getState) {
    // $.get("./api/filters.json", function (initfilters) {
    //     // console.log("FETCHINITFILTER =", data)
    //     dispatch({"type" : "FETCHINITFILTER", "initfilters" : initfilters});
    // })
    console.log("fetchInitFilter getState().investReducer =", getState().investReducer);
    dispatch({"type" : "FETCHINITFILTER"});
}};

export const fetchData = ()=>{return function (dispatch) {
    $.post("./api", {"filter" : "[]"}, function (data) {
        console.log("FETCHDATA =", data.results);
        console.log("FETCHDATA typeof(data.results) =", typeof(data.results) );
        dispatch({"type" : "FETCHDATA", data : data.results});
    })
}};

// export const addFilters = (obj)=>{return {"type" : "ADDFILTERS", obj : obj}};
export const addFilters = (obj)=>{return (dispatch, getState)=>{
    //此时activeFilter为数组，里面的项目是json
    //必须用concat而不能用push，因为concat不会影响原array；而是用push则会产生两个state.activeFilters
    let activeFilter = getState().investReducer.activeFilters.concat([obj]);
    // let arr = ["a", "b"];
    // console.log("addFilters typeof(arr) =", typeof(arr), arr); // array被typeof认为是object
    // console.log("addFilters typeof(activeFilter) =", typeof(activeFilter), activeFilter);
    $.ajax({
        "url" : "/api",
        "data" : {"filter" : JSON.stringify(activeFilter)}, // POST请求要求参数形式为K/V对
        "type" : "post",
        "success" : function(data){
            console.log("addFilters obj/return datalength =", obj, data.results.length);
            dispatch({"type" : "ADDFILTERS", obj, data : data.results});
        }
    });
}};

// export const delItem = (title)=>{return {"type" : "DELITEM", "title" : title}};
// 把上面的从本地文件读取，换成下面从Node server读取
export const delItem = (obj)=>{return (dispatch, getState)=>{
    let activeFilter = getState().investReducer.activeFilters.filter(function (item) {
        // console.log("delItem item.title =", item.title)
        // console.log("delItem obj =", obj)
        return item.title != obj;
    });
    // console.log("delItem activeFilter =", activeFilter);
    $.ajax({
        "url" : "/api",
        "data" : {"filter" : JSON.stringify(activeFilter)}, // POST请求要求参数形式为K/V对
        "type" : "post",
        "success" : function(data){
            console.log("delItem success, data =", data)
            dispatch({"type" : "DELITEM", obj, data});
        }
    });
}};

export const changeTableColumn = (tableCol)=>{return (dispatch, getState)=>{
    console.log("changeTableColumn tableCol =", tableCol, typeof tableCol);
    dispatch({"type" : "CHANGETABLECOLUMN", tableCol});
}};
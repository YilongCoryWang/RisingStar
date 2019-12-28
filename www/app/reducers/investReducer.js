let d1 = new Date();
let d2 = new Date(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * 180);

let initState = {
    "filters" : {
        "university" : ["UTS" , "USYD" , "UNSW" , "MU"],
        "industry"  : ["Website" , "AI" , "Big Data" , "Smartphone App"],
        "expectation" : {"min" : 100 , "max" : 7800},
        "duration" : {
            "year_start" : d1.getFullYear(),
            "month_start" : d1.getMonth() + 1,
            "day_start" : d1.getDate(),
            "year_end" : d2.getFullYear(),
            "month_end" : d2.getMonth() + 1,
            "day_end" : d2.getDate()
        },
    },
    "activeFilters" : [
        // {"title" : "", "v": []},
        // {"title" : "", "v": []}
    ],
    "tableCol" : [
        {"fieldname" : "PID" , "show" : true},
        {"fieldname" : "USERNAME" , "show" : true},
        {"fieldname" : "EMAIL" , "show" : true},
        {"fieldname" : "UNIVERSITY" , "show" : true},
        {"fieldname" : "PROJECTNAME" , "show" : true},
        {"fieldname" : "INDUSTRY" , "show" : true},
        {"fieldname" : "EXPECTATION" , "show" : true},
        {"fieldname" : "PROJECT_START_DATE" , "show" : false},
        {"fieldname" : "PROJECT_END_DATE" , "show" : false},
        {"fieldname" : "FUND_RAISED" , "show" : false},
        {"fieldname" : "MIN_INVEST" , "show" : false},
        {"fieldname" : "MAX_INVEST" , "show" : false},
        {"fieldname" : "RETURN_RATE" , "show" : false},
        {"fieldname" : "CREDIT" , "show" : false},
    ],
    "data" : [],
    "filtedData" : [],
}

export default (state = initState, action)=>{
    switch (action.type) {
        case "FETCHINITFILTER":
            return {
                ...state,
                "filters" : initState.filters
            }
        case "ADDFILTERS":
            // console.log("ADDFILTERS", action.obj.title, action.obj.v);
            console.log("ADDFILTERS =", action.obj.title, action.obj.v, action.data);
            return {
                ...state,
                // "data" : action.data,
                "filtedData" : action.data,
                "activeFilters" : [
                    ...state.activeFilters,
                    {
                        "title" : action.obj.title,
                        "v" : action.obj.v
                    },
                ]
            }
        case "DELITEM": //delete filter from activeFilter bar
            var arr = state.activeFilters.filter(function (item) {
                console.log("investReducer.js action, item.title =", action, item.title)
                return action.obj !== item.title
            })
            console.log("investReducer.js action.data.results =", action.data.results);
            return {
                ...state,
                "activeFilters" : arr,
                // data : action.data.results
                "filtedData" : action.data.results
            }
        case "FETCHDATA":
            // console.log("FETCHDATA =", action.data.length)
            return {
                ...state,
                "data" : action.data,
            }
        case "CHANGETABLECOLUMN":
            let newTableCol = [
                {"fieldname" : "PID" , "show" : action.tableCol["PID"]},
                {"fieldname" : "USERNAME" , "show" : action.tableCol["USERNAME"]},
                {"fieldname" : "EMAIL" , "show" : action.tableCol["EMAIL"]},
                {"fieldname" : "UNIVERSITY" , "show" : action.tableCol["UNIVERSITY"]},
                {"fieldname" : "PROJECTNAME" , "show" : action.tableCol["PROJECTNAME"]},
                {"fieldname" : "INDUSTRY" , "show" : action.tableCol["INDUSTRY"]},
                {"fieldname" : "EXPECTATION" , "show" : action.tableCol["EXPECTATION"]},
                {"fieldname" : "PROJECT_START_DATE" , "show" : action.tableCol["PROJECT_START_DATE"]},
                {"fieldname" : "PROJECT_END_DATE" , "show" : action.tableCol["PROJECT_END_DATE"]},
                {"fieldname" : "FUND_RAISED" , "show" : action.tableCol["FUND_RAISED"]},
                {"fieldname" : "MIN_INVEST" , "show" : action.tableCol["MIN_INVEST"]},
                {"fieldname" : "MAX_INVEST" , "show" : action.tableCol["MAX_INVEST"]},
                {"fieldname" : "RETURN_RATE" , "show" : action.tableCol["RETURN_RATE"]},
                {"fieldname" : "CREDIT" , "show" : action.tableCol["CREDIT"]},
            ];
            return {
                ...state,
                "tableCol" : newTableCol,
            }
        default:
            console.log("investReducer received unrecognized action.type =", action.type);
            break;
    }

    return state;
}
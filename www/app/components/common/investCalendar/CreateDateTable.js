const lastMonth = [24,25,26,27,28,29,30,31,32];
const thisMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
const nextMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13];

//得到某年某月第一天星期几
function firstDayDay(year,month){
    return (new Date(year,month - 1,1)).getDay();
}

//得到某年某月上一个月共多少天
function getPrevMonthAllDays(year,month){
    //原理用这个月的1号0点0分减去1毫秒，看看那天的日子
    return (new Date(new Date(year , month - 1 , 1) - 1)).getDate();
}

//得到某年某月共多少天
function getMonthAllDays(year,month){
    if(month == 12){
        return (new Date(new Date(year + 1, 0 , 1) - 1)).getDate();
    }else{
        return (new Date(new Date(year, month , 1) - 1)).getDate();
    }
}

function CreateDateTable(year, month){
    var lst = [];
    var cur = [];
    var nxt = [];

    var prevMonthDays = getPrevMonthAllDays(year, month);
    var lstMonthDays = firstDayDay(year,month);
    let start = lastMonth.indexOf(prevMonthDays - lstMonthDays + 1);
    let end = lastMonth.indexOf(prevMonthDays) + 1;

    lst = lastMonth.slice(start, end);
    cur = thisMonth.slice(0, getMonthAllDays(year,month) );
    nxt = nextMonth.slice(0, 42 - lst.length - cur.length);

    return {
        "lastMonth" : lst,
        "thisMonth" : cur,
        "nextMonth" : nxt,
    }
}

export default CreateDateTable;
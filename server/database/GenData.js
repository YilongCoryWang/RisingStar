var _ = require("underscore");

var results = [];
for(var i = 1 ; i <= 1000 ; i++){
	let t = _.random(100,7800);
	let d = _.random(0,t);
	let n = t - d;

	let y_start = _.sample(["2019", "2020","2021"],1)[0];
	let y_end = _.sample(["2020","2021","2022"],1)[0];
	let m = _.sample([1,2,3,4,5,6,7,8,9],1)[0];
	let dd = _.random(10,28);

	results.push(
		{
			"PID" : i,
			"USERNAME" : "cory_wng" + i,
			"EMAIL": "abc_"+ i +"@company.com",
			"UNIVERSITY" : _.sample(["UTS" , "USYD" , "UNSW" , "MU"],1)[0],
			"PROJECTNAME" : _.sample(["Contact Manager" , "HouseShare" , "AnywhereNews" , "Self-drive"],1)[0],
			"INDUSTRY" : _.sample(["Website" , "Big Data" , "Smartphone App" , "AI"],1)[0],
			"EXPECTATION" : t,
			"PROJECT_START_DATE" : y_start + "-0" + m + "-" + dd,
			"PROJECT_END_DATE" : y_end + "-0" + m + "-" + dd,
			"FUND_RAISED" : d,
			"MIN_INVEST" : 100,
			"MAX_INVEST" : n,
			"RETURN_RATE" : "11.17",
			"CREDIT" : 6,
			"DESCRIPTION" : "",
		}
	)
}

var json = JSON.stringify( {"results" : JSON.stringify(results)} );
var fs = require("fs");
fs.writeFile("./database.json",json,function(){

})
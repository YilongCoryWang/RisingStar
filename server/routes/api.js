import express from "express";
import formidable from "formidable";
import Investment from "../models/investment";
// import fs from "fs";

let router = express.Router();

router.post("/", function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("Server received", fields);
        let filtersObj = JSON.parse(fields.filter);

        Investment.find({}, function (err, data) {
            if(err){
                console.log("Server app.js readFile err=", err);
                return;
            }
            filtersObj.forEach(function (this_filter) {
                // console.log("this_filter.title =", this_filter.title)
                if(this_filter.title == "UNIVERSITY"){
                    data = data.filter(function (item) {
                        // console.log("filtersobj.forEach",item);
                        return this_filter.v.indexOf(item.UNIVERSITY) != -1;
                    })
                }
                else if(this_filter.title == "INDUSTRY"){
                    data = data.filter(function (item) {
                        return this_filter.v.indexOf(item.INDUSTRY) != -1;
                    })
                }
                else if(this_filter.title == "DURATION"){
                    let start = new Date(this_filter.v.year_start, this_filter.v.month_start - 1, this_filter.v.day_start);
                    let end = new Date(this_filter.v.year_end, this_filter.v.month_end - 1, this_filter.v.day_end);
                    data = data.filter(function (item) {
                        let d1 = new Date(item.PROJECT_START_DATE);
                        let d2 = new Date(item.PROJECT_END_DATE);
                        // console.log("DURATION d1/d2 =", d1, d2);
                        return (d1 >= start) && (d2 <= end);
                    })
                }
                else if(this_filter.title == "EXPECTATION") {
                    data = data.filter(function (item) {
                        // console.log(item.EXPECTATION)
                        return (this_filter.v.min < item.EXPECTATION) && (this_filter.v.max > item.EXPECTATION)
                    })
                }
            })
            res.json({"results" : data});
        });
    })
})

export default router;
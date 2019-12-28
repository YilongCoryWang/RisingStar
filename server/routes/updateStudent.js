import express from "express";
import formidable from "formidable";
import Investment from "../models/investment";

let router = express.Router();

router.post("/", function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        let invest = {};
        invest.USERNAME = fields.username;
        invest.EMAIL = fields.email;
        invest.UNIVERSITY = fields.university;
        invest.PROJECTNAME = fields.project_name;
        invest.INDUSTRY = fields.industry;
        invest.EXPECTATION = fields.investment_amount;
        invest.PROJECT_START_DATE = fields.Date_start;
        invest.PROJECT_END_DATE = fields.Date_end;
        invest.DESCRIPTION = fields.project_description;
        invest.FUND_RAISED = 446;
        invest.MIN_INVEST = 100;
        invest.MAX_INVEST = 207,
        invest.RETURN_RATE = "11.17";
        invest.CREDIT = 6;

        console.log("Server is updating student =", fields.username, invest);
        Investment.findInvestmentByUsername(fields.username, function (err, investments) {
            if(investments.length > 0) {
                Investment.updateOne({"USERNAME":fields.username}, invest, function (err) {
                    console.log("Investment.updateOne, err", err);
                    if(err){
                        console.log("updating student failed, err =", err);
                        res.json({"result": -1}); // Internal Server Error
                        return;
                    }
                    console.log("updating student successful.");
                    res.json({"result": 1}); // update successful
                    return;
                });
            } else {
                Investment.count({}, (err, count) => {
                    if (err) {
                        console.log("updating student failed, err =", err);
                        res.json({"result": -1}); // Internal Server Error
                        return;
                    }
                    invest.PID = count + 1;
                    console.log("Saving new project:", invest);
                    new Investment(invest).save();
                    res.json({"result": 1}); // succeed!
                    return;
                })
            }
        });
    })
})

export default router;
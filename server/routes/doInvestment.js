import express from "express";
import formidable from "formidable";
import Investor from "../models/investor";

let router = express.Router();

router.post("/", function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {

        console.log("investor.updateOne, fields.username, fields.pid =", fields.username, fields.pid);

        Investor.findInvestorByUsername(fields.username, function (err, documents) {
            if(err){
                console.log("Investor.findInvestorByUsername err =", err);
                return;
            }
            let project_invested = documents[0].project_invested;
            project_invested.push(fields.pid);
            // console.log("Investor.findInvestorByUsername project_invested =", project_invested);
            Investor.updateOne({"username":fields.username}, {project_invested : project_invested}, function (err) {
                if(err){
                    console.log("doInvestment, update investor, err =", err);
                    res.json({
                        "result" : -1 //Database error
                    });
                    return;
                }
                res.json({
                    "result" : 1 //succeed
                });
            });
        });

    })
})

export default router;
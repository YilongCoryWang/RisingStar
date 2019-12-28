import express from "express";
import formidable from "formidable";
import Investor from "../models/investor";

let router = express.Router();

router.post("/", function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let investor = {};
        investor.email = fields.email;
        investor.phone = fields.phone;
        investor.address1 = fields.address1;
        investor.address2 = fields.address2;
        investor.city = fields.city;
        investor.state = fields.state;
        investor.zip = fields.zip;
        investor.total_funds = fields.total_funds;

        console.log("Server is updating investor =", fields.username);

        Investor.updateOne({"username":fields.username}, investor, function (err) {
            if(err){
                console.log("updateInvestor, err =", err);
                res.json({
                    "result" : -1 //Database error
                });
                return;
            }
            res.json({
                "result" : 1 //succeed
            });
        });
    })
})

export default router;
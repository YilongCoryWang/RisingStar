import express from "express";
import formidable from "formidable";
import Student from "../models/student";
import Investor from "../models/investor";
import Investment from "../models/investment";
import crypto from "crypto";
import jwtSecret from "../jwtSecret";
import jwt from 'jsonwebtoken';

let router = express.Router();

router.post("/", function(req, res) {
    console.log("login post received!");
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("Server received login info =", fields);

        if(fields.userType == "student") {
            Student.findStudentByUsername(fields.username, function (err, docs) {
                if (err) {
                    console.log("login student failed: database find err =", err);
                    res.json({"result": -1}); // Internal Server Error
                    return;
                }

                let encryptedPassword = crypto.createHash("sha256").update(fields.password).digest("hex");
                if (docs.length == 0) {
                    console.log("login student failed: user not exist!");
                    res.json({"result": 0}); //Unauthorized: user not exist
                } else if (encryptedPassword === docs[0].password) {
                    console.log("login student successful. docs[0].password =", docs[0].password);
                    const token = jwt.sign({
                        username: docs[0].username,
                    }, jwtSecret.jwtSecret);

                    Investment.findInvestmentByUsername(fields.username, (err, investments) => {
                        if (err) {
                            console.log("login student failed. db error with username =", fields.username);
                            res.json({
                                "result": -3,
                            });
                            return;
                        }
                        if (investments.length > 0) {
                            console.log("login student succeed for username =", fields.username);
                            res.json({
                                "result": 1,
                                "token": {token},
                                "investment_details": investments,
                            }); //login succeed
                        } else {
                            console.log("login student succeed. project not found for username =", fields.username);
                            res.json({
                                "result": 2,
                                "token": {token},
                            }); //login succeed
                        }
                    });
                } else {
                    console.log("login student failed: wrong password! docs[0].password =", docs[0].password);
                    res.json({"result": -2}); //Unauthorized:wrong password
                }
            })
        }else if(fields.userType == "investor"){
            Investor.findInvestorByUsername(fields.username, function (err, docs) {
                if (err) {
                    console.log("login investor failed: database find err =", err);
                    res.json({"result": -1}); // Internal Server Error
                    return;
                }

                let encryptedPassword = crypto.createHash("sha256").update(fields.password).digest("hex");
                if (docs.length == 0) {
                    console.log("login investor failed: user not exist!");
                    res.json({"result": 0}); //Unauthorized: user not exist
                } else if (encryptedPassword === docs[0].password) {
                    // console.log("login investor successful. docs[0].password =", docs[0].password);
                    const token = jwt.sign({
                        username: docs[0].username,
                    }, jwtSecret.jwtSecret);
                    console.log("login investor successful. docs[0].project_invested =", docs[0].project_invested);
                    Investment.find({PID: {$in: docs[0].project_invested}}, function (err, investments) {
                        if(err){
                            console.log("login investor find PID err =", err);
                            res.json({"result": -1}); // Internal Server Error
                            return;
                        }
                        res.json({
                            "result"            : 1,
                            "token"             : {token},
                            "email"             : docs[0].email,
                            "phone"             : docs[0].phone,
                            "address1"          : docs[0].address1,
                            "address2"          : docs[0].address2,
                            "city"              : docs[0].city,
                            "state"             : docs[0].state,
                            "zip"               : docs[0].zip,
                            "total_funds"       : docs[0].total_funds,
                            "project_invested"  : investments,
                        }); //login successful
                    });
                } else {
                    res.json({
                        "result"            : -2, //wrong password
                        "token"             : {},
                    });
                }
            })
        } else {
            console.log("Server received unknown user type:", fields.userType);
        }
    });
})

export default router;
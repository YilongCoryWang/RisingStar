import express from "express";
import formidable from "formidable";
import Student from "../models/student";
import Investor from "../models/investor";
import crypto from "crypto";
import jwtSecret from "../jwtSecret";
import jwt from 'jsonwebtoken';

let router = express.Router();

router.post("/", function(req, res) {
    console.log("signup post received!");
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("Server received signup info =", fields);
        if( !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(fields.username) ) {
            console.log("Signup failed: username invalid.");
            res.json({"result" : -2}); //username invalid
            return;
        }
        if(fields.userType == "student"){
            Student.findStudentByUsername(fields.username, function (err, docs) {
                if(err){
                    console.log("Mongoose find err =", err);
                    res.json({"result" : -1}); //database err
                    return;
                }
                //add new user into database
                if(docs.length == 0){
                    if( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(fields.password) ){
                        console.log("Signup failed: weak password.");
                        res.json({"result" : -3}); //weak password
                        return;
                    }
                    let newStudent = new Student( {
                        username : fields.username,
                        password : crypto.createHash("sha256").update(fields.password).digest("hex"),
                    } );
                    newStudent.save(function (err) {
                        if (err) {
                            console.log("Signup failed: save new student err =", err);
                            return;
                        }
                        console.log("Signup succeed: save new student successfully!");
                        const token = jwt.sign({
                            username: fields.username,
                        }, jwtSecret.jwtSecret);
                        res.json({
                            "result" : 1,
                            "token": {token}
                        }); //success
                    });
                } else {
                    console.log("Signup failed: user name exist, try a new name.");
                    res.json({"result" : 0}); //duplicate username
                }
            })
        } else if(fields.userType == "investor"){
            Investor.findInvestorByUsername(fields.username, function (err, docs) {
                if(err){
                    console.log("Mongoose find err =", err);
                    res.json({"result" : -1}); //database err
                    return;
                }
                //add new user into database
                if(docs.length == 0){
                    if( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(fields.password) ){
                        console.log("Signup failed: weak password.");
                        res.json({"result" : -3}); //weak password
                        return;
                    }
                    let newInvestor = new Investor( {
                        username : fields.username,
                        password : crypto.createHash("sha256").update(fields.password).digest("hex"),
                    } );
                    newInvestor.save(function (err) {
                        if (err) {
                            console.log("Signup failed: save new student err =", err);
                            return;
                        }
                        console.log("Signup succeed: save new student successfully!");
                        const token = jwt.sign({
                            username: fields.username,
                        }, jwtSecret.jwtSecret);
                        res.json({
                            "result" : 1,
                            "token": {token},
                        }); //success
                    });
                } else {
                    console.log("Signup failed: user name exist, try a new name.");
                    res.json({"result" : 0}); //duplicate username
                }
            })
        }
    });
})

export default router;
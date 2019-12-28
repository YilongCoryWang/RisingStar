import mongoose from 'mongoose';
import express from "express";
import history from "connect-history-api-fallback";
import api from "./routes/api";
import login from "./routes/login";
import signup from "./routes/signup";
import updateStudent from "./routes/updateStudent";
import updateInvestor from "./routes/updateInvestor";
import doInvestment from "./routes/doInvestment";

mongoose.connect('mongodb://localhost/P2P', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log('We\'re connected!');

        app.use(express.static("./www")).use(history()).listen(3000, function (err) {
            if(!err){
                console.log("Node server is listening at port 3000...")
            }
        })
    }
);

let app = express();
app.use("/api", api);
app.use("/login", login);
app.use("/signup", signup);
app.use("/updateStudent", updateStudent);
app.use("/updateInvestor", updateInvestor);
app.use("/doInvestment", doInvestment);

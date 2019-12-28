import mongoose from "mongoose";

let investmentSchema = new mongoose.Schema({
    "PID" : Number,
    "USERNAME" : String,
    "EMAIL" : String,
    "UNIVERSITY" : String,
    "PROJECTNAME" : String,
    "INDUSTRY" : String,
    "EXPECTATION" : String,
    "PROJECT_START_DATE" : String,
    "PROJECT_END_DATE" : String,
    "FUND_RAISED" : String,
    "MIN_INVEST" : String,
    "MAX_INVEST" : String,
    "RETURN_RATE" : String,
    "CREDIT" : String,
    "DESCRIPTION" : String
});

investmentSchema.statics.findInvestmentByUsername = function(username, callback) {
    return this.find({ "USERNAME": username }, callback);
}

investmentSchema.methods.findInvestmentByUsername = function(username, callback) {
    return this.model("Investment").find({ "USERNAME": this.username }, callback);
}

let Investment = mongoose.model("Investment", investmentSchema);

export default Investment;
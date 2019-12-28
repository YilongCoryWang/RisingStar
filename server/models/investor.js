import mongoose from "mongoose";

let investorSchema = new mongoose.Schema({
    "username"          : String,
    "password"          : String,
    "email"             : String,
    "phone"             : String,
    "address1"          : String,
    "address2"          : String,
    "city"              : String,
    "state"             : String,
    "zip"               : String,
    "total_funds"       : String,
    "project_invested"  : [Number],
});

//static methods
investorSchema.statics.findInvestorByUsername = function(username, callback) {
    return this.find({ "username": username }, callback);
}

//instance methods
investorSchema.methods.findInvestorByUsername = function(username, callback) {
    return this.model("Investor").find({ "username": this.username }, callback);
}

let Investor = mongoose.model("Investor", investorSchema);

export default Investor;
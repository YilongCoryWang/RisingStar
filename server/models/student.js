import mongoose from "mongoose";

let studentSchema = new mongoose.Schema({
    "username"      : String,
    "password"      : String,
});

//static methods
studentSchema.statics.findStudentByUsername = function(username, callback) {
    return this.find({ "username": username }, callback);
}

//instance methods
studentSchema.methods.findStudentByUsername = function(username, callback) {
    return this.model("Student").find({ "username": this.username }, callback);
}

let Student = mongoose.model("Student", studentSchema);

export default Student;

var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    time: Date
});

module.exports ={
    userSchema
}
const schemas = require('./schema')
var mongoose = require("mongoose");

const userModel = mongoose.model('user',schemas.userSchema);

module.exports={
    userModel
}

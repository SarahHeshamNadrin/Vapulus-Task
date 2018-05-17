var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var users = new Schema({
  _id: Schema.Types.ObjectId,
  authorization:String,
  deviceToken:String,
  fingerPrint:String,
  name:String,
});


mongoose.model("users",users);
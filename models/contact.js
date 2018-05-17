var mongoose = require("mongoose")
var mongoose_paginate = require("mongoose-paginate")

var Schema = mongoose.Schema;

var contacts = new Schema({
  _id:Schema.Types.ObjectId,
  firstName:String,
  lastName:String,
  mobileNumber:Number,
  email:String,
  userID:{type:Schema.Types.ObjectId, ref:"users"}
});
contacts.plugin(mongoose_paginate);
mongoose.model("contacts",contacts)
var express = require("express");
var fs = require("fs");
var path = require('path');
var mongoose = require("mongoose");
var flash = require("connect-flash");
var bodyParser = require("body-parser");

var server = express();

fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});

mongoose.connect("mongodb://localhost:27017/contacts");


var usersRouter = require("./controllers/users")
server.use("/users",usersRouter);

var contactsRouter = require("./controllers/contacts")
server.use("/contacts",contactsRouter)


server.listen(9090,function(){
   console.log("Starting Server");
});

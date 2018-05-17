var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model("users");


var checkUniqueUserMid = function(request,response,next)
{
    console.log(request.body)
    UserModel.find({authorization:request.body.authorization,deviceToken:request.body.deviceToken,fingerPrint:request.body.fingerPrint},function(err,data){
        if(!err)
        {
            response.json("User is already found with the same data.")
            
        }
        else
        {
            next();
        }
    })
   
}

var addUser = function(request,response){

    var user = new UserModel({
        _id: new mongoose.Types.ObjectId,
        authorization:request.body.authorization,
        deviceToken:request.body.deviceToken,
        fingerPrint:request.body.fingerPrint,
        name:request.body.name
       })
       user.save(function(err,doc){
           if(!err)
           {
               response.json(doc);
               console.log("User Saved Successfully");
           }
           else
           {
               response.json(err)
           }
       })



}



router.post("/add",urlEncodedMid,checkUniqueUserMid,addUser);




module.exports = router;
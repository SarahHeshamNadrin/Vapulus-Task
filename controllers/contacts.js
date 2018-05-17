var express = require("express")
var router = express.Router()
var bodyparser = require("body-parser")
var validator = require('validator');
var urlencodedMid = bodyparser.urlencoded({extended:true})
var mongoose = require("mongoose")
var UserModel = mongoose.model("users")
var ContactModel = mongoose.model("contacts")


var Authorize = function(request,response,next)
{
    UserModel.find({authorization:request.body.authorization,deviceToken:request.body.deviceToken,
    fingerPrint:request.body.fingerPrint},function(err,data){
        if(data.length != 0)
        {  
            request.body.userID = data[0].id;
            next();
        }
        else
        {
            response.json("Access is denied for this user.")
        }
    });

}
var validateInputs = function(request,response,next)
{
    var err_arr= []
    if(!validator.isEmail(request.body.email))
    {
         err_arr.push("Email is invalid")
    }
    if(!validator.isMobilePhone(request.body.mobile,'ar-EG'))
    {
        err_arr.push("Mobilephone is invalid")
    }
    if(!validator.isAlpha(request.body.firstName))
    {
        err_arr.push("Firstname is invalid string")
    }
    if(!validator.isAlpha(request.body.lastName))
    {
        err_arr.push("Lastname is invalid string")
    }

    if(err_arr.length != 0)
    {
        response.json(err_arr)
    }
    else
    {
        next();
    }
}
var addContact = function(request,response)
{
    
    var contact = new ContactModel({
        _id:new mongoose.Types.ObjectId,
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        mobileNumber:request.body.mobile,
        email:request.body.email,
        userID:request.body.userID
    })
   
    contact.save(function(err,doc){
        if(!err)
        {
            response.json(doc)
            console.log("Contact is added Successfly.")
        }
        else
        {
            response.json(err)
        }
    })
}

var getUserContacts = function(request,response)
{
    ContactModel.paginate({userID:request.body.userID},{page:request.body.pageNum,limit:3},function(err,data){
        if(!err)
        {
            response.json(data)
        }

    })
}

var getRecentContacts = function(request,response)
{
    ContactModel.find({}).sort([['_id','desc']]).limit(5).exec(function(err,data){
        if(!err)
        {
            response.json(data)
        }

    })

}
router.post("/getRecentList",urlencodedMid,Authorize,getRecentContacts)
router.post("/getList",urlencodedMid,Authorize,getUserContacts)
router.post("/add",urlencodedMid,Authorize,validateInputs,addContact)

module.exports = router;
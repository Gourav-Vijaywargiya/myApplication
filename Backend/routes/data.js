const express = require('express');
const router = require("express").Router();
const user = require('../models/UserDetails');
const { body, validationResult } = require('express-validator');
const { find } = require('../models/UserDetails');
const connectToMongo = require('../db');
const app = express();
app.use(express.json());



// route for : check if user is already registered or not
router.post('/checkuser', async (req,res)=>{
    console.log(req.body);
    const {email} = req.body;
    console.log(email);
        const User = await user.findOne({email: email});
        console.log(User);
        if(User)
        {
            return res.send({status:true,message:"successfull responsefrom backend"});
        }
        else
        {
            return res.send({status:false})
        }
    })


// Route for: send user data to backend
router.post('/userdetails',async (req,res) =>{
    const body = req.body;
    let User;
    // console.log(body);
    let newUserDetails = {
        id: body.id,
        name : body.name,
        firstName:body.given_name,
        lastName:body.family_name,
        Mobile:body.mobile,
        Gender:body.gender,
        DateofBirth:body.dob,
        image:body.picture,
        aboutme : body.aboutme,
        loginTime:body.loginTime,
        email:body.email
    }
    try{
        // Check whether user with same email  already exists
      User = await user.findOne({email: body.email});
      if(User)
      {
        return res.status(400).json({success,error:"User with this email already exists"});
      }

    User = new user(newUserDetails);
    await User.save();
    }
catch(error)
    {console.error(error.message)
    res.status(500).send("Internal Server Error");
    }
}
)

// Route for: update data in database
router.patch('/updatedata',async (req,res)=>{
    const body = req.body;
    console.log("body is :",body);
    let User;
    let updatedUserDetails = {
        id: body.id,
        name : body.name,
        firstName:body.firstName,
        lastName:body.lastName,
        Mobile:body.Mobile,
        Gender:body.Gender,
        DateofBirth:body.DateofBirth,
        image:body.picture,
        aboutme : body.aboutme
    }

    User = await user.findOne({email: body.email});
    // console.log(User,"user");
    if(User)
    {
    // if(User.email !== body.email) return res.status(401).send("Not allowed");
    User = await user.findOneAndUpdate({email: body.email},{$set : updatedUserDetails});
    await User.save();
    return res.status(200).send("successfull response");
    }
    else{
        console.log("User not found");
        return res.send(404);
    }
})

// Route for: Get users data
router.get('/fetchdata', async (req,res)=>{

    const page = req.query.page || 1;
    const limit = req.query.limit || 2;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalResults = await user.countDocuments();
    
    const User = await user.find().limit(limit).skip(startIndex).exec();
    res.json({User,totalResults});
})


// route for ; get particular user data
router.get('/fetchdata/:email', async (req,res)=>{
console.log(req.params.email);
    const User = await user.findOne({email : req.params.email});
    console.log(User);
    res.json(User);
})






module.exports = router;
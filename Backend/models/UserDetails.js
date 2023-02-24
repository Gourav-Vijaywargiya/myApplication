const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDetailsSchema = new mongoose.Schema({
  id:{
    type: String,
  },
  name: {
    type: String,
  //   required: true,
  },
  firstName: {
    type: String,
  //   required: true,
  },
  lastName: {
    type: String,
  //   required: true,
  },
  email:{
    type:String,
    unique:true,
  //  required: true
    },
    Mobile:{
    type:Number,
    // unique:true
  },
  DateofBirth: {
      type: Date,
    //   required: true,
    },
    Gender: {
      type: String,
    //   required: true,
    },
    loginTime:{
      type:String
    },
    image: {
      type: Buffer,
    },
    aboutme:{
      type: String
    },
    lastlogin:{
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  })

  module.exports = mongoose.model('UserDetails', UserDetailsSchema);
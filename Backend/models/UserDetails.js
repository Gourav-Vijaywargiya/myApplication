const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDetailsSchema = new mongoose.Schema({
  id:{
    type: String,
  },
  name: {
    type: String,
  },
  firstName: {
    type: String,
  //   required: true,
  },
  lastName: {
    type: String,
  },
  email:{
    type:String,
    unique:true,
  //  required: true
    },
    Mobile:{
    type:Number,
  },
  DateofBirth: {
      type: Date,
    },
    Gender: {
      type: String,
    },
    loginTime:{
      type:String
    },
    image: {
      type: String,
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
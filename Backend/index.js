const connectToMongo = require('./db');

const express = require('express');

const session = require('express-session')

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = express();

var cors = require('cors');

const MongoStore = require('connect-mongo'); new (session);


connectToMongo();


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

  app.use(cors({
    origin: 'http://localhost:3001'
  }))


app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:  new MongoStore(({ mongoUrl: process.env.mongoURI })
)}))




app.use('/data',require('./routes/data'));

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})




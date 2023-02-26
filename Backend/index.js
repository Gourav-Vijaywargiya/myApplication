const connectToMongo = require('./db');

const express = require('express');

const session = require('express-session')

const app = express();

var cors = require('cors');

connectToMongo();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

  app.use(cors({
    origin: `${process.env.CLIENT_URL}`
  }))

app.use('/data',require('./routes/data'));

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})




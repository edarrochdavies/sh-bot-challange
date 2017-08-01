
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000))

//ROUTES
app.get('/', function(req,res){
  res.send('Hi I am a chat bot')
})

//Facebook
app.get('/webhook/', function (req,res){
  if (req.query['hub.verify_token'] == "SolutionsStillRock"){
    res.send(req.query['hub.challenge'])
  }
  res.send("Wrong Token")
})

app.listen(app.get('port'), function(){
  console.log("running: port")
})

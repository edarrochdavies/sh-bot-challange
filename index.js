
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000))

//ROUTES
app.get('/', function(req,res){
  res.send('Hi I am a chat bot')
})

let token = "EAAGZCkaJSMrQBAMdJIN7ZC8FXKJo5hyXe9kgRhRLFaI49ME5uZCDXZCo8PMHFJiN5aMtZAPYzO8lRhnWf9eWjXSdzK4u36oYfut9cEJzZB7SNA8ObF64ZBoDrGByayK3jXq87mMINh29avK62BLECY1fpS5iKzJZABfTZBZARDVQaRWwZDZD"

//Facebook
app.get('/webhook/', function (req,res){
  if (req.query['hub.verify_token'] === "SolutionsStillRock"){
    res.send(req.query['hub.challenge'])
  }
  res.send("Wrong Token")
})

app.post('/webhook/', function(req, res){
  let message_events = req.body.entry[0].messaging
  console.log("msg  events is " + JSON.stringify(req.body))
    for (let i = 0; i < message_events.length; i++){
      let event = message_events[i]
      let sender = event.sender.id
        if (event.message && event.message.text) {

          let text = event.message.text
          console.log("text is " + text)
          sendText(sender, "Text echo: " + text.substring(0,100))
        }
    }
    res.sendStatus(200)
})


function sendText(sender, text){
  console.log("sending text")
  let messageData = {text: text}
    request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: token},
      method: "POST",
      json:{
        receipt: {id: sender},
        message: messageData,
      },
       function(error, response, body) {
        if (error) {
          console.log("sending error")
        } else if ( response.body.error) {
            console.log("response body error")
        }
      }
    })
}

app.listen(app.get('port'), function(){
  console.log("running: port")
})

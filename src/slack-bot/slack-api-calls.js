'use strict';

var bluebird = require('bluebird')
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var bot_token = process.env.SLACK_BOT_TOKEN;
var rtm = new RtmClient(bot_token);

var channel = 0;

var connect = function (connecting_channel){
   // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
   rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
      for (const c of rtmStartData.channels) {
         if (c.is_member && c.name === "ai-issuebot") {
            channel = c.id
         }
      }
      console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
   });
   // you need to wait for the client to fully connect before you can send messages
   var promise = new Promise(function(resolve){
      rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
         console.log("Connected");
         resolve();
      });
   });
   rtm.start();
   return promise;
};

var send = function(message){
   rtm.sendMessage(message, channel);
};

var receive = function(){
   return new Promise( function( resolve ){
      rtm.on(RTM_EVENTS.MESSAGE, resolve);
   });
}

/*
var receive = function(){
   return new Promise( funtion (resolve){
      rtm.on(RTM_EVENTS.MESSAGE, (message) => {
         console.log("Nachricht empfangen: ", message)
         resolve(message)
      });
   });
}*/

module.exports = {connect: connect, send: send, receive: receive}

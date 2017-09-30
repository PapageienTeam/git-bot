test('Slackverbindung testen', () => {
   const sut = require('../src/slack-bot/slack-api-calls');
   sut.connect("ai-issuebot");
   true;
});

test('Nachricht senden', () => {
   const sut = require('../src/slack-bot/slack-api-calls');
   return sut.connect("ai-issuebot").then(function(data){
      expect.assertions(1);
      sut.send("Hallo wie gehts?");
   });
});
/*
test('Nachricht empfangen', () => {
   const sut = require('../src/slack-bot/slack-api-calls');
   return sut.connect("ai-issuebot").then(function(data){
      var promise = sut.receive().then(function (data){
         expect.assertions(1);
         console.log("Promisewert: ", data);
      });
      sut.send("Unit test");
      return promise;
   });
});*/

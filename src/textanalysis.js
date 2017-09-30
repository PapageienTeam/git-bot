//var chatConnector = require('./slack-api-calls');
const cognitiveServices = require('cognitive-services');

var keywordsBored = /(langweilig|Langeweile|langweile)/i
var keywordsShowIssues = /(!showIssues)/i
var keywordsLifesign = /(!lifesign|zeig dich|ping git-bot)/i

//Testing messages for specific keywords

//Compare given Regex-Collections to received string
function contains(message,keywords){
    return (keywords.match(message));
}
//Checks for "keywordsBored" in a received String
function isBored(message){
    return (contains(message, keywordsShowIssues));
}
//Checks for "keywordsShowIssues" in a received String
function wantsIssues(message){
    return (contains(message, keywordsShowIssues));
}
//Checks for "keywordslifesign" in a received string
function wantsLifesign(message){
    return (contains(message, keywordslifesign));
}
//Export checking for Boredom/Issue-Command/Ping-Command
module.exports = {isBored:isBored,wantsIssues:wantsIssues,wantsLifesign:wantsLifesign}

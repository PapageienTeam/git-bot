var chatConnector = require('./slack-bot/slack-api-calls.js');
const cognitiveServices = require('cognitive-services');

var keywordsBored = /(langweilig|Langeweile|langweile)/i
var keywordsShowIssues = /(!showIssues)/i
var keywordsLifesign = /(!lifesign)/i

//Testing messages for specific keywords

//Compare given Regex-Collections to received string
function contains(message,keywords){
    return (message.text.match(keywords) != null);
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
    return (contains(message, keywordsLifesign));
}

/**
* Returns wanted reation in form of an integer
* 0 = no reaction
* 1 = display Issues, "wanted message" sendMessage (<@MEMBERID>+ "bla") | Array: db.issue.listbySlackUserID(MEMBERID) => String
* 2 = Ping-Command  sendMessage (<@here> + "Hi leute") 
* 3 = display Issues, "friendly suggestion" sendMessage (<@MEMBERID>+ "bla") | Array: db.issue.listbySlackUserID(MEMBERID) => String
**/
function reaction(message){
    if(wantsIssues(message)) return 1; 
    else if(wantsLifesign(message)) return 2;
    else if (isBored(message)) return 3;
    else return -1;
}

//Export checking for Boredom/Issue-Command/Ping-Command
module.exports = {isBored:isBored,wantsIssues:wantsIssues,wantsLifesign:wantsLifesign,reaction:reaction}

// Rem best grill ヽ༼ຈل͜ຈ༽ﾉ //

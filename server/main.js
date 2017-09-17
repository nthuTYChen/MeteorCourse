/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Aug 4, 2017
*/

msgRecords = new Mongo.Collection('msgRecords'); //Don't change this line

//All server functions called on the client side go to this section
Meteor.methods({
  msgReceiver: function(msg) { //Don't change this line

    //Each messege record inserted into the msgRecords database must have
    //three fields: 'createdAt' (specify the time being inserted), 'speaker'
    //(the message owner), and 'text' (the message itself)
    msgRecords.insert({createdAt: new Date(), speaker: 'You', text: msg}); //Don't change this line

    processMsg(msg);

    return; //Don't change this line
  },        //Don't change this line
  resetELIZA: function() {
    msgRecords.remove({});
    msgRecords.insert({createdAt: new Date(), speaker: 'ELIZA', text: 'This is ELIZA. How are you doing today?'});

    return;
  }
});

processMsg = function(msg) {
  var processResults = '';
  //Edit your core ELIZA processing function below
  processResults = 'Hello world!';
  //Edit your core ELIZA processing function above
  msgRecords.insert({createdAt: new Date(), speaker: 'ELIZA', text: processResults});
};

/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Aug 16, 2017
*/

msgRecords = new Mongo.Collection('msgRecords');

Meteor.startup(function() {
  console.log('Update history test.');
  //Actions executed after the app has started.
});

Template.body.helpers({
  'allMsg': function() {
    var allMsgs = msgRecords.find({}, {$sort: {createdAt: -1}}).fetch(), msgTexts = '';
    if(allMsgs.length > 0)
    {
      for(i=0 ; i<allMsgs.length; i++)
      {
        msgTexts += allMsgs[i].speaker+': '+allMsgs[i].text+'\n';
      }
    }
    else
    {
      msgTexts = 'ELIZA: This is ELIZA. How are you doing today?';
    }
    return msgTexts;
  }
});

Template.body.events({
  'click #submitMsg': function(event) {
    event.preventDefault();
    var myMsg = document.getElementById('myMsg').value;
    document.getElementById('myMsg').value = '';

    Meteor.call('msgReceiver', myMsg);
  },
  'click #resetMsg': function(event) {
    event.preventDefault();
    Meteor.call('resetELIZA');
  }
});

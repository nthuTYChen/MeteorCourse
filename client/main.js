/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Oct 30, 2018
*/

/*var str = "String.";
var num = 6;
var nums = [1,2,3,4,5,6];
var thisAFunction = function(x) {
  console.log(x);
};

var obj = {
  name: "TY Chen",
  affiliation: "NTHU",
  gender: "Male"
};

thisAFunction(
  {
    field1: "Test",
    field2: "Hello",
    field3: "Yeah!"
  }
);*/

var conversationLogDB = new Mongo.Collection("conversationLog");

//console.log(conversationLogDB.find().fetch());

var numbers = [1,3,5,7,9];

Meteor.call("addNumbers", numbers, function(error, result) {
    console.log(result);
});
Meteor.call("serverFunc", "hello", 5, function(error, result) {
    console.log(error);
    console.log(result);
});
console.log("Test order.");

Session.setDefault("currentPage", "frontPage");

var conversationLog = new ReactiveVar("ELIZA: How are you doing?");

Template.body.onCreated(function() {

});

Template.body.onRendered(function() {

});

Template.body.helpers({
  checkCurrentPage: function(page) {
    return Session.equals("currentPage", page);
  }
});

Template.mainSection.helpers({
  getConversation: function() {
    let dbData = conversationLogDB.find({}, {sort: {time: 1}});
    dbData = dbData.fetch();
    let conversationLog = "";
    for(let index=0 ; index<dbData.length ; index++) {
      let msgData = dbData[index];
      conversationLog = conversationLog+msgData.source+": ";
      conversationLog = conversationLog+msgData.msg+"\n";
    }
    return conversationLog;
    //console.log(conversationLogDB.find().fetch());
    //return conversationLog.get();
  }
});

Template.formSection.helpers({

});

Template.formSection.events({
  "click #submitMsg": function(event) {
    event.preventDefault();
    let myMsgObj = document.getElementById("myMsg");
    let myMsg = myMsgObj.value;
    //let oldConversation = conversationLog.get();
    //let newConversation = oldConversation+"\n"+"You: "+myMsg;
    /*Meteor.call("msgReceiver", myMsg, function(error, result) {
        let ELIZAResponse = result;
        newConversation = newConversation+"\n"+"ELIZA: "+ELIZAResponse;
        conversationLog.set(newConversation);
    });*/
    Meteor.call("msgReceiver", myMsg);
    myMsgObj.value = "";
  },
  "click #resetMsg": function() {
    conversationLog.set("ELIZA: How are you doing?");
  }
});

Template.frontPage.events({
  "click #enterMain": function() {
    Session.set("currentPage", "home");
  }
});
















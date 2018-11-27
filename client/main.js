/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Nov 27, 2018
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
var conversationLog = new ReactiveVar("ELIZA: How are you doing?");

Session.setDefault("currentPage", "frontPage");

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
  }
});

Template.formSection.events({
  "click #submitMsg": function(event) {
    event.preventDefault();
    let myMsgObj = document.getElementById("myMsg");
    let myMsg = myMsgObj.value;
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
















/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Oct 30, 2018
*/

var number = new ReactiveVar(0);

var stupidResponse = function() {
  return "I beg your pardon?";
};

Template.body.onCreated(function() {

});

Template.body.onRendered(function() {

});

Template.mainSection.helpers({
  getData: function() {
    return "Here's your data!";
  },
  testHelper: function() {
    return "This data is from a helper!";
  },
  stringCombine: function(str1, str2) {
    return str1+" "+str2;
  },
  multipler: function(num1, num2) {
    let product = parseInt(num1) * parseInt(num2);
    return product;
  }
});

Template.formSection.helpers({
  getNumber: function() {
    return number.get();
  }
});

Template.formSection.events({
  "click #increase": function() {
    let curNum = number.get();
    number.set(curNum+1);
  },
  "click #decrease": function() {
    let curNum = number.get();
    number.set(curNum-1);
  },
  "click #submitMsg": function(event) {
    event.preventDefault();
    let myMsgObj = document.getElementById("myMsg");
    let myMsg = myMsgObj.value;
    let conBoxObj = document.getElementById("conversationBox");
    let oldConversation = conBoxObj.value;
    let newConversation = oldConversation+"\n"+"You: "+myMsg;
    let ELIZAResponse = stupidResponse();
    newConversation = newConversation+"\n"+"ELIZA: "+ELIZAResponse;
    conBoxObj.value = newConversation;
    myMsgObj.value = "";
  },
  "click #resetMsg": function() {
    let conBoxObj = document.getElementById("conversationBox");
    conBoxObj.value = "ELIZA: How are you doing?";
  }
});


















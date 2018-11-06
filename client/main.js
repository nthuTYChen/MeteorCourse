/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Oct 30, 2018
*/

var numbers = [88, 204, 101, 294, 18, 1, 6, 7];
var index = new ReactiveVar(0);

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
    getIndex: function() {
      return index.get();
    },
    getNumber: function() {
      return numbers[index.get()];
    }
});

Template.formSection.events({
  "click #next": function() {
    let numLength = numbers.length;
    let newIndex = index.get() + 1;
    if(newIndex < numLength)
    {
      index.set(newIndex);
    }
  },
  "click #prev": function() {
    let newIndex = index.get() - 1;
    if(newIndex >= 0) {
      index.set(newIndex);
    }
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


















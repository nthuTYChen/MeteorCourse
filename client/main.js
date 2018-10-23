/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Oct 16, 2018
*/

Template.body.onCreated(function() {
    //alert("Body loaded!");
});

Template.mainSection.onCreated(function() {
    //alert("Main section loaded!");
});

Template.formSection.events({
  "click #submitMsg": function(event) {
    event.preventDefault();
    //alert("Message submitted!");
  },
  "click .buttons": function() {
    alert("A button is clicked");
  }
});


















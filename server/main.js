var profileDataDB = new Mongo.Collection("profileData");
var conversationLogDB = new Mongo.Collection("conversationLog");

var stupidResponse = function(msg) {
	return "What is "+msg+"?";
};

Meteor.startup(function() {
	//profileDataDB.remove({});
	conversationLogDB.remove({});
	let searchResults = conversationLogDB.find();
	if(searchResults.fetch().length < 1) {
		conversationLogDB.insert(
			{
				source: "ELIZA",
				msg: "How are you doing?",
				time: new Date()
			}
		);
	}
});

Meteor.methods({
	msgReceiver: function(msg) {
		conversationLogDB.insert(
			{
				source: "You",
				msg: msg,
				time: new Date()
			}
		);
		let ELIZAResponse = stupidResponse(msg);
		conversationLogDB.insert(
			{
				source: "ELIZA",
				msg: ELIZAResponse,
				time: new Date()
			}
		);
		return;
	}
});
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
	//console.log(conversationLogDB.find().fetch());
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
		//console.log(conversationLogDB.find().fetch());
		//return stupidResponse(msg);
		return;
	},
	serverFunc: function(data1, data2) {
		console.log(data1);
		console.log(data2);
		return "done!";
	},
	addNumbers: function(nums) {
		let result = 0;
		for(let index=0 ; index<nums.length ; index++) {
			result = result + nums[index];
		}
		//console.log(result);
		return result;
	}
});
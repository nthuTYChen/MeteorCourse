var profileDataDB = new Mongo.Collection("profileData");
var conversationLogDB = new Mongo.Collection("conversationLog");

var stupidResponse = function(msg) {
	return "What is "+msg+"?";
};

conversationLogDB.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Meteor.publish("userConversation", function(username) {
	return conversationLogDB.find({user: username});
});

Meteor.startup(function() {
	//profileDataDB.remove({});
	//conversationLogDB.remove({});
});

Meteor.methods({
	setUser: function(username) {
		if(username.includes(" ")) {
			throw new Meteor.Error();
		}
		else {
			let userLog = conversationLogDB.find({user: username}).fetch();
			if(userLog.length > 0) {
				return;
			}
			else {
				conversationLogDB.insert(
					{
						user: username,
						source: "ELIZA",
						msg: "Hi, "+username+". How are you doing?",
						time: new Date()
					}
				);
				return;
			}
		}
	},
	msgReceiver: function(msg, username) {
		let dataNum = conversationLogDB.find({}).fetch().length;
		if(dataNum <= 20) {
			conversationLogDB.insert(
				{
					user: username,
					source: "You",
					msg: msg,
					time: new Date()
				}
			);
			let ELIZAResponse = stupidResponse(msg);
			conversationLogDB.insert(
				{
					user: username,
					source: "ELIZA",
					msg: ELIZAResponse,
					time: new Date()
				}
			);
			return;
		}
		else {
			return "full";
		}
	},
	resetMsg: function(username) {
		conversationLogDB.remove({user: username});
		conversationLogDB.insert(
			{
				user: username,
				source: "ELIZA",
				msg: "Hi, "+username+". How are you doing?",
				time: new Date()
			}
		);
	}
});
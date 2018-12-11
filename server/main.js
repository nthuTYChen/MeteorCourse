var profileDataDB = new Mongo.Collection("profileData");
var conversationLogDB = new Mongo.Collection("conversationLog");

// . = any char
// \w = any letter or number
// \W = any special symbols
// \d = any digit
// \D = any non-digit
// + = 1 or more than 1 character
// * = 0 or more than 1 character
// [] = any character in the scope
// () = a character group

var regex = /(weather|temperature).* in (\w+)/i;

var stupidResponse = function(msg) {
	return "What is "+msg+"?";
};

var weatherInfo = function(msg) {
	let wtData;
	let weatherRegex = /(weather|temperature).* in (\w+)/i;
	let weatherRequest = msg.match(weatherRegex);
	if(weatherRequest === null) {
		return "";
	}
	else {
		let lastPos = weatherRequest.length-1;
		let cityName = weatherRequest[lastPos];
		let APIKey = "0f9acd286be670dbec09507843f8f78b";
		let wtInfoURL = 
			"http://api.openweathermap.org/data/2.5/weather?APPID="+APIKey+
			"&q="+cityName+"&units=metric";
		try {
			wtData = HTTP.get(wtInfoURL);
			wtData = wtData.data.main;
			let wtResponse = "It's "+wtData.temp+"C.";
			return wtResponse;
			//console.log(wtData);
		}
		catch(error) {
			return "I don't the city.";
		}
		return "";
	}
	//console.log(weatherRequest);
};

var initConversation = function(username) {
	conversationLogDB.insert(
		{
			user: username,
			source: "ELIZA",
			msg: "Hi, "+username+". How are you doing?",
			time: new Date()
		}
	);
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
				initConversation(username);
				return;
			}
		}
	},
	msgReceiver: function(msg, username) {
		let dataNum = conversationLogDB.find({user: username}).fetch().length;
		if(dataNum <= 20) {
			conversationLogDB.insert(
				{
					user: username,
					source: "You",
					msg: msg,
					time: new Date()
				}
			);
			let ELIZAResponse = weatherInfo(msg);
			if(ELIZAResponse === "") {
				ELIZAResponse = stupidResponse(msg);
			}
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
		initConversation(username);
	}
});
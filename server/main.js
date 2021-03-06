var profileDataDB = new Mongo.Collection("profileData");
var engLexicon = new Mongo.Collection("engLexicon");
var bigramLexicon = new Mongo.Collection("bigramLexicon");
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

var tagPOS = function(msg) {
	//Tag #this is a pen#
	let tagPOSRegex = /Tag #(.*)#/i;
	let tagPOSRequest = msg.match(tagPOSRegex);
	if(tagPOSRequest === null) {
		return "";
	}
	else {
		let targetS = tagPOSRequest[1];
		let words = targetS.split(" ");
		let targetResponse = "";
		for(let index=0 ; index<words.length ; index++) {
			let dbWords = engLexicon.find(
				{
					word: words[index]
				},
				{
					sort: {freq: -1}
				}
			).fetch();
			if(dbWords.length > 0) {
				targetResponse = targetResponse + dbWords[0].pos + " ";
			}
			else {
				targetResponse = targetResponse + "UNKNOWN ";
			}
			//console.log(dbWords);
		}
		return "Here is the POS: "+targetResponse;
	}
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
		let APIKey = "XXXXXXX";
		let wtInfoURL = 
			"http://api.openweathermap.org/data/2.5/weather?APPID="+APIKey+
			"&q="+cityName+"&units=metric";
		let wtInfoURL2 = 
			"http://api.openweathermap.org/data/2.5/forecast?APPID="+APIKey+
			"&q="+cityName+"&units=metric&cnt=24";
		let wtData2 = HTTP.get(wtInfoURL2);
		console.log(wtData2.data.list[0]);
		try {
			wtData = HTTP.get(wtInfoURL);
			let wtDescription = wtData.data.weather[0];
			//console.log(wtData);
			let wtMain = wtData.data.main;
			let wtWind = wtData.data.wind;
			let wtResponse = "It's "+wtDescription.description+" in "+
				cityName+", and the temperature is "+wtMain.temp+"C."+
				" The wind speed is "+wtWind.speed+" km/hr."+
				" The highest temperature is "+wtMain.temp_max+", "+
				"and the lowest temperature is "+wtMain.temp_min+"C.";
			return wtResponse;
		}
		catch(error) {
			return "I don't know the city.";
		}
		return "";
	}
	//console.log(weatherRequest);
};

var loadBigramLexicon = function() {
	bigramLexicon.remove({});
	let rawData = Assets.getText("bigramList_COCA_subset.txt");
	let dataLines = rawData.split(/\r\n|\n/);
	let numLines = dataLines.length;
	let bigramInfo;
	for(let index=1 ; index<numLines ; index++) {
		console.log(index);
		bigramInfo = dataLines[index].split("\t");
		bigramLexicon.insert(
			{
				freq: parseInt(bigramInfo[0]),
				word1: bigramInfo[1],
				word2: bigramInfo[2],
				pos1: bigramInfo[3],
				pos2: bigramInfo[4]
			}
		);
		//console.log(bigramInfo);
	}
	//console.log(dataLines[0]);
};

var loadEngLexicon = function() {
	engLexicon.remove({});
	let rawData = Assets.getText("monogramList_COCA.txt");
	let dataLines = rawData.split(/\r\n|\n/);
	let numLines = dataLines.length;
	let wordInfo;
	for(let index=1 ; index<numLines ; index++) {
		console.log(index);
		wordInfo = dataLines[index].split(",");
		engLexicon.insert(
			{
				word: wordInfo[0],
				pos: wordInfo[1],
				freq: parseInt(wordInfo[2])
			}
		);
		//console.log(wordInfo);
	}
	//console.log(engLexicon.find({pos: "nn1"}).fetch());
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
	//loadEngLexicon();
	//loadBigramLexicon();
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
				ELIZAResponse = tagPOS(msg);
			}
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

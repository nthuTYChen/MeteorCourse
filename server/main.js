var profileDataDB = new Mongo.Collection("profileData");

var stupidResponse = function(msg) {
	return "What is "+msg+"?";
};

Meteor.startup(function() {
	profileDataDB.insert(
			{
				name: "Michael Jackson",
				affiliation: "Heaven",
				age: 130
			}
		);
	console.log(profileDataDB.find().fetch());
});

Meteor.methods({
	msgReceiver: function(msg) {
		return stupidResponse(msg);
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
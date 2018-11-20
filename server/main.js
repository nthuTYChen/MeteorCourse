var profileDataDB = new Mongo.Collection("profileData");

var stupidResponse = function(msg) {
	return "What is "+msg+"?";
};

Meteor.startup(function() {
	profileDataDB.remove({});
	profileDataDB.insert(
			{
				name: "Michael Jackson",
				affiliation: "Heaven",
				age: 130
			}
		);
	profileDataDB.insert(
			{
				name: "TY Chen",
				affiliation: "NTHU",
				age: 38
			}
		);
	profileDataDB.insert(
			{
				name: "My Mom",
				affiliation: "NTHU",
				age: 75
			}
		);
	profileDataDB.insert(
			{
				name: "Slash",
				affiliation: "Guns & Roses",
				age: 56
			}
		);
	profileDataDB.insert(
			{
				name: "Ting Ting",
				affiliation: "Mars",
				age: 999
			}
		);
	profileDataDB.update(
		{
			affiliation: "NTHU",
			age: {$gt: 65}
		},
		{
			$set: {active: false}
		}
	);
	let searchResults = profileDataDB.find(
		{
			affiliation: "NTHU", 
		 	age: {$gt: 40}			//gte = greater than or equal to = >
		}							//gt = greater than
	);
	console.log(searchResults.fetch());
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
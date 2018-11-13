var stupidResponse = function() {
	return "I beg your pardon";
};

Meteor.methods({
	msgReceiver: function(msg) {
		return stupidResponse();
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
/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Oct 16, 2018
*/

/*var students = ["John", "Mary", "Tim", "David", "Tony", "Amy",
                "Jim", "Kerry", "Mike", "Stern"];

var rollCall = function() {
    let randomIndex = Math.random() * 10;
    randomIndex = Math.floor(randomIndex);
    let studentName = students[randomIndex];
    let nameMessage = studentName + " is presenting today!";
    return nameMessage;
};

for(let callNum = 1 ; callNum < 3 ; callNum++) {
    console.log(rollCall());
}*/

/*var fakeGoogleMap = function(yourPlace, destination) {
    let fakeDistance = Math.random() * 100;
    let distMessage = 
      "The distance between "+yourPlace+" and "+destination+
      " is "+fakeDistance+" km.";
    return distMessage;
};

console.log(fakeGoogleMap("Taipei", "Hsinchu"));*/

/*var myFirstBike = {
  brand: "GIANT",
  when: 1993,
  color: "red",
  price: 5500,
  stolenYears: [1995, 2000, 2004]
};

var stolenYears = myFirstBike.stolenYears;

console.log(stolenYears[0]);*/

/*var Mike = {
  age: 28,
  gender: "Male",
  height: 180,
  weight: 79
};

Mike["age"] = 30;
console.log(Mike["age"]);*/

/*var coffeeMachine = {
    makeEspresso: function() {
        console.log("Here's your espresso!");
    },
    makeLatte: function() {
        console.log("Here's your Latte!");
    },
    makeAnything: function(request) {
        console.log("Here's your "+request);
    }
};

coffeeMachine.makeAnything("oolong tea");*/

/*var emptyObj = {};

emptyObj.price = 5500;
console.log(emptyObj.price);

delete emptyObj.price;
console.log(emptyObj.price)*/

/*var numbers = [1, 2, 3, 4, 5];

for(let index = (numbers.length-1) ; index >= 0 ; index--) {
    console.log(numbers[index]);
}*/

/*var numbers = [25, 98, 1, 17, 20, 39];
var hugeNums = [];

for(let index = 0 ; index < numbers.length ; index++) {
    let num = numbers[index];
    if(num > 30) {
      hugeNums.push(num);
    }
    else {
      console.log(num);
    }
}

console.log(hugeNums);*/

var str = "This is a string.";

str = str.replace("string", "message");
console.log(str);

var words = str.split("is");
console.log(words);

















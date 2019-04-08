var config = {
	apiKey: "AIzaSyB0dk0E4Y-PNmKYeHOjUnx3_Dvle2iZYgo",
	authDomain: "timesheet-4780c.firebaseapp.com",
	databaseURL: "https://timesheet-4780c.firebaseio.com",
	projectId: "timesheet-4780c",
	storageBucket: "timesheet-4780c.appspot.com",
	messagingSenderId: "1077928003449"
};
firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment().format();

console.log("Current Time: " + currentTime);

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().train;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().first;
	var trainFrequency = childSnapshot.val().frequency;

	var trainTimeConverted = moment(trainTime, "HH:mm");

	var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
	console.log(timeDifference);

	var frequencyMinutes = childSnapshot.val().frequency;
	console.log("Frequency Minutes: " + frequencyMinutes);

	var minutesAway = Math.abs(timeDifference % frequencyMinutes);
	console.log("Minutes Away: " + minutesAway);

	var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
	console.log("Next Arrival: " + nextArrival);


	$("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
$("#click-button").on("click", function () {
	event.preventDefault();

	if ($("#nameTrain").val().trim() === "" ||
		$("#finalDestination").val().trim() === "" ||
		$("#timeFirstTrain").val().trim() === "" ||
		$("#minFrequency").val().trim() === "") {

		alert("Whoops! Looks like some info is missing...");
	}else {

	var nameTrain = $("#nameTrain").val().trim();
	var finalDestination = $("#finalDestination").val().trim();
	var timeFirstTrain = moment($("#timeFirstTrain").val().trim(), "HH:mm").format("HH:mm");

	var minFrequency = $("#minFrequency").val().trim();

	var newTrain = {
		train: nameTrain,
		destination: finalDestination,
		first: timeFirstTrain,
		frequency: minFrequency
	}
	
	database.ref().push(newTrain);

	$("#nameTrain").val("");
	$("#finalDestination").val("");
	$("#timeFirstTrain").val("");
	$("#minFrequency").val("");
};
});



var config = {
  apiKey: "AIzaSyAKf94LsOcZnMVSPY4OjOYX3_vBbWctDKc",
  authDomain: "train-schedules-7f4fb.firebaseapp.com",
  databaseURL: "https://train-schedules-7f4fb.firebaseio.com",
  projectId: "train-schedules-7f4fb",
  storageBucket: "train-schedules-7f4fb.appspot.com",
  messagingSenderId: "598437627695"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

$("#add-train").on("click", function (event) {
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  start = $("#start-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  dataRef.ref().push({
    name: name,
    destination: destination,
    start: start,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

dataRef.ref().on("child_added", function (childSnapshot) {

  var newTR = $("<tr>");
  var newTD1 = $("<td>");
  newTD1.text(childSnapshot.val().name);
  var newTD2 = $("<td>");
  newTD2.text(childSnapshot.val().destination);
  var newTD3 = $("<td>");
  var tFrequency = childSnapshot.val().frequency;
  newTD3.text("Every " + tFrequency + " minutes");

  var startTime = childSnapshot.val().start;
  var convertedStart = moment(startTime, "HH:mm").subtract(1, "years");
  console.log(convertedStart);
  var currentTime = moment();
  var diffTime = moment().diff(moment(convertedStart), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % tFrequency;
  var minutesTilltrain = tFrequency - tRemainder;
  var eta = moment().add(minutesTilltrain, "minutes").format("h:mm a");

  var newTD4 = $("<td>");
  newTD4.text(eta);
  var newTD5 = $("<td>");
  newTD5.text(minutesTilltrain);

  newTR.append(newTD1);
  newTR.append(newTD2);
  newTR.append(newTD3);
  newTR.append(newTD4);
  newTR.append(newTD5);

  $("#train-table").append(newTR);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});




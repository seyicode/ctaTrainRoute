
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAbRkrzzo9u6pWa62QcuWN3DXj2lzjoZ6I",
    authDomain: "train-time-1edef.firebaseapp.com",
    databaseURL: "https://train-time-1edef.firebaseio.com",
    projectId: "train-time-1edef",
    storageBucket: "",
    messagingSenderId: "900776319955"
  };
  firebase.initializeApp(config);
  

var database = firebase.database();

// Uploads employee data to the database
$("#add-a-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainRoute = $("#trainRoute").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var firstTrainTime = moment($("#firstTrainTime").val().trim(), "hh:mm").format("X");
    var trainFrequency = $("#trainFrequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainRoute,
      destinantion: trainDestination,
      time: firstTrainTime,
      frequency: trainFrequency,
    };

 // Uploads train data to the database
 database.ref().push(newTrain);

 // Logs everything to console
 console.log(newTrain.name);
 console.log(newTrain.destinantion);
 console.log(newTrain.time);
 console.log(newTrain.frequency);

 // Alert
 alert("New train successfully added");

 // Clears all of the text-boxes
 $("#trainRoute").val("");
 $("#trainDestination").val("");
 $("#firstTrainTime").val("");
 $("#trainfrequency").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainRoute = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destinantion;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train  Info
    console.log(trainRoute);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
     console.log(firstTimeConverted);

     // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

     // Minute Until Train
     var minuteAway = trainFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + minuteAway);
 
     // Next Train
     var nextArrival = moment().add(minuteAway, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    var nextTrain = moment(nextArrival).format("hh:mm");
  
  
     $("#train-table > tbody").append("<tr><td>" + trainRoute + "</td><td>" + trainDestination + "</td><td>" +
      trainFrequency+ "</td><td>" + nextTrain  + "</td><td>" + minuteAway + "</td><td>");
  });
  
//  alert("I'm here");
 
 // Initialize Firebase
 // ---------------------------------------------
 var config = {
    apiKey: "AIzaSyC8ZhJ9K0WbpNr5RYRIwagiXPQusXbmYpk",
    authDomain: "trainschedule-d2874.firebaseapp.com",
    databaseURL: "https://trainschedule-d2874.firebaseio.com",
    projectId: "trainschedule-d2874",
    storageBucket: "trainschedule-d2874.appspot.com",
    messagingSenderId: "360802417940"
  };
  firebase.initializeApp(config);

//   Variables
// ---------------------------------------------
  var trainData = firebase.database();

//   link the button with Firebase
  $("#addTrainBtn").on("click",function() {
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }
      trainData.ref().push(newTrain);

      alert("Train Added!");

      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

      return false;
  });

//   Get the response back from Firebase
trainData.ref().on("child_added",function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    // moment js
    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency +
    "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
})
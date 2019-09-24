
// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBJCibAOV2yFR-K8mIa8KGvL19FREPE53c",
    authDomain: "steve3.firebaseapp.com",
    databaseURL: "https://steve3.firebaseio.com",
    projectId: "steve3",
    storageBucket: "",
    messagingSenderId: "133395067640",
    appId: "1:133395067640:web:188a5b6af0c2840195810d"
};
firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding train
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val();
    var dest = $("#destination").val();
    var initDepart =$("#initDepart").val();
    var freq = $("#freq").val();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: dest,
      init: initDepart,
      frequency: freq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.init);
    console.log(newTrain.freq);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#initDepart").val("");
    $("#freq").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var initDepart = childSnapshot.val().init;
    var freq = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(dest);
    console.log(initDepart);
    console.log(freq);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(initDepart),
      $("<td>").text(freq),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
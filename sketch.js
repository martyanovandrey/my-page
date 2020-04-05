// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Get input from user
var fruitInput;
var totalInput;

// Keep list of DOM elements for clearing later when reloading
var listItems = [];
var database;

function setup() {

    var config = {
        apiKey: "AIzaSyBvGl-hwcK8E7K-4Ka3q-u4W15FjUdgP38",
        authDomain: "psps-eed04.firebaseapp.com",
        databaseURL: "https://psps-eed04.firebaseio.com",
        projectId: "psps-eed04",
        storageBucket: "psps-eed04.appspot.com",
        messagingSenderId: "1085372319847"
      };
      
  firebase.initializeApp(config);
  database = firebase.database();

  // Input fields
  fruitInput = select('#fruit');
  totalInput = select('#total');

  // Submit button
  var submit = select('#submit');
  submit.mousePressed(sendToFirebase);

  // Today Date
  let today = new Date().toISOString().substr(0, 10);
document.querySelector("#fruit").value = today;

//limiter();
//function limiter(input) {
 //   if (input.value < 0) input.value = 0;
 //   if (input.value > 100) input.value = 100;
 //}
 var tot = document.querySelector("#total").value;
 var tot = Math.min(Math.max(parseInt(tot), 1), 20);
  // Start loading the data
  loadFirebase();
}

function loadFirebase() {
  var ref = database.ref("fruits");
  ref.on("value", gotData, errData);
}

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

// The data comes back as an object
function gotData(data) {
  var fruits = data.val();
  // Grab all the keys to iterate over the object
  var keys = Object.keys(fruits);

  // clear previous HTML list
  clearList();

  // Make an HTML list
  var list = createElement('ol');
  list.parent('data');

  // Loop through array
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var fruit = fruits[key];
    var li = createElement('li', fruit.fruit + ': ' + fruit.total + ", key: " + key);
    li.parent(list);
    listItems.push(li);
  }
}

// Clear everything
function clearList() {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
}

// This is a function for sending data
function sendToFirebase() {
  var fruits = database.ref('fruits');

  // Make an object with data in it
  var data = {
    fruit: fruitInput.value(),
    total: totalInput.value()
  }

  var fruit = fruits.push(data, finished);
  console.log("Firebase generated key: " + fruit.key);

  // Reload the data for the page
  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
    }
  }
}
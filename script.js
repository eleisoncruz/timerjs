// Declaring two global variables
var secondsRemaining;
var intervalHandle;

function resetPage() {
  document.getElementById("textAndButton").style.display = "block";
}

// The actual decrementing the element down to zero.
function decrement() {
  // Grab now the element in the DOM which is h1 will display the timer
  var timerDisplay = document.getElementById("theTimer");
  // Turn the seconds into a mm:ss
  var min = Math.floor(secondsRemaining / 60);
  var sec = secondsRemaining - (min * 60);
  // Add a leading zero if seconds less than 10.
  if (sec < 10) {
    sec = 0 + sec;
  }
  // Concatenate with colons.
  var message = min + ":" + sec;
  // Now change the display.
  timerDisplay.innerHTML = message;
  // Turns red if the time goes below 10.
  if (secondsRemaining <= 10) {
    timerDisplay.style.color = "red";
  }
  // Stop if down to zero.
  if (secondsRemaining === 0) {
    document.getElementById("message").innerHTML = "Done!";
    document.getElementById("message").style.color = "blue";
    clearInterval(intervalHandle);
    resetPage();
  }
  // Subtract from seconds remaining
  secondsRemaining--;
}

// Do essential preps before decrementing starts.
function startCountDown() {
  // Get the value input by the user from the created text-field element.
  var minutes = document.getElementById("minutes").value;
  // validate first the user-input value.
  if (isNaN(minutes)) {
    document.getElementById("message").innerHTML = "Please input numbers only";
    return;
  }
  // Converting the value into seconds
  secondsRemaining = minutes * 60;
  // For every seconds, call the "decrement" function.
  intervalHandle = setInterval(decrement, 1000);
  // Hide the created elements (input text and the button), when the timer starts.
  document.getElementById("textAndButton").style.display = "none";
}

// Soon as the page loaded.
window.onload = function() {
  // Create a text and a button for minutes to be timered
  var createInputText = document.createElement("input");
  var createButton = document.createElement("input");
  // Setting attributes for created elements
  createInputText.setAttribute("id", "minutes");
  createInputText.setAttribute("value", "input your minutes here");
  createButton.setAttribute("type", "button");
  createButton.setAttribute("value", "Submit");
  // Created anonymous functions upon submitting and text input clear.
  createButton.onclick = function () {
    startCountDown();
    document.getElementById("message").innerHTML = "";
  }
  createInputText.onclick = function() {
    document.getElementById("minutes").value = "";
  }
  // Displaying the created elements to the DOM
  document.getElementById("textAndButton").appendChild(createInputText);
  document.getElementById("textAndButton").appendChild(createButton);
}
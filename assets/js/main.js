/*
10/18/22
- Score doesn't display during the quiz - only at the end.
- Need to set up question displays and inputs. Set up right/wrong feedback responses with a delay before presenting next question. Use a function to respond right/wrong depending on the answer.
- Style the entire app.

*/

// core variables

var body = document.body;
var header = document.createElement("header");
var navEl = document.createElement("nav");
var navDivTime = document.createElement("div");
var anchorEl = document.createElement("a");
var mainDiv = document.createElement("div");
var pEl = document.createElement("p");
var h1El = document.createElement("h1");
var testDiv = document.createElement("div");

// input and submission button for scores
var initInput = document.createElement("input");
var scoreSubmit = document.createElement("input");

// more buttons
var startButton = document.createElement("input");
var timerButton = document.createElement("input");
var a1Button = document.createElement("input");
var a2Button = document.createElement("input");
var a3Button = document.createElement("input");
var a4Button = document.createElement("input");

// 
var timeLeft = "xx";
var score = 0;

// core text content

anchorEl.textContent = "this will be the high scores link";
navDivTime.textContent = "Time left: " + timeLeft;
h1El.textContent = "Coding Quiz Challenge";
pEl.textContent = "Try to answer the following JavaScript related questions before time runs out. Correct answers will extend your time while incorrect answers will reduce it.";

// class and id selector variables, if I end up using them.

// appending elements into the body tag
body.appendChild(header);
body.appendChild(mainDiv);
mainDiv.appendChild(h1El);
mainDiv.appendChild(pEl);
mainDiv.appendChild(startButton);
mainDiv.appendChild(testDiv);
header.appendChild(navEl);
navEl.appendChild(anchorEl);
navEl.appendChild(navDivTime);

// setting up attributes for the appended elements

body.setAttribute("style", "background: rgb(106, 121, 149); height: 95vh;");
header.setAttribute("style", "margin: 5px; border: 2px solid white")
mainDiv.setAttribute("style", "padding: 30px; border: 2px solid black; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column;");
mainDiv.setAttribute("class", "mainDiv");
startButton.setAttribute("type", "button");
startButton.setAttribute("value", "Start!");
navEl.setAttribute("style", "display: flex; justify-content: space-between;");
navDivTime.setAttribute("style", "border: solid 1px red")
// be sure to change the google placeholder link to a high scores link
anchorEl.setAttribute("href", "https://www.google.com");

// object that contains the quiz questions

var questionsObj = {
  questions: ["Which of the following is the primary role of JavaScript in web design?", "What is the result of the operation 4 % 2?", "What does the pop() method do to an array?", "What will the console output if a user enters 'console.log(isNaN(5));?", "Which option increases the value of i by one each time it occurs?"],
}

// object that contains answers that correspond to the index of the related question from questionsObj

var answersObj = {
  answers0: ["Defining the content of a webpage", "Setting the layout of a webpage", "Adding interactivity and behavior to a webpage", "Ensuring a webpage appears in search engines"],
  answers1: ["0", "2", "NaN", ".5"],
  answers2: ["Duplicates all values in the array", "Removes the last element of an array", "Deletes the entire array", "Changes the array values to Starburst flavors"],
  answers3: ["true", "5", "Go Eagles!", "false"],
  answers4: ["i + 5", "i--", "i++", "i**"]
}

// function to start the timer and begin the quiz
startButton.addEventListener("click", function startTimer(){
  timeLeft = 10;
  navDivTime.textContent = "Time left: " + timeLeft + " seconds.";
  var testTimer = setInterval(function () {
    if (timeLeft > 1) {
      navDivTime.textContent = "Time left: " + timeLeft + " seconds.";
      timeLeft--;
    } else if (timeLeft === 1) {
      navDivTime.textContent = "Time left: " + timeLeft + " second.";
      timeLeft--;
    } else {
      navDivTime.textContent = "Time's up!";
      timesUp();
      clearInterval();
    }
  }, 1000);
});

// function to present and cycle questions

function addQuestion(){
  // create the question elements

  // modify the text/attributes
  // modify one of the attributes to say right or wrong

  // append all elements to something on the page

  // for all the buttons, add event listener

}

// event listener that begins the quiz on clicking start

// function that runs if the user runs out of time.

function timesUp() {
  h1El.textContent = "oh noes, you ran out of time!";
  // set up div content to allow the usual score display and name entry

}

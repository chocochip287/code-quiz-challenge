/*
10/19/22
- Score doesn't display during the quiz - only at the end.
- Need to set up question displays and inputs. Set up right/wrong feedback responses with a delay before presenting next question. Use a function to respond right/wrong depending on the answer.
- Style the entire app. (todo: align buttons in their own div)

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
var resultDiv = document.createElement("div");

// input and submission button for scores
var initInput = document.createElement("input");
var scoreSubmit = document.createElement("input");

// more buttons
var startButton = document.createElement("input");
var a1Button = document.createElement("input");
var a2Button = document.createElement("input");
var a3Button = document.createElement("input");
var a4Button = document.createElement("input");
// special button for testing page content and function - not intended for final release
var testButton = document.createElement("input");

// test misc variables 
var timeLeft = "xx";
var score = 0;
var answered = 0;

// core text content

anchorEl.textContent = "this will be the high scores link";
navDivTime.textContent = "Time left: " + timeLeft;
h1El.textContent = "Coding Quiz Challenge";
pEl.textContent = "Try to answer the following JavaScript related questions before time runs out. Correct answers will extend your time while incorrect answers will reduce it.";

// class and id selector variables, if I end up using them.

var buttons = document.querySelectorAll("input");

// appending elements into the body tag
body.appendChild(header);
body.appendChild(mainDiv);
mainDiv.appendChild(h1El);
mainDiv.appendChild(pEl);
mainDiv.appendChild(startButton);
mainDiv.appendChild(testButton);
mainDiv.appendChild(resultDiv);
header.appendChild(navEl);
navEl.appendChild(anchorEl);
navEl.appendChild(navDivTime);

// setting up attributes for the appended elements

body.setAttribute("style", "background: rgb(106, 121, 149); height: 95vh;");
header.setAttribute("style", "margin: 5px; border: 2px solid white")
mainDiv.setAttribute("style", "padding: 30px; border: 2px solid black; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column;");
mainDiv.setAttribute("class", "mainDiv");
startButton.setAttribute("class", "button")
startButton.setAttribute("type", "button");
startButton.setAttribute("value", "Start!");
testButton.setAttribute("class", "button");
testButton.setAttribute("type", "button");
testButton.setAttribute("value", "test");
a1Button.setAttribute("class", "button");
a1Button.setAttribute("type", "button");
a1Button.setAttribute("value", "1");
a2Button.setAttribute("class", "button");
a2Button.setAttribute("type", "button");
a2Button.setAttribute("value", "2");
a3Button.setAttribute("class", "button");
a3Button.setAttribute("type", "button");
a3Button.setAttribute("value", "3");
a4Button.setAttribute("class", "button");
a4Button.setAttribute("type", "button");
a4Button.setAttribute("value", "answer 4");
navEl.setAttribute("style", "display: flex; justify-content: space-between;");
navDivTime.setAttribute("style", "border: solid 1px red")
// be sure to change the google placeholder link to a high scores link
anchorEl.setAttribute("href", "https://www.google.com");

var questionsObj = {
  questions: ["Which of the following is the primary role of JavaScript in web design?", "What is the result of the operation 4 % 2?", "What does the pop() method do to an array?", "What will the console output if a user enters 'console.log(isNaN(5));?", "Which option increases the value of i by one each time it occurs?"],
}

// object containing answers that correspond to the index of the related question from questionsObj

var answersObj = {
  // [2] is correct
  answers0: ["Defining the content of a webpage", "Setting the layout of a webpage", "Adding interactivity and behavior to a webpage", "Ensuring a webpage appears in search engines"],
  // [0] is correct
  answers1: ["0", "2", "NaN", ".5"],
  // [1] is correct
  answers2: ["Duplicates all values in the array", "Removes the last element of an array", "Deletes the entire array", "Changes the array values to Starburst flavors"],
  // [3] is correct
  answers3: ["true", "5", "Go Eagles!", "false"],
  // [1] is correct
  answers4: ["i + 5", "i--", "i++", "i**"]
}

// function to start the timer and begin the quiz
startButton.addEventListener("click", function startTimer(){
  timeLeft = 10;
  testQuestions();
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

function testQuestions(){
  for (let i = 0; (i < questionsObj.questions.length) ; i++) {
    h1El.textContent = questionsObj.questions[i];
    startButton.setAttribute("class", "hide-me");
    pEl.setAttribute("class", "hide-me");
    mainDiv.appendChild(a1Button);
    mainDiv.appendChild(a2Button);
    mainDiv.appendChild(a3Button);
    mainDiv.appendChild(a4Button);
  }
}

// function that runs if the user runs out of time.

function timesUp() {
  h1El.textContent = "oh noes, you ran out of time!";
  // set up div content to allow the usual score display and name entry

}

// function to return to the start screen - this needs to return everything on the screen to the beginning without removing scores

testButton.addEventListener("click", function goHome() {
  h1El.textContent = "Coding Quiz Challenge";
  startButton.setAttribute("class", "button");
  timeLeft = "xx";
});

/*
Anything down here in the slag heap didn't work as intended. Revisit later.
---------------
// loop(s) for mass class assignment
// assigns all input tags to the button class
/*
for (var i = 0; i < buttons.length; i++) {
  buttons[i].setAttribute("class", "button")
}

// object that contains the quiz questions


*/
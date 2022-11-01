/*
10/29/22
- Score doesn't display during the quiz - only at the end.
- Style the text in resultDiv.
- Style the entire app. (todo: align buttons in their own div)
- scores should be stored locally in an array
*/

// core variables

var body = document.body;
// header and its content
var header = document.createElement("header");
var navEl = document.createElement("nav");
var navDivTime = document.createElement("div");
var anchorEl = document.createElement("a");
// main content div - houses prompts, questions, and general information
var mainDiv = document.createElement("div");
var pEl = document.createElement("p");
var h1El = document.createElement("h1");
// div that displays whether an answer is correct or incorrect
var resultDiv = document.createElement("div");
// div that holds test buttons
var buttonDiv = document.createElement("div");
// div that will house score related content
var scoresDiv = document.createElement("div");
// text field exclusively for the scores div
var scoresP = document.createElement("p");
// input box for taking user's initials
var initEntry = document.createElement("input");
// empty array to store tester initials
var initials = [];
// global variable to hold a given tester's initials and score
var scoreEntry;
// empty array to be used for locally storing scores
var scores = [];
// global variable to count question number
var questionCounter;
// variable to allow external control of the timer
var timerStopper = 0;

// more buttons
var startButton = document.createElement("button");
var a1Button = document.createElement("button");
var a2Button = document.createElement("button");
var a3Button = document.createElement("button");
var a4Button = document.createElement("button");
var homeButton = document.createElement("button");
// special button for testing page content and function - not intended for final release
var testButton = document.createElement("button");
// submission button for scores
var scoreSubmit = document.createElement("button");

// test misc variables 
var timeLeft = "xx";
var myScore = 0;
var answered = 0;

// core text content

anchorEl.textContent = "this will be the high scores link";
navDivTime.textContent = "Time left: " + timeLeft;
h1El.textContent = "Coding Quiz Challenge";
pEl.textContent = "Try to answer the following JavaScript related questions before time runs out. Correct answers will extend your time while incorrect answers will reduce it.";
startButton.textContent = "Start!";
testButton.textContent = "test";
a1Button.textContent = "1";
a2Button.textContent = "2";
a3Button.textContent = "3";
a4Button.textContent = "4";
homeButton.textContent = "Go home?"

// class and id selector variables, if I end up using them.

var buttons = document.querySelectorAll("input");

// appending elements into the body tag
body.appendChild(header);
body.appendChild(mainDiv);
mainDiv.appendChild(h1El);
mainDiv.appendChild(pEl);
mainDiv.appendChild(scoresDiv);
mainDiv.appendChild(buttonDiv);
scoresDiv.appendChild(initEntry);
buttonDiv.appendChild(startButton);
buttonDiv.appendChild(testButton);
mainDiv.appendChild(resultDiv);
header.appendChild(navEl);
navEl.appendChild(anchorEl);
navEl.appendChild(navDivTime);
buttonDiv.appendChild(a1Button);
buttonDiv.appendChild(a2Button);
buttonDiv.appendChild(a3Button);
buttonDiv.appendChild(a4Button);
buttonDiv.appendChild(homeButton);

// setting up attributes for the appended elements

body.setAttribute("style", "background: rgb(106, 121, 149); height: 95vh;");
header.setAttribute("style", "margin: 5px; border: 2px solid white")
mainDiv.setAttribute("style", "padding: 30px; border: 2px solid black; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column;");
mainDiv.setAttribute("class", "mainDiv");
mainDiv.setAttribute("id", "mainDiv");
h1El.setAttribute("id", "mainDivH1");
pEl.setAttribute("id", "mainDivP");
scoresDiv.setAttribute("class", "hide-me");
scoresDiv.setAttribute("id", "scoresDiv");
buttonDiv.setAttribute("style", "display: flex; flex-direction: column; justify-content: flex-start;")
buttonDiv.setAttribute("id", "buttonDiv");
startButton.setAttribute("class", "button");
testButton.setAttribute("class", "hide-me");
a1Button.setAttribute("class", "hide-me");
a2Button.setAttribute("class", "hide-me");
a3Button.setAttribute("class", "hide-me");
a4Button.setAttribute("class", "hide-me");
homeButton.setAttribute("class", "hide-me");
scoreSubmit.setAttribute("class", "hide-me");
homeButton.setAttribute("class", "hide-me");
navEl.setAttribute("style", "display: flex; justify-content: space-between;");
navDivTime.setAttribute("style", "border: solid 1px red")
resultDiv.setAttribute("id", "resultDiv");
resultDiv.setAttribute("class", "hide-me");
// be sure to change the google placeholder link to a high scores link
anchorEl.setAttribute("href", "https://www.google.com");

var questionsObj = {
  questions: ["Which of the following is the primary role of JavaScript in web design?", "What is the result of the operation 4 % 2?", "What does the pop() method do to an array?", "What will the console output if a user enters 'console.log(isNaN(5));?", "Which option increases the value of i by one each time it occurs?"]
}

// object containing answers that correspond to the index of the related question from questionsObj

var answersObj = {
  // [2] is correct
  q0: ["Defining the content of a webpage", "Setting the layout of a webpage", "Adding interactivity and behavior to a webpage", "Ensuring a webpage appears in search engines"],
  // [0] is correct
  q1: ["0", "2", "NaN", ".5"],
  // [1] is correct
  q2: ["Duplicates all values in the array", "Removes the last element of an array", "Deletes the entire array", "Changes the array values to Starburst flavors"],
  // [3] is correct
  q3: ["true", "5", "Go Eagles!", "false"],
  // [2] is correct
  q4: ["i + 5", "i--", "i++", "i**"]
}

// function to start the timer and begin the quiz
startButton.addEventListener("click", function beginTest(){
  timeLeft = 10;
  testPhase();
  navDivTime.textContent = "Time left: " + timeLeft + " seconds.";
  var testTimer = setInterval(function () {
    if (timeLeft > 1 && timerStopper === 0) {
      navDivTime.textContent = "Time left: " + timeLeft + " seconds.";
      timeLeft--;
    } else if (timeLeft === 1 && timerStopper === 0) {
      navDivTime.textContent = "Time left: " + timeLeft + " second.";
      timeLeft--;
    } else if (timerStopper === 1) {
      clearInterval(testTimer);
    } else {
      navDivTime.textContent = "Time's up!";
      timesUp();
      clearInterval(testTimer);
    }
  }, 1000);
});

// function to transition from the home screen to the test
function testPhase(){
  // readies the content elements
  startButton.setAttribute("class", "hide-me");
  resultDiv.setAttribute("class", "");
  pEl.textContent = "";
  a1Button.setAttribute("class", "button");
  a2Button.setAttribute("class", "button");
  a3Button.setAttribute("class", "button");
  a4Button.setAttribute("class", "button");
  // calls the first question
  question1();
}

// function to award points and increase time on a correct answer
function correctAnswer() {
  myScore += 20;
  timeLeft += 10;
  resultDiv.textContent = "Your last answer was correct!"
}

// function to decrease remaining time by five seconds if the response is wrong
function wrongAnswer() {
  timeLeft -= 5;
  resultDiv.textContent = "Your last answer was wrong!"
}

// question functions 
function question1() {
  // Q1's correct answer is [2]
  pEl.textContent = questionsObj.questions[0];
  a1Button.textContent = "1. " + answersObj.q0[0];
  a2Button.textContent = "2. " + answersObj.q0[1];
  a3Button.textContent = "3. " + answersObj.q0[2];
  a4Button.textContent = "4. " + answersObj.q0[3];
  a1Button.addEventListener("click", wrongAnswer);
  a1Button.addEventListener("click", question2);
  a2Button.addEventListener("click", wrongAnswer);
  a2Button.addEventListener("click", question2);
  a3Button.addEventListener("click", correctAnswer);
  a3Button.addEventListener("click", question2);
  a4Button.addEventListener("click", wrongAnswer);
  a4Button.addEventListener("click", question2);
}

function question2() {
  // Q2's correct answer is [0]
  a1Button.removeEventListener("click", wrongAnswer);
  a1Button.removeEventListener("click", question2);
  a2Button.removeEventListener("click", wrongAnswer);
  a2Button.removeEventListener("click", question2);
  a3Button.removeEventListener("click", correctAnswer);
  a3Button.removeEventListener("click", question2);
  a4Button.removeEventListener("click", wrongAnswer);
  a4Button.removeEventListener("click", question2)
  pEl.textContent = questionsObj.questions[1];
  a1Button.textContent = "1. " + answersObj.q1[0];
  a2Button.textContent = "2. " + answersObj.q1[1];
  a3Button.textContent = "3. " + answersObj.q1[2];
  a4Button.textContent = "4. " + answersObj.q1[3];
  a1Button.addEventListener("click", correctAnswer);
  a1Button.addEventListener("click", question3);
  a2Button.addEventListener("click", wrongAnswer);
  a2Button.addEventListener("click", question3);
  a3Button.addEventListener("click", wrongAnswer);
  a3Button.addEventListener("click", question3);
  a4Button.addEventListener("click", wrongAnswer);
  a4Button.addEventListener("click", question3);
}

function question3() {
  // Q3's correct answer is [1]
  a1Button.removeEventListener("click", correctAnswer);
  a1Button.removeEventListener("click", question3);
  a2Button.removeEventListener("click", wrongAnswer);
  a2Button.removeEventListener("click", question3);
  a3Button.removeEventListener("click", wrongAnswer);
  a3Button.removeEventListener("click", question3);
  a4Button.removeEventListener("click", wrongAnswer);
  a4Button.removeEventListener("click", question3)
  pEl.textContent = questionsObj.questions[2];
  a1Button.textContent = "1. " + answersObj.q2[0];
  a2Button.textContent = "2. " + answersObj.q2[1];
  a3Button.textContent = "3. " + answersObj.q2[2];
  a4Button.textContent = "4. " + answersObj.q2[3];
  a1Button.addEventListener("click", wrongAnswer);
  a1Button.addEventListener("click", question4);
  a2Button.addEventListener("click", correctAnswer);
  a2Button.addEventListener("click", question4);
  a3Button.addEventListener("click", wrongAnswer);
  a3Button.addEventListener("click", question4);
  a4Button.addEventListener("click", wrongAnswer);
  a4Button.addEventListener("click", question4);
}

function question4() {
  // Q4's correct answer is [3]
  a1Button.removeEventListener("click", correctAnswer);
  a1Button.removeEventListener("click", question4);
  a2Button.removeEventListener("click", wrongAnswer);
  a2Button.removeEventListener("click", question4);
  a3Button.removeEventListener("click", wrongAnswer);
  a3Button.removeEventListener("click", question4);
  a4Button.removeEventListener("click", wrongAnswer);
  a4Button.removeEventListener("click", question4)
  pEl.textContent = questionsObj.questions[3];
  a1Button.textContent = "1. " + answersObj.q3[0];
  a2Button.textContent = "2. " + answersObj.q3[1];
  a3Button.textContent = "3. " + answersObj.q3[2];
  a4Button.textContent = "4. " + answersObj.q3[3];
  a1Button.addEventListener("click", wrongAnswer);
  a1Button.addEventListener("click", question5);
  a2Button.addEventListener("click", wrongAnswer);
  a2Button.addEventListener("click", question5);
  a3Button.addEventListener("click", wrongAnswer);
  a3Button.addEventListener("click", question5);
  a4Button.addEventListener("click", correctAnswer);
  a4Button.addEventListener("click", question5);
}

function question5() {
  // Q5's correct answer is [2]
  a1Button.removeEventListener("click", correctAnswer);
  a1Button.removeEventListener("click", question4);
  a2Button.removeEventListener("click", wrongAnswer);
  a2Button.removeEventListener("click", question4);
  a3Button.removeEventListener("click", wrongAnswer);
  a3Button.removeEventListener("click", question4);
  a4Button.removeEventListener("click", wrongAnswer);
  a4Button.removeEventListener("click", question4)
  pEl.textContent = questionsObj.questions[4];
  a1Button.textContent = "1. " + answersObj.q4[0];
  a2Button.textContent = "2. " + answersObj.q4[1];
  a3Button.textContent = "3. " + answersObj.q4[2];
  a4Button.textContent = "4. " + answersObj.q4[3];
  a1Button.addEventListener("click", wrongAnswer);
  a1Button.addEventListener("click", testComplete);
  a2Button.addEventListener("click", wrongAnswer);
  a2Button.addEventListener("click", testComplete);
  a3Button.addEventListener("click", correctAnswer);
  a3Button.addEventListener("click", testComplete);
  a4Button.addEventListener("click", wrongAnswer);
  a4Button.addEventListener("click", testComplete);
}

// function to move to the score entry screen assuming the test was completed
function testComplete() {
  a1Button.removeEventListener("click", correctAnswer);
  a1Button.removeEventListener("click", question5);
  a2Button.removeEventListener("click", wrongAnswer);
  a2Button.removeEventListener("click", question5);
  a3Button.removeEventListener("click", wrongAnswer);
  a3Button.removeEventListener("click", question5);
  a4Button.removeEventListener("click", wrongAnswer);
  a4Button.removeEventListener("click", question5);
  if (timeLeft > 1 && timerStopper === 0) {
    navDivTime.textContent = "Time left: " + timeLeft + " seconds.";
    timeLeft--;
  } else if (timeLeft === 1 && timerStopper === 0) {
    navDivTime.textContent = "Time left: " + timeLeft + " second.";
    timeLeft--;
  } else {
    navDivTime.textContent = "not sure how you messed this up, dev.";
  }
  timerStopper = 1;

  // this function's final line should call the function to display tester name input. leave resultDiv at first.

  // console logs for testing
  console.log("score = " + myScore);
  myScore = myScore * timeLeft;
  console.log("write me bro");
  console.log("Your score plus your time bonus is: " + myScore);
}
// function that runs if the user runs out of time.

function timesUp() {
  h1El.textContent = "oh noes, you ran out of time!";
  pEl.textContent = "Your final score is " + myScore + "."
  resultDiv.setAttribute("class", "hide-me");

  // button swaps
  a1Button.setAttribute("class", "hide-me");
  a2Button.setAttribute("class", "hide-me");
  a3Button.setAttribute("class", "hide-me");
  a4Button.setAttribute("class", "hide-me");
  homeButton.setAttribute("class", "button");
  // opens initials input
  nameEntry();
};

// function to display name entry on timeout or test completion

function nameEntry() {
  scoresDiv.setAttribute("class", "");
}

// function for score screen content to become active

// function to return to the start screen - this needs to return everything on the screen to the beginning without removing scores

homeButton.addEventListener("click", function goHome() {
  h1El.textContent = "Coding Quiz Challenge";
  startButton.setAttribute("class", "button");
  timeLeft = "xx";
  navDivTime.textContent = "Time left: " + timeLeft;
  startButton.setAttribute("class", "button");
  pEl.textContent = "Try to answer the following JavaScript related questions before time runs out. Correct answers will extend your time while incorrect answers will reduce it."
  homeButton.setAttribute("class", "hide-me");
  myScore = 0;
  resultDiv.setAttribute("class", "hide-me");
  scoresDiv.setAttribute("class", "hide-me");
  // add loop(s) to clear any event listeners still on answer buttons
});

/*
Thoughts for future functionality
---------------
// loop(s) for mass class assignment
// loop(s) for button reassignment in question functions
*/
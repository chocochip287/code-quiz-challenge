/*
11/1/22
- MVP ready. Future development considerations at the end.
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
// text field exclusively for the scores div and individual scores
var scoresP = document.createElement("p");
var scoreP0 = document.createElement("p");
var scoreP1 = document.createElement("p");
var scoreP2 = document.createElement("p");
var scoreP3 = document.createElement("p");
var scoreP4 = document.createElement("p");
// input box for taking user's name
var usernameEntry = document.createElement("input");
// object to hold scores
var scoreKeeper = {
  name: [],
  score: []
};
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
// submission button for username
var usernameSubmit = document.createElement("button");

// test misc variables 
var timeLeft = "xx";
var myScore = 0;
var answered = 0;

// core text content

anchorEl.textContent = "View High Scores";
navDivTime.textContent = "Time left: " + timeLeft;
h1El.textContent = "Coding Quiz Challenge";
pEl.textContent = "Try to answer the following JavaScript related questions before time runs out. Correct answers will extend your time while incorrect answers will reduce it.";
startButton.textContent = "Start!";
testButton.textContent = "test";
a1Button.textContent = "1";
a2Button.textContent = "2";
a3Button.textContent = "3";
a4Button.textContent = "4";
usernameSubmit.textContent = "Submit name"
homeButton.textContent = "Go home?"

// class and id selector variables, if I end up using them.

var buttons = document.querySelectorAll("input");

// appending elements into the body tag
body.appendChild(header);
body.appendChild(mainDiv);
mainDiv.appendChild(h1El);
mainDiv.appendChild(pEl);
mainDiv.appendChild(scoreP0);
mainDiv.appendChild(scoreP1);
mainDiv.appendChild(scoreP2);
mainDiv.appendChild(scoreP3);
mainDiv.appendChild(scoreP4);
mainDiv.appendChild(scoresDiv);
mainDiv.appendChild(buttonDiv);
scoresDiv.appendChild(usernameEntry);
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
buttonDiv.appendChild(usernameSubmit);
buttonDiv.appendChild(homeButton);


// setting up attributes for the appended elements

body.setAttribute("style", "background: rgb(106, 121, 149); height: 95vh;");
header.setAttribute("style", "margin: 5px")
mainDiv.setAttribute("style", "padding: 30px; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column;");
mainDiv.setAttribute("class", "mainDiv");
mainDiv.setAttribute("id", "mainDiv");
h1El.setAttribute("id", "mainDivH1");
pEl.setAttribute("id", "mainDivP");
anchorEl.setAttribute("id", "aEl");
scoreP0.setAttribute("class", "hide-me");
scoreP1.setAttribute("class", "hide-me");
scoreP2.setAttribute("class", "hide-me");
scoreP3.setAttribute("class", "hide-me");
scoreP4.setAttribute("class", "hide-me");
scoresDiv.setAttribute("class", "hide-me");
scoreP0.setAttribute("id", "sp0");
scoreP1.setAttribute("id", "sp1");
scoreP2.setAttribute("id", "sp2");
scoreP3.setAttribute("id", "sp3");
scoreP4.setAttribute("id", "sp4");
scoresDiv.setAttribute("id", "scoresDiv");
usernameEntry.setAttribute("id", "usernameEntry");
usernameEntry.setAttribute("placeholder", "Type your name here.");
usernameEntry.setAttribute("type", "text");
usernameEntry.setAttribute("name", "username");
usernameEntry.setAttribute("style", "text-align: center; margin-bottom: 3px;")
buttonDiv.setAttribute("style", "display: flex; flex-direction: column; justify-content: flex-start;")
buttonDiv.setAttribute("id", "buttonDiv");
startButton.setAttribute("class", "button");
testButton.setAttribute("class", "hide-me");
a1Button.setAttribute("class", "hide-me");
a2Button.setAttribute("class", "hide-me");
a3Button.setAttribute("class", "hide-me");
a4Button.setAttribute("class", "hide-me");
homeButton.setAttribute("class", "hide-me");
usernameSubmit.setAttribute("class", "hide-me");
homeButton.setAttribute("class", "hide-me");
navEl.setAttribute("style", "display: flex; justify-content: space-between;");
resultDiv.setAttribute("id", "resultDiv");
resultDiv.setAttribute("class", "hide-me");
anchorEl.setAttribute("href", "#mainDivP");

// event listener to make the high scores link call the scores content function

document.querySelector("#aEl").addEventListener("click", showScores);

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
  // ensures function calls for testComplete are removed from prior tests
  a1Button.removeEventListener("click", testComplete);
  a2Button.removeEventListener("click", testComplete);
  a3Button.removeEventListener("click", testComplete);
  a4Button.removeEventListener("click", testComplete);
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
  nameEntry();
  myScore = myScore * timeLeft;
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
  // opens username input
  nameEntry();
};

// function to display name entry on timeout or test completion

function nameEntry() {
  scoresDiv.setAttribute("class", "");
  usernameEntry.setAttribute("class", "");
  usernameSubmit.setAttribute("class", "button");
  a1Button.setAttribute("class", "hide-me");
  a2Button.setAttribute("class", "hide-me");
  a3Button.setAttribute("class", "hide-me");
  a4Button.setAttribute("class", "hide-me");
}

// function to collect user's name then push the input to local storage once name is submitted

usernameSubmit.addEventListener("click", collectUsername)
function collectUsername() {

  var username = document.querySelector("#usernameEntry").value

  if (username === "") {
    usernameEntry.setAttribute("placeholder", "You have to provide a name!")
  } else {
    localStorage.setItem("username", username);
    pushScore();
    showScores();
  }

}

// function to add the saved username and score to the scores object

function pushScore() {
  var username = localStorage.getItem("username");

  if (scoreKeeper.name.length < 6) {
    scoreKeeper.name.push(username);
    scoreKeeper.score.push(myScore);
  } else {
    scoreKeeper.name.shift();
    scoreKeeper.score.shift();
    scoreKeeper.name.push(username);
    scoreKeeper.score.push(myScore);
  }
}

// function for score screen content to become active

function showScores() {
  a1Button.setAttribute("class", "hide-me");
  a2Button.setAttribute("class", "hide-me");
  a3Button.setAttribute("class", "hide-me");
  a4Button.setAttribute("class", "hide-me");
  usernameSubmit.setAttribute("class", "hide-me");
  homeButton.setAttribute("class", "button");
  startButton.setAttribute("class", "hide-me");
  usernameEntry.setAttribute("class", "hide-me");
  resultDiv.setAttribute("class", "hide-me");
  pEl.setAttribute("class", "hide-me");

  h1El.textContent = "Recent Scores"

  if (scoreKeeper.name.length === 1) {
  scoreP0.setAttribute("class", "");
  scoreP0.textContent = scoreKeeper.name[0] + " - " + scoreKeeper.score[0];
  } else if (scoreKeeper.name.length === 2) {
  scoreP0.setAttribute("class", "");
  scoreP0.textContent = scoreKeeper.name[0] + " - " + scoreKeeper.score[0];
  scoreP1.setAttribute("class", "");
  scoreP1.textContent = scoreKeeper.name[1] + " - " + scoreKeeper.score[1];
  } else if (scoreKeeper.name.length === 3) {
  scoreP0.setAttribute("class", "");
  scoreP0.textContent = scoreKeeper.name[0] + " - " + scoreKeeper.score[0];
  scoreP1.setAttribute("class", "");
  scoreP1.textContent = scoreKeeper.name[1] + " - " + scoreKeeper.score[1];
  scoreP2.setAttribute("class", "");
  scoreP2.textContent = scoreKeeper.name[2] + " - " + scoreKeeper.score[2];
  } else if (scoreKeeper.name.length === 4) {
  scoreP0.textContent = scoreKeeper.name[0] + " - " + scoreKeeper.score[0];
  scoreP1.setAttribute("class", "");
  scoreP1.textContent = scoreKeeper.name[1] + " - " + scoreKeeper.score[1];
  scoreP2.setAttribute("class", "");
  scoreP2.textContent = scoreKeeper.name[2] + " - " + scoreKeeper.score[2];
  scoreP3.setAttribute("class", "");
  scoreP3.textContent = scoreKeeper.name[3] + " - " + scoreKeeper.score[3];
  } else if (scoreKeeper.name.length === 5) {
  scoreP0.textContent = scoreKeeper.name[0] + " - " + scoreKeeper.score[0];
  scoreP1.setAttribute("class", "");
  scoreP1.textContent = scoreKeeper.name[1] + " - " + scoreKeeper.score[1];
  scoreP2.setAttribute("class", "");
  scoreP2.textContent = scoreKeeper.name[2] + " - " + scoreKeeper.score[2];
  scoreP3.setAttribute("class", "");
  scoreP3.textContent = scoreKeeper.name[3] + " - " + scoreKeeper.score[3];
  scoreP4.setAttribute("class", "");
  scoreP4.textContent = scoreKeeper.name[4] + " - " + scoreKeeper.score[4];
  } else {
    startButton.setAttribute("class", "hide-me");
    scoreP0.setAttribute("class", "");
    scoreP0.textContent = "You'll have to get some scores first, boss.";
  }
}

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
  scoreP0.setAttribute("class", "hide-me");
  scoreP1.setAttribute("class", "hide-me");
  scoreP2.setAttribute("class", "hide-me");
  scoreP3.setAttribute("class", "hide-me");
  scoreP4.setAttribute("class", "hide-me");
  usernameSubmit.setAttribute("class", "hide-me");
  usernameEntry.setAttribute("value", "");
  pEl.setAttribute("class", "");
  resultDiv.textContent = "";
  timerStopper = 0;
  document.getElementById("usernameEntry").value = "";
  // add loop(s) to clear any event listeners still on answer buttons
});

/*
Thoughts for future functionality
---------------
- loop(s) for mass class assignment, specifically hide/reveal functionality given all of the appends
- loop to ensure that event listeners are cleared from test answer buttons
- loop(s) or generally more efficient design for button reassignment in question functions
- add functionality to sort the scoreKeeper values
- tl;dr, git gud at loops. this was pain incarnate.
*/
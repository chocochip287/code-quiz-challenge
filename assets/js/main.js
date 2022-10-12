// base level variables

var body = document.body;
var header = document.createElement("header");
var anchorEl = document.createElement("a")
var h1El = document.createElement("h1");
var divEl = document.createElement("div");

// class and id selector variables
var mainDiv = document.querySelector(".mainDiv");

// appending elements into the body tag
body.appendChild(header);
body.appendChild(divEl);
header.appendChild(anchorEl);

// setting up attributes for the appended elements
body.setAttribute("style", "background: rgb(106, 121, 149)");
body.children[1].setAttribute("style", "margin: 5px; border: 2px solid white")
// be sure to change the google placeholder link to a high scores link
anchorEl.setAttribute("href", "https://www.google.com");
divEl.setAttribute("style", "border: 2px solid black; margin: 5px");
divEl.setAttribute("class", "mainDiv");

// core text content
header.textContent = "this is filler/placeholder text for the header"
anchorEl.textContent = "this will be the high scores link";
divEl.textContent = "this is filler/placeholder text content for the main div";

// need a collection of objects that hold the questions
var questionsObj = {
  questions: ["Which of the following is the primary role of JavaScript in web design?", "What is the result of the operation 4 % 2?", "What does the pop() method do to an array?", "What will the console output if a user enters 'console.log(isNaN(5));?", "Which option increases the value of i by one each time it occurs?"],
}

// create objects containing the answer sets for each question
var answersObj = {
  answers0: ["Defining the content of a webpage", "Setting the layout of a webpage", "Adding interactivity and behavior to a webpage", "Ensuring a webpage appears in search engines"],
  answers1: ["!"],
  answers2: ["?"],
  answers3: ["@"],
  answers4: ["%"]
}

// need to keep a count of the question that is displayed
// need to keep score
// need to keep the time

// function to start the timer
function startTimer(){

}

// function to present and cycle questions
function addQuestion(){
  // create the question elements

  // modify the text/attributes
  // modify one of the attributes to say right or wrong

  // append all elements to something on the page

  // for all the buttons, add event listener

    // WHEN I answer a question
    // if answered correctly
    // add points
    // show as correct
    // WHEN I answer a question incorrectly
    // THEN time is subtracted from the clock
    // show as incorrect

    // after the answer, 
    // THEN I am presented with another question
    // need a function call to present the question

    // if no other questions,
    // go to highscore screen
}

function startQuiz(){
  // timer starts and I am presented with a question
  // need a function call to start the timer

  // need a function call to present the question
}

// eventListener here // when i click the start button


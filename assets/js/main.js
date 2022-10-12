// core variables

var body = document.body;
var header = document.createElement("header");
var navEl = document.createElement("nav");
var navDivEl = document.createElement("div");
var anchorEl = document.createElement("a");
var mainDiv = document.createElement("div");
var pEl = document.createElement("p");
var h1El = document.createElement("h1");

// core text content

// updating the page's title
anchorEl.textContent = "this will be the high scores link";

navDivEl.textContent = "the timer will go here"
h1El.textContent = "This is the header for the main content. It will be the question text and like.. each phase's main declaration."
pEl.textContent = "This is the paragraph tag in the main section. It's where content text will appear on the start screen and other appropriate screens"

// class and id selector variables

// appending elements into the body tag
body.appendChild(header);
body.appendChild(mainDiv);
mainDiv.appendChild(h1El);
mainDiv.appendChild(pEl);
header.appendChild(navEl);
navEl.appendChild(anchorEl);
navEl.appendChild(navDivEl);

// setting up attributes for the appended elements
body.setAttribute("style", "background: rgb(106, 121, 149); height: 95vh;");
header.setAttribute("style", "margin: 5px; border: 2px solid white")
mainDiv.setAttribute("style", "border: 2px solid black; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column;");
mainDiv.setAttribute("class", "mainDiv");
navEl.setAttribute("style", "display: flex; justify-content: space-between;")
navDivEl.setAttribute("style", "border: solid 1px red")
// be sure to change the google placeholder link to a high scores link
anchorEl.setAttribute("href", "https://www.google.com");

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


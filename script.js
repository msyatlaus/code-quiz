// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
// when the timer ends, the game ends and the results are displayed
// tie a prompt for the event..somethng like "game over. heres your score"
//create a master timer for the whole game
var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitButton = document.getElementById("submitButton");

var codeQuestions = document.getElementById("codeQuestions");
var choice1 = document.getElementById("one");
var choice2 = document.getElementById("two");
var choice3 = document.getElementById("three");
var choice4 = document.getElementById("four");
var correct = document.getElementById("correct");
var answerResponse = document.getElementById("answerResponse");

var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var questionButton = document.querySelector(".questionButton");

var quizChallengePage = document.getElementById("quizChallengePage");
var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");

var initialButton = document.getElementById("initialButton"); 
var initials = document.getElementById("initials"); 
var initialInput = document.getElementById("initialInput"); 

var allDone = document.getElementById("allDone");
var allDoneButtons = document.getElementById("form-inline");

var timer = document.getElementById("timer"); // Timer Variable 

// QUIZ QUESTION ARRAY
var quizQuestions = [
  {
  "codeQuestions" : "Javascript starts counting on...", 
  "one" : "1. 0",
  "two" : "2. 1",
  "three" : "3. 0 or 1",
  "four" : "4. Javascript does not cpount",
  "correct" : "1. 0",
  },{
  "codeQuestions" : "What is a varible?",
  "one" : "1. The answer",
  "two" : "2. The end of a for statemment",
  "three" : "3. A container for a piece of data",
  "four" : "4. curly brackets",
  "correct" : "3. A container for a piece of data",
  },{
  "codeQuestions" : "How do you declare varibles?",
  "one" : "1. var = element",
  "two" : "2. I declare a var",
  "three" : "3. var is ==",
  "four" : "4. var (keyword) =",
  "correct" : "4. var (keyword) =",
  },{
   "codeQuestions" : "What will an undeclared varible return?",
   "one" : "1. Undefined",
   "two" : "2. a for loop",
   "three" : "3. a fatal error",
   "four" : "4. an infinite loop",
   "correct" : "1. Undefined",
  },{
   "codeQuestions" : "What kind of value does a Boolean take?",
   "one" : "1. True or False",
   "two" : "2. a number",
   "three" : "3. a string",
   "four" : "4. a varible",
   "correct" : "1. True or False",
  },
]

var startScore = 0; 
var questionIndex = 0;





// STARTS QUIZ 
function startQuiz() { 
quizChallengePage.style.display = "none"; // Hide Rules 
quizQuestionsPage.style.display = "block"; // Show Quiz Questions Page

secondsLeft = 80; // seconds in Timer 

  var timerInterval = setInterval(function() { 
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);
}

// SHOW QUESTIONS
function showQuestions() {
  var q = quizQuestions[questionIndex];

  codeQuestions.innerHTML = q.codeQuestions;
  choice1.innerHTML = q.one;
  choice1.setAttribute("data-answer", q.one);
  choice2.innerHTML = q.two;
  choice2.setAttribute("data-answer", q.two);
  choice3.innerHTML = q.three;
  choice3.setAttribute("data-answer", q.three);
  choice4.innerHTML = q.four;
  choice4.setAttribute("data-answer", q.four);
}

// EVENT LISTENERS WHEN USER CLICKS ANSWERS 
showQuestions();
choice1.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice2.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice3.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice4.addEventListener("click", function (event) {
  checkAnswer(event);
})

 // CHECK TO SEE IF ANSWER IS CORRECT
function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
      correctAnswer = answer;
  }
  if (answer === correctAnswer) {
  answerResponse.textContent = "Correct!"; // If correct, say correct
  } else {
  answerResponse.textContent = "Wrong!"; // If wrong, say wrong & deduct 10 points
      
      
  }
//   if (quizQuestions.length === questionIndex+1) {
//     showFinalScore(); // If it has gone through all questions, show final score
//     return; // If not, print the next question
//   }
  questionIndex++;
  showQuestions();
}

// GO TO "ALL DONE" PAGE AND SHOW FINAL SCORE
function showFinalScore() { //Function to go to page when time out or quiz complete 
  quizQuestionsPage.style.display = "none"; // Hide Questions Page
  highScoreButtons.style.display = "none"; // Hide Questions Page
  finalScorePage.style.display = "block"; // Show Final Score Page 
  finalScoreIs.style.display = "block" // Show Final Score
  initials.style.display = "block" // Show initial input
  initialButton.style.display = "block" // Show initial button
  initialInput.style.display = "block" // Show initial input

    finalScoreIs.textContent = "Your final score is " + secondsLeft;
    initialButton.textContent = "Submit"; // Form button 
    initials.textContent = "Enter Your Initials: "; // Form text
} // end of showFinalScore

var highScoreArray = [] // Global variable 

// SHOWS ALL HIGH SCORES 
function showHighScores() {
  header.style.display = "none"; // Hide header 
  allDone.style.display = "none"; // Hide all done
  finalScoreIs.style.display = "none" // Hide Final Score
  initials.style.display = "none" // Hide initial input
  initialButton.style.display = "none" // Hide initial button
  initialInput.style.display = "none" // Hide initial button
  highScoreButtons.style.display = "block"; // Show Final Score Page 
  
  var getInitials = document.getElementById("initialInput").value; // captures the value of the initials 

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray)); // Adds array 

  var highScores = getInitials + ": " + secondsLeft; // add in + getInitials when read it

  $("#highScoreList").append(highScores) // Appends high score & initials
}

////////////EVENT LISTENERS////////////////

// START QUIZ - WORKS 
submitButton.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})

// CLICK TO VIEW HIGH SCORES - DOES NOT WORK 
score.addEventListener("click", function() {
  showHighScores();
  console.log("view high scores")
})

// CLICK INTIAL BUTTON TO SHOW HIGH SCORES - WORKS
initialButton.addEventListener("click", function() { 
  showHighScores();
  console.log("initial button")
}) 

// CLEAR HIGH SCORES - WORKS
clearHighScore.addEventListener("click", function() {
  localStorage.clear();
})

// GO BACK BUTTON EVENT liSTENER - WORKS 
goBack.addEventListener("click", function() { // Go back to the home page
  $("#highScoreList").empty() // clears out container
  $("#initialInput").val("") // clears out the value in initial input 
  resetVariables()
  codeQuizChallenge();
  console.log("restart quiz")
})



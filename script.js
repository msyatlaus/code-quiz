
var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitButton = document.getElementById("submitButton");
var codeQuestions = document.getElementById("codeQuestions");
var answerResponse = document.getElementById("answerResponse");
var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var questionButton = document.getElementsByClassName("questionButton");
var codeQuizPage = document.getElementById("codequizpage");
var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");
var timer = document.getElementById("timer"); // Timer Variable 
//change remaining questions in array
// QUIZ QUESTION ARRAY
var quizQuestions = [
  {
  "question" : "Javascript starts counting on...", 
  "possibleAnswers" : ["1. 0","2. 1","3. 0 or 1","4. Javascript does not count"],
  "correct" : "1. 0",
  },{
  "question" : "What is a varible?",
  "possibleAnswers": ["1. The answer", "2. The end of a for statemment", "3. A container for a piece of data", "4. curly brackets"],
  "correct" : "3. A container for a piece of data",
  },{
  "question" : "How do you declare varibles?", 
  "possibleAnswers": ["1. var = element","2. I declare a var", "3. var is ==", "4. var (keyword) ="],
  "correct" : "4. var (keyword) =",
  },{
   "question" : "What will an undeclared varible return?",
   "possibleAnswers" : ["1. Undefined","2. a for loop", "3. a fatal error", "4. an infinite loop",],
   "correct" : "1. Undefined",
  },{
   "question" : "What kind of value does a Boolean take?",
   "possibleAnswers" : ["1. True or False", "2. a number", "3. a string", "4. a varible",],
   "correct" : "1. True or False",
  },
]

var startScore = 0; 
var questionIndex = 0;
var secondsLeft = 60;

// STARTS QUIZ 
function startQuiz() { 
quizQuestionsPage.style.display = "none"; 
quizQuestionsPage.style.display = "block"; // Show Quiz Questions Page

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
codeQuestions.textContent = q.question
for (var i=0; i< questionButton.length; i++){
  questionButton[i].textContent = q.possibleAnswers[i]
}
}

// EVENT LISTENERS WHEN USER CLICKS ANSWERS 
showQuestions();
console.log(questionButton)
for (var i=0; i< questionButton.length; i++){
  questionButton[i].addEventListener("click", function (event) {
    checkAnswer(event);
  })
}
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


// START QUIZ - WORKS 
submitButton.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})





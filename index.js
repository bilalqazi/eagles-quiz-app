'use strict';

//quiz functions

let currentQuestion = 0;
let score = 0;

function renderQuizStart() {
  $('.js-question-body').html(`
  <div class="start-page">
    <h1>Are you ready to take this quiz?</h1>
    <h2>Press 'START' to begin!</h2>
    <button type="button" class="start-button" role="button">START!</button>
  </div>
  `);
  $('.js-questionandscore').html(`
  <h1>Question <span id="currentQuestion">0</span>/10</h1>
  <h1>Score: <span id="currentScore">${score}</span></h1>
  `);
  startQuiz();
}

function startQuiz() {
  console.log('quiz start ran');
  $('.js-question-body').on('click', '.start-button', event => {
    console.log('start button pressed');
    renderQuizQuestion();
    renderAside();
  });
}

function renderQuizQuestion() {
  console.log('`renderQuizQuestion` ran');
  
let answers = STORE[currentQuestion].answers
  
  $('.js-question-body').html(`
    <form class="question-form js-question-form" role="form">
      <fieldset role="group">
       
        <label>
          <span class="question">${STORE[currentQuestion].question}</span>
        </label>
            
        <label class="js-answer-choice answer-choice">
          <input type="radio" role="radio" name="answer" value="${answers[0]}" required>
          <span>${answers[0]}</span>
        </label>
          
        <label class="js-answer-choice answer-choice">
          <input type="radio" role="radio" name="answer" value="${answers[1]}" required>
          <span>${answers[1]}</span>
        </label>
          
        <label class="js-answer-choice answer-choice">
          <input type="radio" role="radio" name="answer" value="${answers[2]}" required>
          <span>${answers[2]}</span>
        </label>
          
        <label class="js-answer-choice answer-choice">
          <input type="radio" role="radio" name="answer" value="${answers[3]}" required>
          <span>${answers[3]}</span>
        </label>
          
        <div class="center-button" role="region">
          <button type="submit" class="submit-button js-submit-button" role="button">
            <span>Submit</span>
          </button>
        </div>
        
    </fieldset>
      
  </form>`
    );
  
}

function handleAnswerSelection() {
  $('.js-question-form').on('click', `.js-answer-choice`, event => {
    console.log('an answer has been chosen');

  });
}

function handleAnswerSubmission() {
  $('.js-question-body').on('submit', '.js-question-form', event => {
    console.log('an answer has been submitted');

    event.preventDefault();
    
    answerResults();
    renderAsideResults();
  });
}

function answerResults() {
  let submittedAnswer = $('input:checked').val()
  let correctAnswer = STORE[currentQuestion].correctAnswer
  if (currentQuestion < 10) {
  currentQuestion++;
  }
  if (currentQuestion >= 10) {
  currentQuestion = 10;
  }
  console.log('answerResults ran', submittedAnswer);
  if (submittedAnswer === correctAnswer) {
    score++;
    $('.js-question-body').html(`
    <div class="start-page" role="region">
    <h2>
      Good Job! You got it right!
    </h2>
    <button type="button" id="answerResults" role="button">
      Continue
    </button>
    </div>
    `);
  }
  else {
    $('.js-question-body').html(`
    <div class="start-page" role="region">
    <h2>
      Nope!
    </h2>
    <h2>
      The correct answer is ${correctAnswer}!
    </h2>
    <button type="button" id="answerResults" role="button">
      Continue
    </button>
    </div>
    `);
  }
}

function handleNextQuestion() {
  $('.js-question-body').on('click', `#answerResults`, event => {
    console.log('next question pressed');
    if (currentQuestion < 10) {
    renderQuizQuestion();
    renderAside();
    }
    else if (currentQuestion >= 10 && score === 10) {
      $('.js-question-body').html(`
      <div class="start-page" role="region">
      <h1>Congrats on finishing this quiz!</h1>
      <h2>You got a perfect score of ${score}!</h2>
      <h2>You lit up the quiz like Nick Foles in the Super Bowl!</h2>
      <h2>Would you like to try again?</h2>
      <button type="button" class="start-button" role="button">RESTART</button>
      </div>
      `);
      currentQuestion = 0;
      score = 0;
    }
    else if (currentQuestion >= 10 && score < 10 && score >= 7) {
      $('.js-question-body').html(`
      <div class="start-page" role="region">
      <h1>Congrats on finishing this quiz!</h1>
      <h2>You got a final score of ${score}!</h2>
      <h2>You're like the Andy Reid of Eagles Triva! So close to winning the whole thing!</h2>
      <h2>Would you like to try again and get a perfect score?</h2>
      <button type="button" class="start-button" role="button">RESTART</button>
      </div>
      `);
      currentQuestion = 0;
      score = 0;
    }
    else if (currentQuestion >= 10 && score < 7) {
      $('.js-question-body').html(`
      <div class="start-page" role="region">
      <h1>Congrats on finishing this quiz!</h1>
      <h2>You got a final score of ${score}!</h2>
      <h2>You really don't know your Eagles trivia!</h2>
      <h2>You should try again</h2>
      <button type="button" class="start-button" role="button">RESTART</button>
      </div>
      `);
      currentQuestion = 0;
      score = 0;
    }
  });
}

function renderAside () {
  
  if (currentQuestion >= 10) {
  currentQuestion === 10;
  $('.js-questionandscore').html(`
  <h1>Question <span id="currentQuestion">${currentQuestion}</span>/10</h1>
  <h1>Score: <span id="currentScore">${score}</span></h1>
  `);
  }
  else {
  $('.js-questionandscore').html(`
  <h1>Question <span id="currentQuestion">${currentQuestion + 1}</span>/10</h1>
  <h1>Score: <span id="currentScore">${score}</span></h1>
  `);
  }
}

function renderAsideResults () {
  
  if (currentQuestion >= 10) {
  currentQuestion === 10;
  $('.js-questionandscore').html(`
  <h1>Question <span id="currentQuestion">${currentQuestion}</span>/10</h1>
  <h1>Score: <span id="currentScore">${score}</span></h1>
  `);
  }
  else {
  $('.js-questionandscore').html(`
  <h1>Question <span id="currentQuestion">${currentQuestion}</span>/10</h1>
  <h1>Score: <span id="currentScore">${score}</span></h1>
  `);
  }
}

function handleQuiz() {
  renderQuizStart();
  handleAnswerSelection();
  handleAnswerSubmission();
  handleNextQuestion();
}

$(handleQuiz);








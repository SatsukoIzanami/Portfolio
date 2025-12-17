// components/fun/quiz.js
class QuizGame extends HTMLElement {
  constructor() {
    super();
    // track current question index and score
    this.currentQuestion = 0;
    this.score = 0;
    this.answered = false;
    // quiz questions with options and correct answer index
    this.questions = [
      {
        question: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language"
        ],
        correct: 0
      },
      {
        question: "Which of these is NOT a JavaScript framework?",
        options: [
          "React",
          "Vue",
          "Angular",
          "Java"
        ],
        correct: 3
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Creative Style System",
          "Cascading Style Sheets",
          "Colorful Style Sheets"
        ],
        correct: 2
      },
      {
        question: "Which HTML tag is used for the largest heading?",
        options: [
          "<h6>",
          "<h1>",
          "<head>",
          "<heading>"
        ],
        correct: 1
      },
      {
        question: "What is the purpose of the 'alt' attribute in an img tag?",
        options: [
          "To set the image alignment",
          "To provide alternative text for accessibility",
          "To set the image size",
          "To link the image to another page"
        ],
        correct: 1
      }
    ];
  }

  connectedCallback() {
    // render when component is added to page
    if (!this.hasChildNodes()) {
      this.render();
    }
  }

  render() {
    const container = document.createElement('div');
    container.className = 'quiz-container';

    // show question or results screen
    if (this.currentQuestion < this.questions.length) {
      // display current question
      const question = this.questions[this.currentQuestion];
      
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question-container';

      const questionText = document.createElement('h3');
      questionText.className = 'quiz-question';
      questionText.textContent = question.question;

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';

      // create option buttons for each answer
      question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.dataset.index = index;
        optionBtn.addEventListener('click', () => this.selectAnswer(index));
        optionsDiv.appendChild(optionBtn);
      });

      // create controls div for progress and next button
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'quiz-actions';

      // show progress indicator
      const progress = document.createElement('span');
      progress.className = 'quiz-progress';
      progress.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;

      // next button disabled until answer selected
      const nextBtn = document.createElement('button');
      nextBtn.className = 'quiz-button primary';
      nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Finish' : 'Next';
      nextBtn.disabled = true;
      nextBtn.addEventListener('click', () => this.nextQuestion());

      // append progress and next button to controls div
      controlsDiv.append(progress, nextBtn);

      // append question text, options, and controls to question div
      questionDiv.append(questionText, optionsDiv, controlsDiv);
      // append question div to container
      container.appendChild(questionDiv);

      // store next button for reference
      this.nextButton = nextBtn;
      // store options for reference
      this.options = Array.from(optionsDiv.querySelectorAll('.quiz-option'));
    } else {
      // show results screen after quiz complete
      const resultsDiv = document.createElement('div');
      resultsDiv.className = 'quiz-score show';

      // create title for results screen
      const title = document.createElement('h3');
      title.textContent = 'Quiz Complete!';

      // create score display
      const scoreDisplay = document.createElement('div');
      scoreDisplay.className = 'quiz-score-display';
      scoreDisplay.textContent = `${this.score} / ${this.questions.length}`;

      // create score text
      const scoreText = document.createElement('p');
      scoreText.className = 'quiz-score-text';
      const percentage = (this.score / this.questions.length) * 100;
      if (percentage === 100) {
        scoreText.textContent = 'Perfect score! 🎉';
      } else if (percentage >= 80) {
        scoreText.textContent = 'Great job! 🌟';
      } else if (percentage >= 60) {
        scoreText.textContent = 'Good effort! 👍';
      } else {
        scoreText.textContent = 'Keep practicing! 💪';
      }

      // create restart button
      const restartBtn = document.createElement('button');
      restartBtn.className = 'quiz-button primary';
      restartBtn.textContent = 'Try Again';
      restartBtn.addEventListener('click', () => this.restart());

      // append title, score display, score text, and restart button to results div
      resultsDiv.append(title, scoreDisplay, scoreText, restartBtn);
      // append results div to container
      container.appendChild(resultsDiv);
    }

    // append container to component
    this.appendChild(container);
  }

  // select answer and update score
  selectAnswer(selectedIndex) {
    // prevent multiple answer selections
    if (this.answered) return;
    // set answered flag to true
    this.answered = true;
    // get current question
    const question = this.questions[this.currentQuestion];
    // get correct answer index
    const correctIndex = question.correct;

    // highlight correct answer in green and incorrect in red
    this.options.forEach((option, index) => {
      // disable option button
      option.disabled = true;
      if (index === correctIndex) {
        // add correct class
        option.classList.add('correct');
      } else if (index === selectedIndex && index !== correctIndex) {
        // add incorrect class
      } else if (index === selectedIndex && index !== correctIndex) {
        option.classList.add('incorrect');
      }
    });

    // increment score if correct
    if (selectedIndex === correctIndex) {
      this.score++;
    }

    // enable next button after answer selected
    this.nextButton.disabled = false;
  }

  // advance to next question
  nextQuestion() {
    // if answer not selected, return and do nothing
    if (!this.answered) return;
    
    // increment current question index
    this.currentQuestion++;
    // set answered flag to false
    this.answered = false;
    // clear and render new question
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    this.render();
  }

  // restart quiz
  restart() {
    // reset current question index to 0
    this.currentQuestion = 0;
    // reset score to 0
    this.score = 0;
    // set answered flag to false
    this.answered = false;
    // clear and render new quiz
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    this.render();
  }
}

customElements.define('quiz-game', QuizGame);

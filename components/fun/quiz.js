// components/fun/quiz.js
class QuizGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
    if (!this.shadowRoot.hasChildNodes()) {
      this.render();
    }
  }

  render() {
    // create component styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        color: #e5e7eb;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }
      
      * {
        box-sizing: border-box;
      }
      
      .quiz-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        visibility: visible;
        opacity: 1;
      }

      h2 {
        margin: 0 0 16px;
        color: #e5e7eb;
        font-size: clamp(20px, 3vw, 26px);
        display: block;
      }

      .question-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .question-text {
        font-size: 1.1rem;
        color: #e5e7eb;
        margin: 0;
        line-height: 1.5;
        display: block;
      }

      .options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
      }

      .option {
        padding: 12px 16px;
        border: 1px solid #1a2440;
        border-radius: 10px;
        background: #0a1224;
        color: #e5e7eb;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        font-size: 0.95rem;
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      .option:hover:not(:disabled) {
        border-color: #2a4478;
        background: #0f172a;
        transform: translateX(4px);
      }

      .option:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }

      .option.correct {
        background: rgba(34, 197, 94, 0.15);
        border-color: #22c55e;
        color: #22c55e;
      }

      .option.incorrect {
        background: rgba(239, 68, 68, 0.15);
        border-color: #ef4444;
        color: #ef4444;
      }

      .controls {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }

      .button {
        padding: 10px 18px;
        border-radius: 999px;
        border: 1px solid #1b2a4a;
        background: #0a1224;
        color: #d7dbe6;
        font-size: var(--size-sm);
        cursor: pointer;
        transition: border-color 0.18s ease, transform 0.18s ease;
      }

      .button:hover:not(:disabled) {
        border-color: #2a4478;
      }

      .button:active:not(:disabled) {
        transform: translateY(1px);
      }

      .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .button.primary {
        background: linear-gradient(135deg, var(--brand, #6ee7f5) 0%, var(--brand-2, #7aa2ff) 100%);
        border-color: transparent;
        color: #0b1220;
        font-weight: 500;
      }

      .button.primary:hover:not(:disabled) {
        opacity: 0.9;
      }

      .progress {
        color: var(--muted, #9aa4b2);
        font-size: 0.9rem;
      }

      .results {
        text-align: center;
        padding: 24px 0;
      }

      .score-display {
        font-size: 2rem;
        font-weight: 600;
        margin: 16px 0;
        background: linear-gradient(135deg, var(--brand, #6ee7f5), var(--brand-2, #7aa2ff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .score-text {
        color: var(--muted, #9aa4b2);
        margin-bottom: 20px;
      }
    `;

    const container = document.createElement('div');
    container.className = 'quiz-container';

    // show question or results screen
    if (this.currentQuestion < this.questions.length) {
      // display current question
      const question = this.questions[this.currentQuestion];
      
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-container';

      const questionText = document.createElement('h3');
      questionText.className = 'question-text';
      questionText.textContent = question.question;

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'options';

      // create option buttons for each answer
      question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option';
        optionBtn.textContent = option;
        optionBtn.dataset.index = index;
        optionBtn.addEventListener('click', () => this.selectAnswer(index));
        optionsDiv.appendChild(optionBtn);
      });

      // create controls div for progress and next button
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'controls';

      // show progress indicator
      const progress = document.createElement('span');
      progress.className = 'progress';
      progress.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;

      // next button disabled until answer selected
      const nextBtn = document.createElement('button');
      nextBtn.className = 'button primary';
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
      this.options = Array.from(optionsDiv.querySelectorAll('.option'));
    } else {
      // show results screen after quiz complete
      const resultsDiv = document.createElement('div');
      resultsDiv.className = 'results';

      // create title for results screen
      const title = document.createElement('h2');
      title.textContent = 'Quiz Complete!';

      // create score display
      const scoreDisplay = document.createElement('div');
      scoreDisplay.className = 'score-display';
      scoreDisplay.textContent = `${this.score} / ${this.questions.length}`;

      // create score text
      const scoreText = document.createElement('p');
      scoreText.className = 'score-text';
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
      restartBtn.className = 'button primary';
      restartBtn.textContent = 'Try Again';
      restartBtn.addEventListener('click', () => this.restart());

      // append title, score display, score text, and restart button to results div
      resultsDiv.append(title, scoreDisplay, scoreText, restartBtn);
      // append results div to container
      container.appendChild(resultsDiv);
    }

    // append styles and container to shadow root
    this.shadowRoot.append(style, container);
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
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
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
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.render();
  }
}

customElements.define('quiz-game', QuizGame);

import { useState } from "react";

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correct: 0,
  },
  { question: "Which of these is NOT a JavaScript framework?", options: ["React", "Vue", "Angular", "Java"], correct: 3 },
  { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2 },
];

export default function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const question = quizQuestions[current];
  const complete = current >= quizQuestions.length;

  const selectAnswer = (index: number) => {
    if (answered || complete) return;
    setAnswered(true);
    setSelected(index);
    if (index === question.correct) setScore((s) => s + 1);
  };

  if (complete) {
    return (
      <div className="quiz-container">
        <article className="quiz-score show">
          <h3>Quiz Complete!</h3>
          <div className="quiz-score-display">
            {score} / {quizQuestions.length}
          </div>
          <button
            className="quiz-button primary"
            type="button"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setAnswered(false);
              setSelected(null);
            }}
          >
            Try Again
          </button>
        </article>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <article className="quiz-question-container">
        <h3 className="quiz-question">{question.question}</h3>
        <div className="quiz-options">
          {question.options.map((opt, idx) => (
            <button
              key={opt}
              type="button"
              className={`quiz-option ${answered && idx === question.correct ? "correct" : ""} ${
                answered && selected === idx && idx !== question.correct ? "incorrect" : ""
              }`}
              disabled={answered}
              onClick={() => selectAnswer(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="quiz-actions">
          <span className="quiz-progress">
            Question {current + 1} of {quizQuestions.length}
          </span>
          <button
            className="quiz-button primary"
            type="button"
            disabled={!answered}
            onClick={() => {
              setCurrent((i) => i + 1);
              setAnswered(false);
              setSelected(null);
            }}
          >
            {current === quizQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </article>
    </div>
  );
}

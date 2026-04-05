import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-quiz-game',
  imports: [CommonModule, MatButtonModule, MatProgressBarModule, MatCardModule],
  templateUrl: './quiz-game.html',
  styleUrl: './quiz-game.css'
})
export class QuizGame {
  readonly questions: QuizQuestion[] = [
    {
      question: 'What does HTML stand for?',
      options: [
        'HyperText Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlink and Text Markup Language'
      ],
      correct: 0
    },
    {
      question: 'Which of these is NOT a JavaScript framework?',
      options: ['React', 'Vue', 'Angular', 'Java'],
      correct: 3
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Creative Style System',
        'Cascading Style Sheets',
        'Colorful Style Sheets'
      ],
      correct: 2
    },
    {
      question: 'Which HTML tag is used for the largest heading?',
      options: ['<h6>', '<h1>', '<head>', '<heading>'],
      correct: 1
    },
    {
      question: "What is the purpose of the 'alt' attribute in an img tag?",
      options: [
        'To set the image alignment',
        'To provide alternative text for accessibility',
        'To set the image size',
        'To link the image to another page'
      ],
      correct: 1
    }
  ];

  currentQuestion = signal(0);
  score = signal(0);
  answered = signal(false);
  selectedIndex = signal<number | null>(null);

  selectAnswer(index: number): void {
    if (this.answered()) return;
    this.answered.set(true);
    this.selectedIndex.set(index);
    const q = this.questions[this.currentQuestion()];
    if (index === q.correct) {
      this.score.update((s) => s + 1);
    }
  }

  next(): void {
    if (!this.answered()) return;
    this.currentQuestion.update((i) => i + 1);
    this.answered.set(false);
    this.selectedIndex.set(null);
  }

  restart(): void {
    this.currentQuestion.set(0);
    this.score.set(0);
    this.answered.set(false);
    this.selectedIndex.set(null);
  }

  optionClass(i: number): Record<string, boolean> {
    const q = this.questions[this.currentQuestion()];
    if (!this.answered()) return {};
    return {
      correct: i === q.correct,
      incorrect: this.selectedIndex() === i && i !== q.correct
    };
  }

  resultMessage(): string {
    const pct = (this.score() / this.questions.length) * 100;
    if (pct === 100) return 'Perfect score! 🎉';
    if (pct >= 80) return 'Great job! 🌟';
    if (pct >= 60) return 'Good effort! 👍';
    return 'Keep practicing! 💪';
  }

  progressPercent(): number {
    return ((this.currentQuestion() + 1) / this.questions.length) * 100;
  }
}

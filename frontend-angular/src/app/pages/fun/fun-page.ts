import { Component } from '@angular/core';
import { MessageEncoder } from '../../components/message-encoder/message-encoder';
import { QuizGame } from '../../components/quiz-game/quiz-game';

@Component({
  selector: 'app-fun-page',
  imports: [QuizGame, MessageEncoder],
  templateUrl: './fun-page.html',
  styleUrl: './fun-page.css'
})
export class FunPage {}

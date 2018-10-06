import { QuestionsService } from './../service/questions.service';
import { Component, OnInit } from '@angular/core';

import { PartyQuestion, PartyQuestionResponse } from './../interfaces/question';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public questions: PartyQuestion[] = [];
  public activeQuestion: PartyQuestion;

  constructor(private questionService: QuestionsService) {
  }

  ngOnInit() {
      this.questionService.load().subscribe((res: PartyQuestionResponse) => {
      this.questions = res.questions;
      this.setQuestion();
    });
  }

  setQuestion() {
    console.log(this.questions);
    if (this.questions.length > 0) {
      let selectedQuestion = Math.floor(Math.random() * this.questions.length);

      this.activeQuestion = this.questions[selectedQuestion];
      this.questionService.setQuestionColor(this.activeQuestion.background);
    }
  }
}

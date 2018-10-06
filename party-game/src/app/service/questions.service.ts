import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { DomController } from '@ionic/angular';

import { PartyQuestion, PartyQuestionResponse } from './../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(public http: HttpClient, private domCtrl: DomController, @Inject(DOCUMENT) private document, ) { }

  load() {
    return this.http.get('assets/question.json');
  }

  setQuestionColor(color) {
    this.domCtrl.write(() => {
      document.documentElement.style.setProperty('--ion-background-color', color);
    });
  }
}

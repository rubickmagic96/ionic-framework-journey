import { PusherService } from './../../services/pusher/pusher.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';

interface Message {
  id: string,
  text: string,
  timeStamp: Date,
  type: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;
  showEmojis = false;
  score = {
    tone: '',
    score: 0
  };

  constructor(
    private http: HttpClient,
    private pusher: PusherService) { }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('message', (data) => {
      if (data.id !== this.lastMessageId) {
        const message: Message = {
          ...data,
          type: 'incoming'
        };
        this.showEmojis = true;
        this.score = data.sentiment;
        this.messages = this.messages.concat(message);
      }
    })
  }

  sendMessage() {
    console.log('clickable');
    console.log(this.message);
    if (this.message !== '') {
      this.lastMessageId = v4();
      this.showEmojis = false;

      const data = {
        id: this.lastMessageId,
        text: this.message
      };

      this.http.post(`http://localhost:4000/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            type: 'outgoing'
          }
          this.messages = this.messages.concat(message);
          this.message = '';
        });
    }
  }

  selectEmoji(e) {
    const emoji = String.fromCodePoint(e);
    this.message += `${emoji}`;
    this.showEmojis = false;
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing'
    }
  }
}

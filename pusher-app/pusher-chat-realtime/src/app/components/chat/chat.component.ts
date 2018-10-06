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

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  sendMessage() {
    if (this.message !== '') {
      this.lastMessageId = v4();

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

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoin'
    }
  }
}

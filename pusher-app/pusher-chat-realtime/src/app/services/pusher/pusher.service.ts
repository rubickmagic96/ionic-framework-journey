import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  channel: any;

  constructor() {
    var pusher = new Pusher('576dbef8f7eda6c71172', {
      cluster: 'ap1',
      encrypted: true
    });
    this.channel = pusher.subscribe('chat');
  }

  init() {
    return this.channel;
  }
}

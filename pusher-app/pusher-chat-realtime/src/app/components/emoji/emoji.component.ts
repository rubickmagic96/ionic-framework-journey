import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  emojiList = {
    positive: [128512, 128513, 128536, 128516],
    neutral: [128528, 128529, 128566, 129300],
    negative: [128543, 128577, 128546, 128542],
  };

  @Input() result = {};
  @Input() showEmojis: boolean = false;
  @Output() onEmojiSelect: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  codePoint(emojiCodePoint) {
    return String.fromCodePoint(emojiCodePoint);
  }

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    this.onEmojiSelect.emit(emoji);
  }

}

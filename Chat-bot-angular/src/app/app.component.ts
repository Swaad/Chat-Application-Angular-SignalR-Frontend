// import { Component, OnInit } from '@angular/core';
// import { MessageDto } from 'src/app/Dto/MessageDto';
// import { ChatService } from './Service/chat.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {

//   constructor(private chatService: ChatService) {}

//   ngOnInit(): void {
//     this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => {
//       this.addToInbox(receivedObj);
//     });
//   }

//   msgDto: MessageDto = new MessageDto();
//   msgInboxArray: MessageDto[] = [];

//   send(): void {
//     if(this.msgDto) {
//       if(this.msgDto.user.length === 0 || this.msgDto.msgText.length === 0) {
//         window.alert("Both fields are required.");
//         return;
//       } else {
//         this.chatService.broadcastMessage(this.msgDto);
//         this.msgDto.msgText = ''; // Clear the message input field after sending
//       }
//     }
//   }

//   addToInbox(obj: MessageDto): void {
//     let newObj = new MessageDto();
//     newObj.user = obj.user;
//     newObj.msgText = obj.msgText;
//     this.msgInboxArray.push(newObj);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ChatService } from './Service/chat.service';
import { MessageDto } from './Dto/MessageDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = '';
  message = '';
  messages: MessageDto[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  
  }

  send(): void {
    if (this.user.length === 0 || this.message.length === 0) {
      window.alert('Both fields are required.');
      return;
    } else {
      let msgDto = new MessageDto();
      msgDto.user = this.user;
      msgDto.msgText = this.message;
      this.chatService.broadcastMessage(msgDto);
      this.message = '';
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.messages.push(newObj);
  }
}


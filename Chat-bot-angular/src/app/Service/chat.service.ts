// import { Injectable, OnInit } from '@angular/core';
// import * as signalR from '@microsoft/signalr';          // import signalR
// import { HttpClient } from '@angular/common/http';
// import { MessageDto } from '../Dto/MessageDto';
// import { Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {

//    private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:5000/chathub")   // mapping to the chathub as in startup.cs
//                                          .configureLogging(signalR.LogLevel.Information)
//                                          .build();
//    readonly POST_URL = "http://localhost:5000/api/chat/send"
//                         //http://localhost:5000/api/Chat/send

//   private receivedMessageObject: MessageDto = new MessageDto();
//   private sharedObj = new Subject<MessageDto>();

//   constructor(private http: HttpClient) { 
//     this.connection.onclose(async () => {
//       await this.start();
//     });
//    this.connection.on("ReceiveOne", (user: any, message: any) => { this.mapReceivedMessage(user, message); });
//    this.start();                 
//   }


//   // Strart the connection
//   public async start() {
//     try {
//       await this.connection.start();
//       console.log("connected");
//     } catch (err) {
//       console.log(err);
//       setTimeout(() => this.start(), 55000);
//     } 
//   }

//   private mapReceivedMessage(user: string, message: string): void {
//     this.receivedMessageObject.user = user;
//     this.receivedMessageObject.msgText = message;
//     this.sharedObj.next(this.receivedMessageObject);
//  }

//   /* ****************************** Public Methods **************************************** */

//   // Calls the controller method
//   public broadcastMessage(msgDto: any) {
//     console.log("msgDto: ",msgDto);
//     this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
//     // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
//   }

//   public retrieveMappedObject(): Observable<MessageDto> {
//     return this.sharedObj.asObservable();
//   }


// }

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MessageDto } from '../Dto/MessageDto'; // Adjust the import path

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection: signalR.HubConnection;
  readonly POST_URL = "http://localhost:5000/broadcast";

  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chathub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.onclose(async () => {
      await this.start();
    });

    this.connection.on("ReceiveMessage", (user: string, message: string) => {
      this.mapReceivedMessage(user, message);
    });

    this.start();
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public broadcastMessage(msgDto: any) {
    console.log("msgDto: ", msgDto);
    const postData = { user: msgDto.user, message: msgDto.msgText };
    this.http.post(this.POST_URL, postData).subscribe(data => console.log(data), error => console.error(error));
}


  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
}

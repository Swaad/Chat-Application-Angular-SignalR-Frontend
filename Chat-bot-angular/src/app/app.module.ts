import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatService } from './Service/chat.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // other components
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    FormsModule  // Add FormsModule here
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
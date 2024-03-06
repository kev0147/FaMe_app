import { Component } from '@angular/core';
import { Message, Patient } from '../models';
import { MessagesService } from '../messages.service';

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, onChildAdded, set, DatabaseReference } from "firebase/database";
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient.service';

const firebaseConfig = {
  apiKey: "AIzaSyAKpFyD-s6lg4Aad9X379Ttd9Zj_4Ex1nc",
  authDomain: "kajy-be921.firebaseapp.com",
  databaseURL: "https://kajy-be921-default-rtdb.firebaseio.com",
  projectId: "kajy-be921",
  storageBucket: "kajy-be921.appspot.com",
  messagingSenderId: "37541453098",
  appId: "1:37541453098:web:2505af80948f4b9cabd253",
  measurementId: "G-4BKL9HJ2TS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messageText = '';
  messages: Message[] = []

  patientId: string | undefined;

  constructor(private messageService: MessagesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => this.createChat(params['patientId']), error => this.onError(error));
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(['']);
  }

  createChat(patientId: string) {
    if(patientId){
      this.patientId = patientId;
      this.messageService.createNewPatientChat(patientId);
      this.messages = this.messageService.getMessagesRealtime(patientId, this.messages);
    }else{
      console.log('pas de patient');
    }
  }

  sendMessage() {
    if (this.patientId) {
      this.messageService.patientSendMessageToAdmin(this.patientId, this.messageText);
      this.messageText = '';
    }
  }
}
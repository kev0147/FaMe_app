import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Message, Notif, Patient, Profile } from './models';
import { getDatabase, onValue, push, ref, onChildAdded, set, get, child, DatabaseReference} from "firebase/database";

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



@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  getReference(patientId:string):DatabaseReference{
    return ref(db, `patient/${patientId}/`);
  }

  createNotification(notif:Notif){
    push(ref(db, `notifications/`), { patient : notif.patient, type: 'inscription', date: new Date().toISOString(), dismissed: false });
  }

  createNewPatientChat(patientId:string){
    let reference = this.getReference(patientId);
    set(reference, {});
    push(reference, {receiver: patientId, sender: 1, message: `Bonjour . Comment allez vous ?`});

    let notification : Notif = {
      patient : patientId,
      type: 'inscription',
      date: new Date().toISOString(),
      dismissed: false
    }
    this.createNotification(notification);
  }

  patientSendMessageToAdmin(patientId:string, message:string){
    let reference = this.getReference(patientId);
    let time = this.getTheCurrentDate();
    push(reference,  {sender: patientId, receiver: 1, message: message, time: time});
  }


  getMessagesRealtime(patientId:string, messages: Message[]) : Message[]{
    let reference = this.getReference(patientId);
    onChildAdded(reference, (snapshot)=>{
      let messageObject : Message = snapshot.val();
      messages.push(messageObject);
    })
    return messages;
  }

  getMessagesStatic(patientId:string, messages: Message[]) : Message[]{
    let reference = this.getReference(patientId);
    get(reference).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.forEach((message)=>{
          let messageObject : Message = {
            key:message.key,
            sender:message.val().sender,
            receiver:message.val().receiver,
            message:message.val().message
          }
          messages.push(messageObject);
        })
      } else {
        console.log("No data available");
        this.createNewPatientChat(patientId);
        this.getMessagesStatic(patientId, messages);
      }
    }).catch((error) => {
      console.error(error);
    });
    return messages;
  }


  sendMessageToAny(patient:Patient, message:string, profileDestination:Profile){
    let reference = ref(db, patient.id+'/messages/');
    push(reference,  {sender: patient.profile.id, receiver: profileDestination.id, message: message});
    reference = ref(db, 'messages/'+profileDestination.id);
    push(reference,  {sender: patient.profile.id, receiver: profileDestination.id, message: message});
  }

  getTheCurrentDate(): string {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let currentDate = `${day}-${month}-${year} ${hour}:${minute}`;
    return currentDate;
  }
  
}

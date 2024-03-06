import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { DatabaseReference, getDatabase, onChildAdded, push, ref, set } from 'firebase/database';
import { Appointment, AppointmentSimple, Token, Notif } from './models';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from './environnement';

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
export class AppointmentsService {

  getReference(patientId:string):DatabaseReference{
    return ref(db, `appointment/${patientId}/`);
  }

  createNotification(notif:Notif){
    push(ref(db, `notifications/`), { patient : notif.patient, type: 'appointment', date: new Date().toISOString(), dismissed: false });
  }

  createPatientAppointment( appointment: Appointment){
    let reference = this.getReference(appointment.patient);
    push(reference, {patient: appointment.patient, date: appointment.date, time: appointment.time, prestation: appointment.prestation});


    let notification : Notif = {
      patient : appointment.patient,
      type: 'appointment',
      date: new Date().toISOString(),
      dismissed: false
    }
    this.createNotification(notification);
  }


  getDateAndTimeInString(date: Date): string {

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let currentDate = `${day}-${month}-${year} ${hour}:${minute}`;
    return currentDate;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later. Backend may not respond'));
  }

  makeHeader(token: Token){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${token.access}`})
    };
  }

  addAppointment(appointment:Appointment, token:Token):Observable<Appointment>{
    this.createPatientAppointment(appointment);
    const url = environment.appointments;
    const body = {patient:appointment.patient, prestation: appointment.prestation, date: appointment.date, time: `${appointment.date}T${appointment.time}`};
    console.log(body);
    return this.http.post<Appointment>(url, body, this.makeHeader(token)).pipe(
      catchError(this.handleError)
    );
  }

  formatDateForDjango(date:Date) {
    // Format date for Django date format (YYYY-MM-DD)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const djangoDateFormat = `${year}-${month}-${day}`;

    // Format date for Django datetime format (YYYY-MM-DDTHH:MM:SS)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const djangoDatetimeFormat = `${djangoDateFormat}T${hours}:${minutes}:${seconds}`;

    return { date: djangoDateFormat, datetime: djangoDatetimeFormat };
}

  constructor(private http: HttpClient) { }
}

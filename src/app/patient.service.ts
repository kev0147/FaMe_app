import { Injectable } from '@angular/core';
import { Patient, Token, User } from './models';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './environnement';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  

  constructor(private http: HttpClient) { }

  getTheLoggedInPatient(token: Token): Observable<Patient> {
    return this.http.get<Patient>(environment.getPatientFromToken, this.makeHeader(token))
      .pipe(
        catchError(this.handleError)
      );
  }

  makeHeader(token: Token){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${token.access}`})
    };
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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(environment.patientInscription, patient).pipe(
      catchError(this.handleError)
    );
  }

  getToken(user: User): Observable<Token> {
    return this.http.post<Token>(environment.token, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}

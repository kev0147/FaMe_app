import { Injectable } from '@angular/core';
import { Patient, Token } from './models';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientAuthentificationUrl = 'http://127.0.0.1:8000/api/getPatientFromToken/';

  constructor(private http: HttpClient) { }

  getTheLoggedInPatient(token: Token): Observable<Patient> {
    return this.http.get<Patient>(this.patientAuthentificationUrl, this.makeHeader(token))
      .pipe(
        catchError(this.handleError)
      );
  }

  makeHeader(token: Token){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer  ${token.access}`})
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
}

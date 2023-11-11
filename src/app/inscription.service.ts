import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Patient } from './models';
import { environment } from './environnement';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private backendUrl = environment.backendUrl;

  private inscriptionUrl = `${this.backendUrl}patientInscription/`; 

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  // inscription_patient
  addPatient(patient: Patient): Observable<Patient> {
    console.log(patient);
    return this.http.post<Patient>(this.inscriptionUrl, patient, this.httpOptions).pipe(
      catchError(this.handleError)
    );
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
    return throwError(() => new Error('Something bad happened'));
  }
}

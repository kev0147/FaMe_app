import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Prestation, Token } from './models';
import { environment } from './environnement';

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {

  constructor(private http: HttpClient) { }

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

  getPrestationById(token: Token, prestationId: number): Observable<Prestation> {
    const url = `${environment.prestations}/${prestationId}`;
    return this.http.get<Prestation>(url, this.makeHeader(token))
      .pipe(
        catchError(this.handleError)
      );
  }

}

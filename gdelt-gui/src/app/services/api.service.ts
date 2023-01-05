import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  baseurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // GET /countries
  allCountries(): Observable<any> {
    const url = this.baseurl + '/dropdown/countries';
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /sources
  allSources(): Observable<any> {
    const url = this.baseurl + '/dropdown/pressOrigins';
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET locations
  allLocations(): Observable<any> {
    const url = this.baseurl + '/dropdown/locations';
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /cameoCodes
  allCameoCodes(): Observable<any> {
    const url = this.baseurl + '/dropdown/cameoCodes';
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST /testQuery
  testQuery(body): Observable<any> {
    const url = this.baseurl + '/query/test';
    return this.http.post(url, body, {responseType: 'blob'})
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST /download
  download(body): Observable<any> {
    const url = this.baseurl + '/query/download';
    return this.http.post(url, body, {responseType: 'blob'})
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST /visualize
  visualize(body): Observable<any> {
    const url = this.baseurl + '/query';
    return this.http.post(url, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  //POST /topActors
  topActors(body): Observable<any> {
    const url = this.baseurl + '/query';
    return this.http.post(url, body)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        //`${error}`
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      }
    
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

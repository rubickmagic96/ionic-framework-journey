import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const apiUrl = "http://localhost:1337/localhost:3000/api/classroom";

@Injectable({
  providedIn: 'root'
})
export class ResApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('And error occured: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}` + ` body was: ${error.error}`
      )
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getProgrammingLang(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getProgrammingLangById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  setProgrammingLang(data): Observable<any> {
    const url = `${apiUrl}/add-programming-lang`;
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateProgrammingLang(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteProgrammingLang(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}

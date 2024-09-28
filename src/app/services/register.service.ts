import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://api.eternalhearts.com/register'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  registerUser(userData: RegistrationData): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(
      map(response => response),
      catchError(this.handleError<any>('registerUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // You can send the error to a remote logging infrastructure here
      return of(result as T);
    };
  }
}

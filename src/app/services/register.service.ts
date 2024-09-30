import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment config

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  religion: string;
  occupation: string;
  recaptcha: string;
  termsAccepted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  registerUser(userData: RegistrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData).pipe(
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

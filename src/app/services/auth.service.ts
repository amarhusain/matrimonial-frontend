import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment config


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  private http = inject(HttpClient);


  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, body).pipe(
      tap(response => {
        // Store the response in localStorage
        localStorage.setItem('userData', JSON.stringify(response));
        this.loggedInSubject.next(true); // Notify subscribers
      })
    );
  }

  // Method to get user data from localStorage
  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): Observable<any> {
    localStorage.removeItem('userData');
    this.loggedInSubject.next(false); // Notify subscribers
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {});
  }

  isLoggedIn(): boolean {
    return this.getUserData() !== null; // Check if user data exists
  }

  // Method to get observable for login status
  getLoggedInStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

}

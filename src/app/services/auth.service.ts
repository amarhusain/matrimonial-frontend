import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/login';  // Replace with your backend URL
  private logoutUrl = 'http://localhost:8080/api/auth/logout';  // Replace with your backend URL
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.loginUrl, body).pipe(
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
    return this.http.post<any>(this.logoutUrl, {});
  }

  isLoggedIn(): boolean {
    return this.getUserData() !== null; // Check if user data exists
  }

  // Method to get observable for login status
  getLoggedInStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

}

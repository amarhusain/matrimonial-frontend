import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../utils/constant';

@Injectable()
export class MfInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) {
    console.log('MfInterceptor instantiated');  // This should print when the interceptor is initialized
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get user data from localStorage
    const userData = this.authService.getUserData();
    console.log('hello mr coder outside')
    if (userData && userData.token) {  // Assuming the token is stored in userData
      // Clone the request and set the new header
      console.log('hello mr coder')
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.token}` // Adjust according to your token structure
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors here
        if (error.status === 401) {
          console.error('Unauthorized access:', error);

          // Handle the 401 error
          this.handle401Error();
        } else {
          // Handle other errors
          console.error('An error occurred:', error);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(): void {
    // Clear any stored authentication tokens
    this.authService.logout();

    // Redirect to login page
    this.router.navigate([APP_ROUTES.LOGIN]);

    // Optionally, show a notification to the user
    // this.notificationService.showError('Your session has expired. Please log in again.');
  }
}
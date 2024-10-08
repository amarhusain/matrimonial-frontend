import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MfInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
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

    return next.handle(request);
  }
}
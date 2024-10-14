import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { APP_ROUTES } from '../../utils/constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  REGISTER_PAGE = '/' + APP_ROUTES.REGISTER_PAGE;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Extract email and password from the form
      const username = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          this.router.navigateByUrl(APP_ROUTES.HOME);
        },
        error: (err: any) => console.error('Login failed', err)
      });
    } else {
      console.error('Form is invalid');
      // Optionally display form validation errors
    }
  }
}
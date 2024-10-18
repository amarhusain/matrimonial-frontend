import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { APP_ROUTES } from '../../../utils/constant';
import { countries, Country } from '../../../utils/country';
// import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  emailOrMobile: string = '';
  password: string = '';
  otp: string = '';
  signupId: string = '';
  showOtpInput: boolean = false;
  selectedCountryCode: string = '+91';  // Default country code
  isMobileNumber: boolean = false;

  passwordStrength = 0;
  passwordStrengthText = '';
  passwordStrengthColor = '';
  showPwdStrengthBar: boolean = false;

  countries: Country[] = countries;



  constructor(
    private authService: AuthService,
    private router: Router) {

  }


  selectCountry(country: Country) {
    this.selectedCountryCode = country.code;
    console.log('Selected country:', country);
  }
  onInputChange() {
    // Simple regex to check if input is likely a mobile number
    const mobileRegex = /^[0-9]+$/;
    this.isMobileNumber = mobileRegex.test(this.emailOrMobile);
  }


  onPwdInputChange() {
    if (this.password.length > 0) {
      this.showPwdStrengthBar = true;
    } else {
      this.showPwdStrengthBar = false
    }
    let strength = 0;
    if (this.password.match(/[a-z]+/)) strength += 20;
    if (this.password.match(/[A-Z]+/)) strength += 20;
    if (this.password.match(/[0-9]+/)) strength += 20;
    if (this.password.match(/[$@#&!]+/)) strength += 20;
    if (this.password.length >= 8) strength += 20;

    this.passwordStrength = strength;

    if (strength < 40) {
      this.passwordStrengthText = 'Weak';
      this.passwordStrengthColor = 'red';
    } else if (strength < 80) {
      this.passwordStrengthText = 'Medium';
      this.passwordStrengthColor = 'orange';
    } else {
      this.passwordStrengthText = 'Strong';
      this.passwordStrengthColor = 'green';
    }
  }


  initiateSignup() {
    let contactInfo = this.emailOrMobile;
    if (this.isMobileNumber) {
      contactInfo = this.selectedCountryCode + this.emailOrMobile;
    }

    this.authService.initiateSignup(contactInfo, this.password).subscribe(
      {
        next: (response: string) => {
          this.signupId = response.trim();
          this.showOtpInput = true;
          console.log('Signup initiation successfull');
        },
        error: (err: any) => {
          console.error('Signup initiation failed', err)
        }
      }
    );
  }

  validateOtpAndCompleteSignup() {
    this.authService.validateOtpAndCompleteSignup(this.signupId, this.otp).subscribe(
      {
        next: (response: any) => {
          console.log('Login successful', response);
          this.router.navigateByUrl(APP_ROUTES.LOGIN);
        },
        error: (err: any) => console.error('Login failed', err)
      }
    );
  }

}

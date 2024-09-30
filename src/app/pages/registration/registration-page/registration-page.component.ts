import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../../services/register.service';
// import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  passwordStrength = 0;
  passwordStrengthText = '';
  passwordStrengthColor = '';

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  currentStep = 1;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.step1Form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.step2Form = this.fb.group({
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
      gender: ['', [Validators.required]],
      religion: [''],
      occupation: ['']
    });

    this.step3Form = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue],
      // recaptcha: ['', Validators.required] 
      recaptcha: [''] // TODO
    });
  }

  ngOnInit() {
    this.step1Form.get('password')?.valueChanges.subscribe(
      (password: string) => {
        this.checkPasswordStrength(password);
      }
    );
  }

  checkPasswordStrength(password: string) {
    let strength = 0;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 20;
    if (password.length >= 8) strength += 20;

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

  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        return { 'underage': true };
      }
    }
    return null;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid) {
      const formData = {
        ...this.step1Form.value,
        ...this.step2Form.value,
        ...this.step3Form.value
      };
      console.log('Form submitted:', formData);
      this.registerService.registerUser(formData).subscribe(
        response => {
          console.log('Login successful', response);
          // Handle success (e.g., save token, redirect)
        },
        error => {
          console.error('Login failed', error);
          // Handle error (e.g., show error message)
        });
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './phone-verification.component.html',
  styleUrl: './phone-verification.component.scss'
})
export class PhoneVerificationComponent {

  phoneForm: FormGroup;
  countries = [
    { name: 'India', code: 'IN', dialCode: '+91' },
    { name: 'United States', code: 'US', dialCode: '+1' },
    // Add more countries as needed
  ];

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      country: ['IN', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit() {

  }

  onCountryChange() {
    const country = this.countries.find(c => c.code === this.country?.value);
    if (country) {
      // Update phone number validation based on country
      this.phoneForm.get('phoneNumber')?.setValidators([
        Validators.required,
        Validators.pattern(`^\\d{${country.code === 'IN' ? 10 : '7,15'}}$`)
      ]);
      this.phoneForm.get('phoneNumber')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.phoneForm.valid) {
      const country = this.countries.find(c => c.code === this.country?.value);
      const fullPhoneNumber = `${country?.dialCode}${this.phoneNumber?.value}`;
      console.log('Sending verification code to:', fullPhoneNumber);
      // Implement your SMS sending logic here
    }
  }

  get country() {
    return this.phoneForm.get('country');
  }

  get phoneNumber() {
    return this.phoneForm.get('phoneNumber');
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-register-widget',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-register-widget.component.html',
  styleUrl: './search-register-widget.component.scss'
})
export class SearchRegisterWidgetComponent {

  searchForm: FormGroup;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      minAge: ['', [Validators.min(18), Validators.max(100)]],
      maxAge: ['', [Validators.min(18), Validators.max(100)]],
      gender: [''],
      religion: [''],
      location: ['']
    });

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      console.log('Search form submitted', this.searchForm.value);
      // Implement search logic here
    }
  }

  onRegister() {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted', this.registrationForm.value);
      // Implement registration logic here
    }
  }

}

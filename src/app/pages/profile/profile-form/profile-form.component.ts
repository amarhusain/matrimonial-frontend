import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User, UserData } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {

  user: User | null = null;
  editingField: string | null = null;
  editValue: string = '';

  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userData: UserData = this.authService.getUserData();
    this.userService.getUserProfile(userData.id).subscribe({
      next: (user: any) => this.user = user,
      error: (err: any) => console.error('Error loading user profile', err)
    });
  }

  editField(field: string) {
    this.editingField = field;
    this.editValue = String(this.user?.[field as keyof User] || '');
  }

  saveEdit() {
    if (this.user && this.editingField) {
      const updatedUser = { ...this.user, [this.editingField]: this.editValue };
      this.userService.updateUserProfile(updatedUser).subscribe({
        next: (user: any) => {
          this.user = user;
          this.cancelEdit();
        },
        error: (err: any) => console.error('Error updating user profile', err)
      });
    }
  }

  cancelEdit() {
    this.editingField = null;
    this.editValue = '';
  }




  // profileForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.profileForm = this.fb.group({
  //     name: ['', Validators.required],
  //     age: ['', [Validators.required, Validators.min(18)]],
  //     gender: ['', Validators.required],
  //     religion: ['', Validators.required],
  //     preferences: ['']
  //   });
  // }

  // onSubmit() {
  //   if (this.profileForm.valid) {
  //     console.log(this.profileForm.value);
  //   }
  // }
}

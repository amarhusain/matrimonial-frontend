import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent {

  @Input() label: string = '';
  @Input() value: string | null = null;
  @Input() isVerified?: boolean = false;
  // @Input() isVerifyField: boolean = false;
  contactInfoValue: string = '';

  // Define methods for verify and edit actions
  verify() {
    // Implement verification logic
  }

  edit() {
    // Implement edit logic
  }

}

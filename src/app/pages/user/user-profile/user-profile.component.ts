import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { ProfileResponse } from '../../../models/profile.model';
import { LoaderService } from '../../../services/loader.service';
import { ProfileService } from '../../../services/profile.service';
import { UserService } from '../../../services/user.service';
import { CustomValidators } from '../../../utils/custom-validators';
import { incomes, occupations } from '../../../utils/occupation';
import { Religion, religions } from '../../../utils/religion';
import { states } from '../../../utils/state';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  profileResponse: any = null;
  profileForm: FormGroup;
  userForm: FormGroup;
  heightForm: FormGroup;
  profileCompletion: number = 0;
  editingField: string | null = null;
  loading: boolean = true;
  error: string | null = null;
  isEmailEditing: boolean = false;
  isMobileEditing: boolean = false;
  maxDate: string;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  occupations: string[] = occupations;
  incomes: string[] = incomes;
  religions: Religion[] = religions;
  availableSects: string[] = [];
  states: string[] = states;

  isLoading: boolean = true;
  imageLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private userService: UserService,
    public loaderService: LoaderService) {
    this.maxDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    this.profileForm = this.fb.group({
      dateOfBirth: ['', [
        CustomValidators.ageValidator,
        CustomValidators.futureDateValidator]
      ],
      height: [''],
      gender: [''],
      maritalStatus: [''],
      income: [''],
      religion: [''],
      sect: [''],
      occupation: [''],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      bio: [''],
      workplace: ['']
    });

    this.userForm = this.fb.group({
      email: [''],
      mobile: ['', [Validators.required, CustomValidators.mobileNumberValidator]],
      isMobileVerified: [''],
      isEmailVerified: ['']
    });

    this.heightForm = this.fb.group({
      feet: ['', [Validators.required, Validators.min(4), Validators.max(7)]],
      inches: ['', [Validators.required, Validators.min(0), Validators.max(11)]],
    });

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.profileResponse = data['profileResponse'];
      this.updateForms(this.profileResponse);
    });
  }

  updateForms(data: ProfileResponse): void {
    this.profileForm.patchValue(data.profile);
    this.userForm.patchValue(data.user);
    this.profileCompletion = data.profileCompletion;
    // this.imageUrl = data.profile.photoUrl;
    this.loadProfileImage(data.profile.photoUrl);
    if (!(data.profile.height === null || data.profile.height === '')) {
      this.extractHeight(data.profile.height);
    }

  }

  extractHeight(height: string): void {
    const heightRegex = /^(\d+)'(\d{1,2})"/;  // Regex pattern to match feet and inches
    const match = height.match(heightRegex);

    if (match) {
      let feet = match[1];  // Extract feet 
      let inches = match[2];  // Extract inches
      this.heightForm.setValue({
        feet: feet,
        inches: inches
      });
    }

    // console.log(`Feet: ${this.feet}, Inches: ${this.inches}`);
  }

  startEditing(field: string): void {
    if (field === 'sect' && !this.profileForm.get('religion')?.value) {
      alert('Please select religion first');
      return;
    } else {
      this.onReligionChange();
    }
    console.log(field)
    this.editingField = field;
  }

  saveEdit(field: string): void {
    this.editingField = null;
    const formGroup = field in this.profileForm.controls ? this.profileForm : this.userForm;
    let updatedValue = formGroup.get(field)?.value;
    if (field === 'religion' || field === 'sect') {
      const religion = formGroup.get('religion')?.value;
      const sect = formGroup.get('sect')?.value;

      this.profileService.updateReligionAndSect(religion, sect)
        .pipe(
          tap(() => {
            console.log('Religion and sect updated successfully:', religion, sect);
          }),
          catchError(error => {
            console.error('Error updating religion and sect:', error);
            throw error;
          })
        )
        .subscribe();
    } else {
      if (field === 'height') {
        // Convert the date to ISO format (YYYY-MM-DD)
        updatedValue = `${this.feet?.value}'${this.inches?.value}"`;
      }
      this.profileService.updateProfileField(field, updatedValue)
        .pipe(
          tap(() => {
            console.log('Field updated successfully:', field, updatedValue);
            if (field === 'height') {
              this.profileForm.patchValue({
                height: updatedValue
              })
            }
          }),
          catchError(error => {
            console.error('Error updating field:', error);
            // Optionally, revert the form value if the update failed
            // formGroup.patchValue({ [field]: originalValue });
            throw error;
          })
        )
        .subscribe();
    }
  }

  // private formatDate(date: Date): string {
  //   return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  // }

  cancelEdit(): void {
    this.editingField = null;
    // No need to reset the form as we're now using actual data
  }

  startEmailEditing() {
    this.isEmailEditing = true;
  }

  startMobileEditing() {
    this.isMobileEditing = true;
  }

  cancelUserFormEditing(field: string) {
    this.isMobileEditing = false;
    this.userForm.get(field)?.setValue('');

    // this.loadUserData(); // Reset to original data
  }

  saveUserChanges(field: string) {
    if (this.userForm.valid) {
      // Here you would typically call a service to save the data
      console.log('Saving:', this.userForm.value);

      const updatedValue = this.userForm.get(field)?.value;

      this.userService.updateUserField(field, updatedValue)
        .pipe(
          tap(() => {
            console.log('Field updated successfully:', field, updatedValue);
            this.isEmailEditing = false;
            this.isMobileEditing = false;
          }),
          catchError(error => {
            console.error('Error updating field:', error);
            // Optionally, revert the form value if the update failed
            // formGroup.patchValue({ [field]: originalValue });
            throw error;
          })
        )
        .subscribe();
    }
  }

  verifyEmail() {
    // Implement email verification logic
    console.log('Verifying email...');
  }

  verifyMobile() {
    // Implement mobile verification logic
    console.log('Verifying mobile...');
  }

  onReligionChange() {
    const selectedReligion = this.profileForm.get('religion')?.value;
    const religion = this.religions.find(r => r.name === selectedReligion);
    this.availableSects = religion ? religion.sects : [];
    this.profileForm.patchValue({ sect: '' });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadProfileImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.profileService.uploadProfileImage(formData).subscribe({
        next: (response: any) => {
          console.log('Image uploaded successfully');
          // this.loadProfileImage();
        },
        error: (err: any) => {
          console.error('Error uploading image', err);
        }
      });
    }
  }

  loadProfileImage(fileName: string) {
    this.profileService.getProfileImage(fileName).subscribe({
      next: (response: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);  // Convert Blob to base64 string
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;  // Set the image URL
        };
        // this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading profile image', err);
        this.isLoading = false;
      }
    });
  }

  // Function to allow only numeric digits
  allowOnlyDigits(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Prevent non-numeric input
    }
  }

  // Function to restrict the input to 10 digits only
  restrictToTenDigits(event: InputEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length > 10) {
      inputElement.value = inputElement.value.slice(0, 10); // Trim the input if it exceeds 10 digits
    }
  }

  // Convenience getter for easy access to form fields
  get mobile() {
    return this.userForm.get('mobile');
  }

  get feet() {
    return this.heightForm.get('feet');
  }

  get inches() {
    return this.heightForm.get('inches');
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  fileForm: FormGroup;
  fileToUpload: File | null = null;

  constructor(private fb: FormBuilder, private fileUploadService: FileUploadService) {
    this.fileForm = this.fb.group({
      file: [null],
    });
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = target.files?.item(0) || null;
  }

  uploadFile() {
    if (this.fileToUpload) {
      // Upload logic
      console.log('File uploaded:', this.fileToUpload.name);
      this.fileUploadService.uploadFile(this.fileToUpload).subscribe(
        response => {
          console.log('File uploaded successfully', response);
          // Handle success (e.g., show message)
        },
        error => {
          console.error('File upload failed', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
}

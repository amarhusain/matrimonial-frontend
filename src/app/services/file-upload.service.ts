import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = 'http://localhost:8080/api/upload';  // Replace with your backend URL

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Example of setting headers
    const headers = new HttpHeaders({
      // Authorization: 'Bearer token', // if required
    });

    return this.http.post<any>(this.uploadUrl, formData, { headers });
  }
}

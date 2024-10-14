import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  downloadImage(fileName: string): string {
    return `${this.apiUrl}/images/base65/${fileName}?token=${this.getUserData() ? this.getUserData().token : ''}`;
  }

  getUserData(): UserData {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}

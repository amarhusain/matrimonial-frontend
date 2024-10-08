import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileResponse } from '../models/profile.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getUserProfile(id: number): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profiles/${id}`);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profiles`, user);
  }

  updateProfileField(field: string, value: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/profiles/update-profile-field`, { [field]: value });
  }

  updateReligionAndSect(religion: string, sect: string | null): Observable<any> {
    let params = new HttpParams().set('religion', religion);
    if (sect) {
      params = params.set('sect', sect);
    }
    return this.http.put(`${this.apiUrl}/profiles/religion`, null, { params });
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/profiles/image`, formData);
  }

  getProfileImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/profiles/image`, { responseType: 'blob' });
  }

}

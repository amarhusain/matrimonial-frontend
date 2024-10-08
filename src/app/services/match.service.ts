import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchProfiles(searchCriteria: any): Observable<any[]> {
    // Send a GET request to the backend to search for profiles
    return this.http.get<any[]>(`${this.apiUrl}/matches/search`, { params: searchCriteria });
  }
}

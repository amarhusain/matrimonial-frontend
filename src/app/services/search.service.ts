import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileSearchDto } from '../models/profile.model';
import { PagedResponse, SearchCriteria } from '../models/search.model';




export interface ProfileResult {
  id: number;
  name: string;
  age: number;
  gender: string;
  religion: string;
  location: string;
  profilePicture: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = environment.apiUrl;
  private searchCriteria: SearchCriteria | null = null;
  private searchResults: PagedResponse<ProfileSearchDto> | null = null;

  constructor(private http: HttpClient) { }

  setSearchCriteria(criteria: SearchCriteria) {
    this.searchCriteria = criteria;
  }

  getSearchCriteria(): SearchCriteria | null {
    return this.searchCriteria;
  }

  setSearchResults(results: PagedResponse<ProfileSearchDto>) {
    this.searchResults = results;
  }

  getSearchResults(): PagedResponse<ProfileSearchDto> | null {
    return this.searchResults;
  }

  searchProfiles(criteria: SearchCriteria, page: number = 0, size: number = 10):
    Observable<PagedResponse<ProfileSearchDto[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        params = params.append(key, value.toString());
      }
    });

    return this.http.get<PagedResponse<ProfileSearchDto[]>>(`${this.apiUrl}/profiles/search`, { params });
  }

}

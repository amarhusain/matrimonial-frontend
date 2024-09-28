import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';


export interface SearchCriteria {
  minAge?: number;
  maxAge?: number;
  gender?: string;
  religion?: string;
  location?: string;
}

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

  private apiUrl = 'https://api.eternalhearts.com/search'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  searchProfiles(criteria: SearchCriteria): Observable<ProfileResult[]> {
    let params = new HttpParams();
    Object.keys(criteria).forEach(key => {
      if (criteria[key as keyof SearchCriteria]) {
        params = params.append(key, criteria[key as keyof SearchCriteria]!.toString());
      }
    });

    return this.http.get<ProfileResult[]>(this.apiUrl, { params }).pipe(
      map(response => response),
      catchError(this.handleError<ProfileResult[]>('searchProfiles', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // You can send the error to a remote logging infrastructure here
      return of(result as T);
    };
  }

}

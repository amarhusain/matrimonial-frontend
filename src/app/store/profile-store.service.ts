import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { ProfileSearchDto } from '../models/profile.model';
import { PagedResponse, ProfileSearchState, SearchCriteria } from '../models/search.model';


const initialState: ProfileSearchState = {
  searchCriteria: {
    lookingFor: 'bride',
    minAge: null,
    maxAge: null,
    minHeight: null,
    maxHeight: null,
    religion: '',
    sect: '',
    minIncome: null,
    maxIncome: null,
    maritalStatus: '',
    profilePhoto: 'no'
  },
  searchResults: null,
  isLoading: false,
  error: null
};

@Injectable({
  providedIn: 'root'
})
export class ProfileStoreService {

  private state$ = new BehaviorSubject<ProfileSearchState>(initialState);

  // Selectors
  selectSearchCriteria$ = this.select(state => state.searchCriteria);
  selectSearchResults$ = this.select(state => state.searchResults);
  selectIsLoading$ = this.select(state => state.isLoading);
  selectError$ = this.select(state => state.error);

  // Helper method for creating selectors
  private select<T>(selector: (state: ProfileSearchState) => T): Observable<T> {
    return this.state$.pipe(
      map(selector),
      distinctUntilChanged()
    );
  }

  // Method to get initial search criteria
  getInitialSearchCriteria(): SearchCriteria {
    return { ...initialState.searchCriteria };
  }

  // Actions
  updateSearchCriteria(criteria: Partial<SearchCriteria>) {
    this.updateState({
      searchCriteria: { ...this.state$.value.searchCriteria, ...criteria }
    });
  }

  // updateSearchResults(searchResults: PagedResponse<ProfileSearchDto[]>) {
  //   this.updateState({
  //     searchResults: { ...this.state$.value.searchResults, ...searchResults }
  //   });
  // }

  // Add a method to get the current search criteria
  getSearchCriteria(): SearchCriteria {
    return this.state$.value.searchCriteria;
  }

  setSearchResults(results: PagedResponse<ProfileSearchDto[]>) {
    this.updateState({ searchResults: results });
  }

  setLoading(isLoading: boolean) {
    this.updateState({ isLoading });
  }

  setError(error: string | null) {
    this.updateState({ error });
  }

  // Helper method to update state
  private updateState(partialState: Partial<ProfileSearchState>) {
    this.state$.next({
      ...this.state$.value,
      ...partialState
    });
  }

  // Method to reset the store to initial state
  resetStore() {
    this.state$.next(initialState);
  }
}

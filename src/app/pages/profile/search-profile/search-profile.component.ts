import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileSearchDto } from '../../../models/profile.model';
import { PagedResponse, SearchCriteria } from '../../../models/search.model';
import { SearchService } from '../../../services/search.service';
import { ProfileStoreService } from '../../../store/profile-store.service';
import { APP_ROUTES } from '../../../utils/constant';
import { occupations } from '../../../utils/occupation';
import { Religion, religions } from '../../../utils/religion';

@Component({
  selector: 'app-search-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-profile.component.html',
  styleUrl: './search-profile.component.scss'
})
export class SearchProfileComponent {

  profileId: string = '';
  criteria: SearchCriteria;

  isSearching = false;
  error: string | null = null;
  occupations: string[] = occupations;
  religions: Religion[] = religions;
  availableSects: string[] = [];
  isLoading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: ProfileStoreService,
    private searchService: SearchService) {
    // Use the new method to get initial search criteria
    this.criteria = this.store.getInitialSearchCriteria();
  }

  ngOnInit() {
    this.subscription.add(
      this.store.selectSearchCriteria$.subscribe(criteria => {
        this.criteria = { ...criteria };
      })
    );

    this.subscription.add(
      this.store.selectIsLoading$.subscribe(isLoading => {
        this.isLoading = isLoading;
      })
    );

    this.subscription.add(
      this.store.selectError$.subscribe(error => {
        this.error = error;
      })
    );
  }

  onCriteriaChange(key: keyof SearchCriteria, value: any) {
    this.store.updateSearchCriteria({ [key]: value });
  }

  selectLookingFor(selection: 'bride' | 'groom') {
    this.criteria.lookingFor = selection;
  }

  selectProfilePhoto(selection: 'no' | 'yes') {
    this.criteria.profilePhoto = selection;
  }

  onReligionChange() {
    const selectedReligion = this.criteria.religion;
    const religion = this.religions.find(r => r.name === selectedReligion);
    this.availableSects = religion ? religion.sects : [];
    this.criteria.sect = '';
  }

  onSubmitIdSearch() {
    console.log('Searching by Profile ID:', this.profileId);
    // Implement the logic to search by profile ID
  }

  onSubmitCriteriaSearch() {
    console.log('Searching by Criteria:', this.criteria);
    this.store.setLoading(true);
    this.store.setError(null);
    this.isSearching = true;
    // this.error = null;
    // this.searchService.setSearchCriteria(this.criteria);
    // Implement the logic to search by criteria
    this.searchService.searchProfiles(this.criteria, 0, 10).subscribe({
      next: (response: PagedResponse<ProfileSearchDto[]>) => {
        this.isSearching = false;
        this.store.setSearchResults(response);
        this.store.setLoading(false);
        this.router.navigate([`${APP_ROUTES.SEARCH_PROFILE_RESULT}`]);

      },
      error: (err) => {
        this.isSearching = false;
        this.store.setError('An error occurred while searching. Please try again.');
        this.store.setLoading(false);
        console.error('Search error:', err);
      }

    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

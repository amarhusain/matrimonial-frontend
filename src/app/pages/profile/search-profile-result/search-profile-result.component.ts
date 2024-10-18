import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationComponent } from '../../../common/components/pagination/pagination.component';
import { AgePipe } from '../../../common/pipes/age.pipe';
import { ProfileSearchDto } from '../../../models/profile.model';
import { PagedResponse, SearchCriteria } from '../../../models/search.model';
import { ImageService } from '../../../services/image.service';
import { ProfileService } from '../../../services/profile.service';
import { SearchService } from '../../../services/search.service';
import { ProfileStoreService } from '../../../store/profile-store.service';
import { APP_ROUTES, SEARCH_CRITERIA } from '../../../utils/constant';

@Component({
  selector: 'app-search-profile-result',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    DatePipe,
    AgePipe
  ],
  templateUrl: './search-profile-result.component.html',
  styleUrl: './search-profile-result.component.scss'
})
export class SearchProfileResultComponent {

  profiles: ProfileSearchDto[] = [];
  isLoading = false;
  totalElements = 0;
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;

  filters: Partial<SearchCriteria> & {
    occupation?: string;
    nationality?: string;
    city?: string;
  } = {}


  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: ProfileStoreService,
    private searchService: SearchService,
    private imageService: ImageService,
    private profileService: ProfileService
  ) {

  }

  ngOnInit() {
    this.subscription.add(
      this.store.selectSearchResults$.subscribe(results => {
        if (results) {
          this.updateResults(results);
        } else {
          // If no results are stored, navigate back to the search page
          this.router.navigate([`${APP_ROUTES.SEARCH_PROFILE}`]);
        }
      })
    );

    this.subscription.add(
      this.store.selectIsLoading$.subscribe(isLoading => {
        this.isLoading = isLoading;
      })
    );

    // Initialize filters with default search criteria
    this.filters = {
      minAge: SEARCH_CRITERIA.MIN_AGE,
      maxAge: SEARCH_CRITERIA.MAX_AGE,
      minHeight: SEARCH_CRITERIA.MIN_HEIGHT,
      maxHeight: SEARCH_CRITERIA.MAX_HEIGHT,
      minIncome: SEARCH_CRITERIA.MIN_INCOME,
      maxIncome: SEARCH_CRITERIA.MAX_INCOME
    };


  }

  updateResults(response: PagedResponse<ProfileSearchDto[]>) {
    this.profiles = response.content;
    this.totalPages = response.page.totalPages;
    this.currentPage = response.page.number;
    this.totalElements = response.page.totalElements;
  }

  applyFilters() {
    this.currentPage = 0;
    this.loadProfiles();
  }

  loadProfiles() {
    this.store.setLoading(true);
    this.searchService.searchProfiles({ ...this.store.getSearchCriteria(), ...this.filters }, this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.store.setSearchResults(response);
          this.store.setLoading(false);
        },
        error: (error) => {
          console.error('Error fetching profiles:', error);
          this.store.setError('Error fetching profiles. Please try again.');
          this.store.setLoading(false);
        }
      });
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProfiles();
    }
  }

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  viewProfile(profileId: number) {
    // Implement navigation to individual profile page
    console.log(`Viewing profile ${profileId}`);
  }

  backToSearch() {
    this.router.navigate([`${APP_ROUTES.SEARCH_PROFILE}`]);
  }

  getImageUrl(fileName: string): string {
    return this.imageService.downloadImage(fileName);
  }

  navigateToProfile(profileId: number) {

    this.profileService.checkSubscriptionStatus(profileId).subscribe({
      next: (hasSubscription: boolean) => {
        if (hasSubscription) {
          this.router.navigate([APP_ROUTES.PROFILE_DETAIL]);

        } else {
          this.router.navigate([APP_ROUTES.MEMBERSHIP]);
        }
      },
      error: (err: any) => {
        console.error('Subscription check failed', err);
      },
    });
    // if (this.authService.currentUser) {
    //   this.router.navigate([APP_ROUTES.UPGRADE_PROFILE]);
    // } else {
    //   this.router.navigate([APP_ROUTES.PROFILE_DETAIL_PAGE]);
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}



import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {

  constructor(
    private profileService: ProfileService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const profileId = route.paramMap.get('id');

    return this.profileService.checkSubscriptionStatus(Number(profileId)).pipe(
      map(hasSubscription => {
        if (hasSubscription) {
          return true;
        } else {
          // Navigate to the upgrade page
          this.router.navigate([`/profile/${profileId}/upgrade`]);
          return false;
        }
      })
    );
  }
}

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProfileResponse } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';

export const profileResolver: ResolveFn<ProfileResponse> = (route, state) => {
  const profileService = inject(ProfileService);
  const userId = route.paramMap.get('id');
  return profileService.getUserProfile(Number(userId));
};

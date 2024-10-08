import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../utils/constant';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.loggedInStatus) {
        return true;
    }

    router.navigate([`${APP_ROUTES.HOME}`], { queryParams: { returnUrl: state.url } });
    return false;
};
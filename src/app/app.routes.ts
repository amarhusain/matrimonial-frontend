import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { MembershipPageComponent } from './pages/membership/membership-page/membership-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { profileResolver } from './pages/profile/profile.resolver';
import { UserPageComponent } from './pages/user/user-page/user-page.component';
import { authGuard } from './security/auth.guard';
import { APP_ROUTES } from './utils/constant';

export const routes: Routes = [
    { path: '', redirectTo: '/' + APP_ROUTES.HOME, pathMatch: 'full' },  // Redirect to login by default
    { path: APP_ROUTES.HOME, component: HomePageComponent },
    {
        path: APP_ROUTES.USER_PAGE,
        title: 'User',
        component: UserPageComponent,
        children: [
            {
                path: 'register',
                loadComponent: () => import('./pages/user/registration-page/registration-page.component').then(m => m.RegistrationPageComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/user/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'profile/:id',
                loadComponent: () => import('./pages/user/user-profile/user-profile.component').then(m => m.UserProfileComponent),
                resolve: { profileResponse: profileResolver },
                canActivate: [authGuard]
            },
        ]
    },


    {
        path: APP_ROUTES.MATCHES,
        loadComponent: () => import('./pages/matches/matches.component').then(m => m.MatchesComponent),
        canActivate: [authGuard]
    },
    {
        path: APP_ROUTES.UPLOAD,
        loadComponent: () => import('./pages/file-upload/file-upload.component').then(m => m.FileUploadComponent)
    },
    {
        path: 'profile',
        title: "Profile",
        component: ProfilePageComponent,
        children: [
            {
                path: 'search',
                loadComponent: () => import('./pages/profile/search-profile/search-profile.component').then(m => m.SearchProfileComponent)
            },
            {
                path: "search-result",
                loadComponent: () => import('./pages/profile/search-profile-result/search-profile-result.component').then(m => m.SearchProfileResultComponent)
            },
            {
                path: "detail",
                loadComponent: () => import('./pages/profile/profile-detail/profile-detail.component').then(m => m.ProfileDetailComponent),
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: APP_ROUTES.MEMBERSHIP,
        title: "Membership",
        component: MembershipPageComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/membership/membership-plan/membership-plan.component').then(m => m.MembershipPlanComponent),
                canActivate: [authGuard]
            },
            {
                path: 'checkout',
                loadComponent: () => import('./pages/membership/checkout/checkout.component').then(m => m.CheckoutComponent),
                canActivate: [authGuard]
            },
            {
                path: 'order-confirmation',
                loadComponent: () => import('./pages/membership/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent),
                canActivate: [authGuard]
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page (optional)
];

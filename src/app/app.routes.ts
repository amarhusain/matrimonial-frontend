import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { profileResolver } from './pages/profile/profile.resolver';
import { authGuard } from './security/auth.guard';
import { APP_ROUTES } from './utils/constant';

export const routes: Routes = [
    { path: '', redirectTo: '/' + APP_ROUTES.HOME, pathMatch: 'full' },  // Redirect to login by default
    { path: APP_ROUTES.HOME, component: HomePageComponent },
    {
        path: APP_ROUTES.REGISTER,
        loadComponent: () => import('./pages/registration/registration-page/registration-page.component').then(m => m.RegistrationPageComponent)
    },
    {
        path: APP_ROUTES.LOGIN,
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: APP_ROUTES.PROFILE + '/:id',
        loadComponent: () => import('./pages/profile/profile-page/profile-page.component').then(m => m.ProfilePageComponent),
        resolve: { profileResponse: profileResolver },
        canActivate: [authGuard]
    },
    {
        path: APP_ROUTES.MATCHES,
        loadComponent: () => import('./pages/matches/matches.component').then(m => m.MatchesComponent)
    },
    {
        path: APP_ROUTES.UPLOAD,
        loadComponent: () => import('./pages/file-upload/file-upload.component').then(m => m.FileUploadComponent)
    },
    { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page (optional)
];

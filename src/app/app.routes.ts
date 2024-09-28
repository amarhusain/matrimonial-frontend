import { Routes } from '@angular/router';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { RegistrationPageComponent } from './pages/registration/registration-page/registration-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect to login by default
    { path: 'home', component: HomePageComponent },
    { path: 'register', component: RegistrationPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileFormComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'upload', component: FileUploadComponent },
    { path: '**', redirectTo: '/home' }  // Wildcard route for a 404 page (optional)
];

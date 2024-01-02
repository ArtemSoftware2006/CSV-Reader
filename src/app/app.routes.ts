import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CsvPanelPageComponent } from './pages/csv-panel-page/csv-panel-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AllFilesPageComponent } from './pages/all-files-page/all-files-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'csv-panel', component: CsvPanelPageComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'all-files', component: AllFilesPageComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'error', pathMatch: 'full'},
];

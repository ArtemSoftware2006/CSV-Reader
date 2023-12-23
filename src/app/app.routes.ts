import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CsvPanelPageComponent } from './pages/csv-panel-page/csv-panel-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'csv-panel', component: CsvPanelPageComponent}
];

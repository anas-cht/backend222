import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CurrenciesComponent } from './admin/currencies/currencies.component';
import { SupportmessagesComponent } from './admin/supportmessages/supportmessages.component';
import { AdminsManagementComponent } from './admin/admins-management/admins-management.component';

export const routes: Routes = [
    { path: 'admin/dashboard', component: DashboardComponent },
    { path: 'admin/currencies', component: CurrenciesComponent },
    { path: 'admin/supportmessages', component: SupportmessagesComponent},
    { path: 'admin/admins', component: AdminsManagementComponent},

    // { path: 'accounts', component: AccountsComponent },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent }
];

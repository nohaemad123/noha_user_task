import { Routes } from '@angular/router';
import { UserListComponent } from './users-list/users-list';
import { UserDetails } from './user-details/user-details';

export const userRoutes: Routes = [
    { path: '', component: UserListComponent },
    { path: ':id', component: UserDetails },

];

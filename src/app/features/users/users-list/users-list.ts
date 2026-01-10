import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loadUsers } from '../../../store/actions/user.actions';
import { UserState } from '../../../store/reducers/user.reducer';
import { UserCard } from '../../../shared/components/user-card/user-card';
import { IUser } from '../../../core/interfaces/Iuser';

export interface RootState {
  users: UserState;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatProgressSpinnerModule, UserCard],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss']
})
export class UserListComponent implements OnInit {
  private store = inject(Store) as Store<RootState>;
  private router = inject(Router);

  users$: Observable<IUser[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  pageSize = 10;

  constructor() {
    this.users$ = this.store.select(state => state.users.users);
    this.total$ = this.store.select(state => state.users.total);
    this.loading$ = this.store.select(state => state.users.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ limit: this.pageSize, skip: 0 }));
  }

  onPageChange(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.store.dispatch(loadUsers({ limit: event.pageSize, skip }));
  }

  goToDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}

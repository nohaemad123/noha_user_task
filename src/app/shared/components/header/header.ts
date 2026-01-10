import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, filter, map, Observable, switchMap, tap } from 'rxjs';
import { loadUserDetails } from '../../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { selectUserDetails } from '../../../store/selectors/user.selectors';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/Iuser';

@Component({
  selector: 'app-header',
  imports: [FormsModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  searchId = new FormControl('');;
  user$!: Observable<IUser | undefined>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.searchId.valueChanges.pipe(
      debounceTime(1000),
      map(value => value ? Number(value) : null),
      filter((id): id is number => id !== null),
      tap(id => this.store.dispatch(loadUserDetails({ userId: id }))),
      switchMap(id => this.store.select(selectUserDetails(id))),
      filter((user): user is IUser => !!user),
      tap(user => this.router.navigate(['/users', user.id]))
    ).subscribe();
  }
}

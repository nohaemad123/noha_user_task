import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { loadUserDetails } from '../../../store/actions/user.actions';
import { selectUserDetails } from '../../../store/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '../../../core/interfaces/Iuser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, MatButtonModule,
    MatIconModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  user$!: Observable<IUser | undefined>;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id) return of(undefined);

        this.store.dispatch(loadUserDetails({ userId: id }));
        return this.store.select(selectUserDetails(id));
      })
    );
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}

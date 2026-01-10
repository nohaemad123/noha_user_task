import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../core/services/user';

@Injectable()
export class UserEffects {

    private actions$ = inject(Actions);
    private userService = inject(UserService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(action =>
                this.userService.getUsers(action.limit, action.skip).pipe(
                    map(res => UserActions.loadUsersSuccess({ users: res.users, total: res.total })),
                    catchError(error => of(UserActions.loadUsersFailure({ error })))
                )
            )
        )
    );

    loadUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUserDetails),
            mergeMap(action =>
                this.userService.getUserById(action.userId).pipe(
                    map(user => UserActions.loadUserDetailsSuccess({ user })),
                    catchError(error => of(UserActions.loadUserDetailsFailure({ error })))
                )
            )
        )
    );
}

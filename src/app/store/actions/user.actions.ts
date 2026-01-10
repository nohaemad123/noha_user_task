import { createAction, props } from '@ngrx/store';
import { IUser } from '../../core/interfaces/Iuser';

export const loadUsers = createAction(
    '[User List] Load Users',
    props<{ limit: number; skip: number }>()
);

export const loadUsersSuccess = createAction(
    '[User List] Load Users Success',
    props<{ users: IUser[]; total: number }>()
);

export const loadUsersFailure = createAction(
    '[User List] Load Users Failure',
    props<{ error: any }>()
);

export const loadUserDetails = createAction(
    '[User Detail] Load User Details',
    props<{ userId: number }>()
);

export const loadUserDetailsSuccess = createAction(
    '[User Detail] Load User Details Success',
    props<{ user: IUser }>()
);

export const loadUserDetailsFailure = createAction(
    '[User Detail] Load User Details Failure',
    props<{ error: any }>()
);


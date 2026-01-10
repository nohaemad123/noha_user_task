import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { IUser } from '../../core/interfaces/Iuser';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
    selectUserState,
    (state: UserState) => state.users
);

export const selectTotalUsers = createSelector(
    selectUserState,
    (state: UserState) => state.total
);

export const selectUsersLoading = createSelector(
    selectUserState,
    (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
    selectUserState,
    (state: UserState) => state.error
);

export const selectUserDetails = (userId: number) => createSelector(
    selectUserState,
    (state: UserState): IUser | undefined => state.userDetails[userId]
);

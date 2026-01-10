import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { IUser } from '../../core/interfaces/Iuser';

export interface UserState {
    users: IUser[];
    total: number;
    userDetails: { [id: number]: IUser };
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    users: [],
    total: 0,
    userDetails: {},
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,

    on(UserActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(UserActions.loadUsersSuccess, (state, { users, total }) => ({
        ...state,
        users,
        total,
        loading: false
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    on(UserActions.loadUserDetails, (state) => ({ ...state, loading: true, error: null })),
    on(UserActions.loadUserDetailsSuccess, (state, { user }) => ({
        ...state,
        userDetails: { ...state.userDetails, [user.id]: user },
        loading: false
    })),
    on(UserActions.loadUserDetailsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);

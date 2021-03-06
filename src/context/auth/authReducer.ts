import {
    LOGOUT_USER,
    SET_CURRENT_USER,
    SET_AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    UPDATE_USER,
} from 'context/auth/authTypes';
import { User } from 'types/user';

type State = {
    isAuthenticated: boolean;
    currentUser: User | null;
    error: null | string;
};

type Action = {
    type: string;
    payload?: any;
};

export const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
    case LOGOUT_USER:
        return { ...state, currentUser: null, isAuthenticated: false };
    case SET_CURRENT_USER:
        return { ...state, currentUser: action.payload, isAuthenticated: true };
    case SET_AUTH_ERROR:
        return { ...state, error: action.payload, isAuthenticated: false };
    case UPDATE_USER:
        return { ...state, currentUser: action.payload };
    case CLEAR_AUTH_ERROR:
        return { ...state, error: null };
    default:
        return state;
    }
};

export default authReducer;
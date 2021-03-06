import React, { createContext, useContext, useReducer } from 'react';
//import { autoLogin } from 'utils/auth';
import { User } from 'types/user';
import { authReducer, LOGOUT_USER, SET_CURRENT_USER } from 'context/auth';
import { Auth } from 'aws-amplify';
import { AuthService, sessionService } from 'services';

export interface UserData {
    user: User;
    token: string;
}


/*
TODO: 
- Capire ad inizializzazione app come prendere utente
- Settare token expiring
- Valutare utilizzo cookies con nookies (NextJs)
*/

interface InitialStateType {
    isAuthenticated: boolean;
    currentUser: User | null;
    error: null | string;
    logout(): void;
    login(email: string, password: string, adminRedirect?: boolean): void;
    //updateUser(user: User): void;
}

const initialState = {
    isAuthenticated: false,
    currentUser: null,
    error: null,
    logout: (): void => null,
    login: (): void => null,
    //updateUser: () => null,
};

const AuthContext = createContext<InitialStateType>(initialState);

type Props = {
    currentUser: User | null;
};

export const AuthProvider: React.FC<Props> = ({ children, currentUser }) => {
    const initialState = {
        currentUser,
        error: null,
        isAuthenticated: currentUser ? true : false,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    // const { ref } = useRouter().query;

    const login = async (email: string, password: string): Promise<void> => {
        const { user, token } = await AuthService.login(email, password);
        console.log(user);
        console.log(token);
        const data: UserData = {
            user,
            token
        }
        sessionService.authenticate(data, () => {
            console.log('Done')
        })
        dispatch({ type: SET_CURRENT_USER, payload: user });
    };

    const logout = async (): Promise<void> => {
        try {
            await Auth.signOut();
            sessionService.removeCookie('token')
            sessionService.removeLocalStorage('user')
            console.log("Logout successfull");
        }
        catch (error) {
            console.log('error signing out: ', error);
        }
        dispatch({ type: LOGOUT_USER });
    };
    /*
  
    const updateUser = (user: User) => {
      dispatch({ type: UPDATE_USER, payload: user });
    };*/

    return (
        <AuthContext.Provider value={{ ...state, login, logout /*loginWithGoogle, signUp, updateUser*/ }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): InitialStateType => useContext(AuthContext);
import Router, { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer } from 'react';
//import { autoLogin } from 'utils/auth';
import { LOGOUT_USER, SET_CURRENT_USER, UPDATE_USER } from './authTypes';
import { User } from '../../types/user';
import reducer from './authReducer';
import Amplify, { Auth } from 'aws-amplify';
import { AuthService } from 'services';

interface UserDetails {
  email: string;
  password: string;
  name: string;
}

interface InitialStateType {
  isAuthenticated: boolean;
  currentUser: User | null;
  error: null | string;
  logout(): void;
  login(email: string, password: string, adminRedirect?: boolean): void;
  //loginWithGoogle(tokenId: string): void;
  //signUp(userDetails: UserDetails): void;
  //updateUser(user: User): void;
}

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  logout: () => null,
  login: () => null,
  //signUp: () => null,
  //loginWithGoogle: () => null,
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

  const [state, dispatch] = useReducer(reducer, initialState);
  const { ref } = useRouter().query;


  const login = async (email: string, password: string, adminRedirect?: boolean): Promise<void> => {
    const { user, token } = await AuthService.login(email, password);
    dispatch({ type: SET_CURRENT_USER, payload: user });
  };

  /*const loginWithGoogle = async (tokenId: string) => {
    const { user, token } = await AuthService.verifyGoogleIdToken(tokenId);
    loginSuccess(user, token);
  };

  const signUp = async ({ email, password, name }: UserDetails) => {
    const { user, token } = await AuthService.signUp({ email, password, name });
    loginSuccess(user, token);
  };
*/
  const logout = async() => {  
      console.log("HOHOHO");
      try {
          await Auth.signOut();
          console.log("Logout");
      } catch (error) {
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
import { User } from '../types/user';
//import { catchError } from 'utils/catchError';
//import { setAuthToken } from 'utils/auth';
import Amplify, { Auth } from 'aws-amplify';
//import apiClient from 'utils/apiClient';

interface UserData {
  user: User;
  token: string;
}

interface NewUser {
    confirmCode: boolean
}

/*interface UserPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}*/

/*interface UserFields {
  name: string;
  email: string;
  image: string | ArrayBuffer | null;
}*/

/*const getMe = async (token: string): Promise<UserData> => {
  setAuthToken(token);
  try {
    const { data } = await apiClient.get(`/auth/me`);

    const userData: UserData = {
      token: data.data.token,
      user: data.data.user,
    };

    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};*/


const login = async (email: string, password: string): Promise<UserData> => {

    let userReturn: UserData;
    let user: User;
    let token: string;

    try {
        Auth.signIn(email, password)
        .then(userObject => {
            if (userObject.challengeName === 'NEW_PASSWORD_REQUIRED') { // Non dovrebbe essere necessario credo se la password non ha scadenza. Da capire meglio
                var newPassword = password + "new";
                const { requiredAttributes } = userObject.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                Auth.completeNewPassword(
                    userObject,               // the Cognito UserObject Object
                    newPassword       // the new password
                )
                    .then(userObject => {
                        // at this time the user is logged in if no MFA required
                        console.log(userObject);
                        user = {
                            name: userObject.attributes.email,
                            imageURL: '',
                            carts: [],
                            role: 'user'
                        };
                        token = userObject.signInUserSession.accessToken;
                        console.log(user + '   ' + token);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                user = {
                    name: userObject.attributes.email,
                    imageURL: '',
                    carts: [],
                    role: 'user'
                };
                token = userObject.signInUserSession.accessToken;
                console.log(user);
            }
        })
    userReturn = {
      user: user,
      token: token,
    };
    return userReturn;
  } catch (error) {
    console.log(error);
  }
};



const signUp = async (email: string, password:string): Promise<NewUser> => {
    let confirm = false;
    try {        
            console.log(email);
            const { user } = await Auth.signUp({
                username: email,
                password
            });
            console.log("Registrazione effettuata");
            console.log(user);
            confirm = true;
    } catch (error) {
        console.log(error)
        confirm = false;
    }

    const userData: NewUser = {
        confirmCode: confirm
    };
    return userData;
};

const confirmCode = async(email: string, code: string): Promise<NewUser> => {
    //Sistemare codice
    try {
      await Auth.confirmSignUp(email, code);
      console.log("Codice confermato");
    } catch (error) {
        console.log('error confirming sign up', error);
    }
    //Rimandare a Login (da Context?)
    return ;
}

/*

export const changePassword = async (passwordFields: UserPasswordData): Promise<UserData> => {
  try {
    const url = `/auth/change-password`;
    const { data } = await apiClient.patch(url, passwordFields);
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const verifyGoogleIdToken = async (idToken: string): Promise<UserData> => {
  try {
    const url = `/auth/google`;
    const { data } = await apiClient.post(url, { idToken });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateProfile = async (
  userId: string,
  userFields: UserFields
): Promise<{ user: User }> => {
  try {
    const url = `/users/${userId}`;
    const { data } = await apiClient.patch(url, userFields, {
      params: { id: userId },
    });

    const userData: { user: User } = {
      user: data.data.user,
    };

    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

*/

export const AuthService = {
  //getMe,
  login,
  signUp,
  confirmCode,
  //verifyGoogleIdToken,
  //changePassword,
  //updateProfile,
};
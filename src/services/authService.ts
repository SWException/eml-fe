import { User } from 'types/user';
import awsconfig from 'aws-exports';
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure(awsconfig);

interface UserData {
    user: User;
    token: string;
}

interface NewUser {
    confirmCode: boolean
}

interface NewPassword {
    confirmPassword: boolean;
}

const login = async (email: string, password: string): Promise<UserData> => {

    let userReturn: UserData;
    //let userWithFields: User;
    //let token: string;

    try {
        const userObject = await LoginSupport(email, password);

        console.log(userObject)

        userReturn = {
            user: {
                email: userObject.attributes.email,
                name: userObject.attributes.name,
                imageURL: '',
                carts: [],
                role: 'admin' //Fix with group
            },
            token: userObject.signInUserSession.accessToken.jwtToken, //is ID_TOKEN?
        };
        return userReturn;
    }
    catch (error) {
        console.log(error);
    }
};

const LoginSupport = async (email: string, password: string): Promise<any>  => {
    const answer = Auth.signIn(email, password)
        .then(userObject => {
            if (userObject.challengeName === 'NEW_PASSWORD_REQUIRED') {
                const newPassword = password + "new";
                // const { requiredAttributes } = userObject.challengeParam;
                Auth.completeNewPassword(
                    userObject,
                    newPassword
                )
                    .then(userObject => {
                        return userObject;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else {
                return userObject;
            }
        });
    return answer;
}

const signUp = async (email: string, password: string, name: string, family_name: string): Promise<NewUser> => {
    let confirm = false;
    try {
        console.log(email);
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                name,
                family_name
            }
        });
        console.log("Registrazione effettuata");
        console.log(user);
        confirm = true;
    }
    catch (error) {
        console.log(error)
        confirm = false;
    }

    const userData: NewUser = {
        confirmCode: confirm
    };
    return userData;
};

const confirmCode = async (email: string, code: string): Promise<NewUser> => {
    //Sistemare codice
    try {
        await Auth.confirmSignUp(email, code);
        console.log("Codice confermato");
    }
    catch (error) {
        console.log('error confirming sign up', error);
    }
    //Rimandare a Login (da Context?)
    return;
}

export const changePassword = async (oldPass: string, newPass: string): Promise<UserData> => {
    try {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user);
                return Auth.changePassword(user, oldPass, newPass);
            })
            .then(data => console.log('success' + data))
        /*const userData: UserData = {
          user: data.data.user,
          token: data.data.token,
        };*/
        return;
    }
    catch (error) {
        console.log(error)
    }
};

Auth.currentAuthenticatedUser()
    .then(user => {
        console.log('User authenticated is ' + user);
    })
    .catch(err => { console.log(err) });


const forgotPassword = async (email: string): Promise<NewPassword> => {
    Auth.forgotPassword(email)
        .then(data => {
            console.log("invio codice " + data)
        })
        .catch(err => console.log(err));

    return;
}

const isNewPassword = async (email: string, code: string, password: string): Promise<NewPassword> => {
    Auth.forgotPasswordSubmit(email, code, password)
        .then(data => console.log("recuperato " + data))
        .catch(err => console.log(err));

    return;
}
/*
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
};*/

export const AuthService = {
    //getMe,
    login,
    signUp,
    confirmCode,
    changePassword,
    forgotPassword,
    isNewPassword
    //updateProfile,
};
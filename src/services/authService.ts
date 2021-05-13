import { User } from 'types/user';
import awsconfig from 'aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import cookie from 'js-cookie';

Amplify.configure(awsconfig);

// Aggiorno la sessione e rinnovo il token ogni volta che carico questo file
Auth.currentAuthenticatedUser()
    .then((user: CognitoUser)=>{
        user.refreshSession(user.getSignInUserSession().getRefreshToken(), () => {
            console.log("Session updated");
        });
    })
    .catch(() => {
        console.log("User not authenticated");
    });

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
                surname: userObject.attributes.family_name,
                imageURL: '',
                carts: [],
                role: 'Admin' //Fix with group
            },
            token: userObject.signInUserSession.accessToken.jwtToken, //is ID_TOKEN?
        };
        return userReturn;
    }
    catch (error) {
        console.log(error);
    }
};

const LoginSupport = async (email: string, password: string): Promise<{signInUserSession, attributes}> => {
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
    // Sistemare codice
    try {
        await Auth.confirmSignUp(email, code);
        console.log("Codice confermato");
    }
    catch (error) {
        console.log('error confirming sign up', error);
    }
    // Rimandare a Login (da Context?)
    return;
}

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

const getTokenJwt = async (): Promise<string> => {
    const userSession: CognitoUserSession = await Auth.currentSession().catch(() => null);
    const token = userSession?.getAccessToken().getJwtToken();
    if (process.browser && token) {
        cookie.set("token", token, {
            expires: 1
        });
    }
    else {
        cookie.remove("token", {
            expires: 1
        });
    }
    return token;
}

const refreshToken = async (): Promise<void> => {
    const user: CognitoUser = await Auth.currentAuthenticatedUser().catch(() => null);
    
    user?.refreshSession(user.getSignInUserSession().getRefreshToken(), async (err, res) => {
        if(res)
            console.log("Token aggiornato");
    });
}

const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    return await Auth.currentAuthenticatedUser() // prendo l'attuale utente autenticato
        .then((user) => Auth.changePassword(user, oldPassword, newPassword)) // provo a cambiare la password
        .then(() => true) // password cambiata
        .catch((err) => { console.error(err.message); return false}); 
};

const changeEmail = async (newEmail: string): Promise<void> => {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
        'email': newEmail
    });
    sendEmailVerificationCode();
}

const sendEmailVerificationCode = async (): Promise<void> => {
    try {
        await Auth.verifyCurrentUserAttribute("email");
        console.log('code resent successfully');
    }
    catch (err) {
        console.log('error resending code: ', err);
    }
}

const verifyEmail = async (code: string): Promise<NewUser> => {
    // Sistemare codice
    try {
        await Auth.verifyCurrentUserAttributeSubmit("email", code);
        console.log("Codice confermato");
    }
    catch (error) {
        console.log('error confirming sign up', error);
    }
    // Rimandare a Login (da Context?)
    return;
}

const changeAccountAttributes = async (name: string, surname: string): Promise<void> => {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
        'name': name,
        'family_name': surname,
    });
}

const getCurrentUserData = async (): Promise<User> => {
    const group = await Auth.currentSession().then(session => {
        console.log(session.getAccessToken().decodePayload());
        return session.getAccessToken().decodePayload()["cognito:groups"][0];
    });
    return await Auth.currentUserInfo()
        .then(async (data) => {
            return {
                username: data.username,
                email: data.attributes.email,
                name: data.attributes.name,
                surname: data.attributes.family_name,
                email_verified: data.attributes.email_verified,
                role: group
            }
        })
        .catch(() => null);
}

const isAuthenticated = async (): Promise<boolean> => {
    return await Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => {
            return user.getSignInUserSession().isValid();
        })
        .catch(() => false);
}

const deleteAccount = async (callback: (err?, result?) => void): Promise<void> => {
    return await Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => {
            user.deleteUser(callback);
        });
}

const getDevicesList = (callback: (devices) => void): void => {
    Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => {
            user.listDevices(
                60, 
                null, 
                {
                    onSuccess: (res) => {
                        res=res.Devices;
                        console.log(res);
                        
                        const devices = [];
                        
                        res?.forEach((device) => {
                            const d = {
                                key: device?.DeviceKey,
                                create: device?.DeviceCreateDate,
                                lastAuthenticatedDate: device?.DeviceLastAuthenticatedDate,
                                lastModifiedDate: device?.DeviceLastModifiedDate,
                            };
                            device.DeviceAttributes?.forEach(element => {
                                switch(element.Name){
                                case "device_status":
                                    d["status"]=element.Value;
                                    break;
                                case "device_name":
                                    d["name"]=element.Value;
                                    break;
                                case "last_ip_used":
                                    d["lastIp"]=element.Value;
                                    break;
                                default:
                                    d[element.Name]=element.Value;
                                }
                            });
                            devices.push(d);
                        });
                        callback(devices);
                        console.log(devices);
                    }, 
                    onFailure: (e) => {
                        console.log(e)
                    }
                }
            );
        });
}

const forgetSpecificDevice = (key: string, callback: () => void): void => {
    Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => {
            user.forgetSpecificDevice(
                key,
                {
                    onSuccess: (res) => {console.log(res); callback();},
                    onFailure: (e) => {console.log(e)}
                });
        });
}

const forgetAllDevices = (callback: () => void): void => {
    getDevicesList((devices)=>{
        devices.forEach(device => {
            forgetSpecificDevice(device.key, callback);
        });
    });
}

const logoutFromAllDevices = (callback: () => void): void =>{
    Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => {
            user.globalSignOut(
                {
                    onSuccess: (res) => {console.log(res); callback();},
                    onFailure: (e) => {console.log(e)}
                });
        });
}

export const AuthService = {
    getTokenJwt,
    refreshToken,
    login,
    signUp,
    confirmCode,
    changePassword,
    forgotPassword,
    isNewPassword,
    changeEmail,
    getCurrentUserData,
    isAuthenticated,
    getDevicesList,
    forgetSpecificDevice,
    logoutFromAllDevices,
    forgetAllDevices,
    changeAccountAttributes,
    sendEmailVerificationCode,
    verifyEmail,
    deleteAccount
};
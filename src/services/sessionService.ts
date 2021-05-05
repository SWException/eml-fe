import cookie from 'js-cookie';
import { User } from 'types';

const setCookie = (key: string, value): void => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

const removeCookie = (key: string): void => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get cookie
const getCookie = (key: string): string => {
    if (process.browser) {
        return cookie.get(key);
    }
};
// localstorage
const setLocalStorage = (key: string, value): void => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const getLocalStorage = (): User => {
    if (process.browser) {
        return JSON.parse(localStorage.getItem('user'))
    }
};

const removeLocalStorage = (key: string): void => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};
// authenticate user by pass data to cookie and localstorage
const authenticate = (data, next): void => {
    console.log('Hey')
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

const isAuth = (): boolean => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            }
            else {
                return false;
            }
        }
    }
};

export const sessionService = {
    authenticate,
    isAuth,
    removeCookie,
    removeLocalStorage,
    getCookie,
    getLocalStorage
};
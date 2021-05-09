export type User = {
    username?: string,
    name: string,
    surname: string,
    email?: string;
    email_verified?: boolean,
    imageURL: string;
    carts: string[];
    role: 'user' | 'admin' | string;
};

export type UserFields = {
    name: string;
    password: string;
    email: string;
};
export type User = {
  //_id: string;
  name: string,
  //family_name
  email?: string;
  imageURL: string;
  carts: string[];
  role: 'user' | 'admin';
};

export type UserFields = {
  name: string;
  password: string;
  email: string;
};
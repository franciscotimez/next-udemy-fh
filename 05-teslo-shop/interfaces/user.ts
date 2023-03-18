export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;

  // cosas de mongo
  createdAt?: string;
  updatedAt?: string;
}
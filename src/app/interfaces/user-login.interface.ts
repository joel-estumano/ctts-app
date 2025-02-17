import { IUserRegister } from './user-register.interface';

export type IUserLogin = Pick<IUserRegister, 'email' | 'password'>;

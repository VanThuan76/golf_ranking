import { IMember } from "./member.table.type";
import { IUser } from "./user.table.type";

export interface IRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IAuthResponse {
  member: IMember | null;
  user: IUser;
}
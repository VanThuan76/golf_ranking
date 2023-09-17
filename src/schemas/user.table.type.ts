export interface IUser {
  id: number;
  name: string;
  email: string;
  token: string
}
export interface IResetPassword {
  user_id: number;
  old_password: string;
  new_password: string;
  password_confirmation: string;
}
export interface IAuth {
  username: string,
  password: string
}
export interface IResetPassword {
  current_password: string
  new_password: string
  new_password_confirm: string
}
export interface IResgister {
  fullName: string,
  email: string
  password: string,
  passwordConfirm: string
}
export interface IRankUser {
  rank: number;
  code_vjgr: string;
  name_member: string;
  age: number;
  down: number;
  up: number;
  point: number;
  entry: number;
  win: number;
  gender: number;
  country: string
}
export interface IRankDetailUser {
  time: string;
  area: string;
  country: string;
  location: string;
  tournament_name: string;
  tournament_category: string;
  tournament_type: string;
  rank: number;
  point: number;
  award: number;
}
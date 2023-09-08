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

export interface IUser {
  id: number;
  member_id: number; 
  name: string;
  email: string;
  email_verified_at?: string;
  updated_at: string;
  created_at: string;
}
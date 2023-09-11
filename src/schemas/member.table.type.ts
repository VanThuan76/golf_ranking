import { IGroup } from "./group.table.type";

export interface IMember  {
  id: number;
  group_id: number;
  vjgr_code: string;
  name: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
  email: string;
  phone_number: string;
  handicap_vga: string;
  points: number;
  counting_tournament: number;
  number_of_wins: number;
  best_rank?: any;
  current_rank?: any;
  rank_change?: any;
  guardian_name: string;
  relationship: string;
  guardian_phone?: number;
  guardian_email: string;
  status: string;
  created_at: string;
  updated_at: string;
  group: IGroup;
}
export interface IMemberSearch {
  name?: string;
  vjgr_code?: string;
  nationality?: string;
}
export interface IMemberRegister {
  name: string;
  handicap_vga: string;
  gender: number;
  date_of_birth: Date;
  nationality: string;
  email: string;
  phone_number: string;
  guardian_name: string;
  relationship: string;
  guardian_email: string;
  guardian_phone: string;
}
import { IMember } from "./member.table.type";
import { ITournamentType } from "./tournament-type.table.type";
export type StatusTournamentString = 'Hoàn thành' | 'Đang tổ chức' | 'Sắp bắt đầu' | 'Đăng ký';

export interface ITournament {
  id: number;
  name: string;
  region: string;
  country: string;
  city: string;
  from_date: string;
  to_date: string;
  number_round: number;
  format: string;
  status: string;
  created_at: string;
  updated_at: string;
  tournament_type: ITournamentType;
  tournament_group: Tournamentgroup;
  member: IMember;
  organiser: Organiser;
  image?: string;
}

interface Organiser {
  id: number;
  name: string;
  email: string;
  phone_number: number;
  contact_person: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Tournamentgroup {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IGroupTournamentSearch{
  name: string;
  nationality: string;
  tournament_type_id: number;
  from_date: string;
  to_date: string;
  status: number;
}
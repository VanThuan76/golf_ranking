import { IMember } from "./member.table.type";
import { ITournamentSummary } from "./tournament-summary.table.type";
import { ITournament } from "./tournament.table.type";

export interface ITournamentDetail {
  id: number;
  tournament_id: number;
  member_id: number;
  round_number: number;
  to_par: number;
  score: number;
  created_at: string;
  updated_at: string;
  tournament_summary: ITournamentSummary;
  tournament: ITournament;
  member: IMember;
}
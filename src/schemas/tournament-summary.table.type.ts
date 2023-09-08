import { IMember } from "./member.table.type";
import { ITournament } from "./tournament.table.type";

export interface ITournamentSummary {
    id: number;
    finish: number;
    to_par: number;
    total_score: number;
    point: number;
    status: number;
    created_at: string;
    updated_at: string;
    tournament: ITournament;
    member: IMember;
}
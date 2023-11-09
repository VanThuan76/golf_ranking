import usePagination from "../shared/hooks/usePagination"
import { Filter } from "../shared/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponseWithCount } from "src/schemas/baseResponse.type"
import { ITournamentSummary } from "src/schemas/tournament-summary.table.type"

const QUERY_KEY = "TournamentSummaryQuery"
export const useGetListTournamentSummary = (memberId: number, defaultFilter?: Filter[]) => {
    return usePagination<IBaseResponseWithCount<ITournamentSummary[]>>({
        queryKey: [QUERY_KEY, 'get-all'],
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponseWithCount<ITournamentSummary[]>>('/tournament-summary', {
            member_id: memberId,
            ...params
        }),
        defaultParams: {
            page: 0,
            size: 15,
            filters: defaultFilter,
            sorts: [{ field: "updated_at", direction: "DESC" }]
        }
    })
}
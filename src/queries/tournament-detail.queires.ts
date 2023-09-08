import usePagination from "@/hooks/usePagination"
import { Filter } from "@/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponseWithCount } from "src/schemas/baseResponse.type"
import { ITournamentDetail } from "src/schemas/tournament-detail.table.type"

const QUERY_KEY = "TournamentDetailQuery"
export const useGetListTournamentDetail = (defaultFilter?: Filter[]) => {
    return usePagination<IBaseResponseWithCount<ITournamentDetail[]>>({
        queryKey: [QUERY_KEY, 'get-all'],
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponseWithCount<ITournamentDetail[]>>('/tournament-detail', {...params}),
        defaultParams: {
            page: 0,
            size: 10,
            filters: defaultFilter,
            sorts: [{ field: "member_id", direction: "ASC" }, { field: "round_number", direction: "ASC" }]
        }
    })
}
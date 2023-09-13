import usePagination from "../shared/hooks/usePagination"
import { Filter } from "../shared/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponseWithCount } from "src/schemas/baseResponse.type"
import { ITournament } from "src/schemas/tournament.table.type"

const QUERY_KEY = "TournamentQuery"
export const useGetListTournament = (defaultFilter?: Filter[]) => {
    return usePagination<IBaseResponseWithCount<ITournament[]>>({
        queryKey: [QUERY_KEY, 'get-all'],
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponseWithCount<ITournament[]>>('/tournaments/search', {...params}),
        defaultParams: {
            page: 0,
            size: 10,
            filters: defaultFilter,
            sorts: [{ field: "updated_at", direction: "DESC" }]
        }
    })
}
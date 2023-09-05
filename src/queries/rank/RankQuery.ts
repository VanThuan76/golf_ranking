import usePagination from "@/hooks/usePagination"
import { Filter } from "@/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponse, IBaseResponseWithCount } from "src/schemas/baseResponse.typ"
import { IRank } from "src/schemas/rank.table.type"

const QUERY_KEY = "RankQuery"
export const useGetListRankBySearch = (id?: React.Key, defaultFilter?: Filter[]) => {
    return usePagination<IBaseResponse<IBaseResponseWithCount<IRank[]>>>({
        queryKey: [QUERY_KEY],
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponse<IBaseResponseWithCount<IRank[]>>>('/rank/search', { ...params }),
        defaultParams: {
            page: 0,
            size: 10,
            filters: defaultFilter,
            sorts: [{ field: 'id', direction: 'DESC' }],
        }
    })

}
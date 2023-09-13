import usePagination from "../shared/hooks/usePagination"
import { Filter } from "../shared/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponseWithCount } from "src/schemas/baseResponse.type"
import { IMember } from "src/schemas/member.table.type"

const QUERY_KEY = "MemberQuery"
export const useGetListMemberBySearch = (defaultFilter?: Filter[]) => {
    return usePagination<IBaseResponseWithCount<IMember[]>>({
        queryKey: [QUERY_KEY, 'get-search'],
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponseWithCount<IMember[]>>('/members/search', {...params}),
        defaultParams: {
            page: 0,
            size: 10,
            filters: defaultFilter,
            sorts: [{ field: "updated_at", direction: "DESC" }]
        }
    })
}
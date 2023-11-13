import usePagination from "@/src/shared/hooks/usePagination"
import { Filter } from "@/src/shared/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponse, IBaseResponseWithCount } from "src/schemas/baseResponse.type"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { INewsSearch } from "@/src/schemas/news.type"
import { ICategory } from "@/src/schemas/category.table.type"

const QUERY_KEY = "NewsManagementQuery"
export const useGetListNewsBySearch = (defaultFilter?: Filter[]) => {
    return usePagination<IBaseResponseWithCount<INewsSearch[]>>({
        queryKey: [QUERY_KEY, 'get-search'],
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponseWithCount<INewsSearch[]>>('/news/search', { ...params }),
        defaultParams: {
            page: 1,
            size: 15,
            filters: defaultFilter,
            sorts: [{ field: "updated_at", direction: "DESC" }]
        }
    })
}
export const useGetListCategory = (options?: Partial<UseQueryOptions>) => {
    return useQuery({
        queryKey: [QUERY_KEY, 'get-all'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<ICategory[]>>('/category'),
        select(data) {
            return data.data
        },
        enabled: options?.enabled
    })
}
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponse } from "src/schemas/baseResponse.type"
import { IGroup } from "src/schemas/group.table.type"

const QUERY_KEY = "GroupQuery"
export const useGetListGroup = (options?: Partial<UseQueryOptions>) => {
    return useQuery({
        queryKey: [QUERY_KEY, 'get-all'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<IGroup[]>>('/groups'),
        select(data) {
            return data.data
        },
        enabled: options?.enabled
    })
}
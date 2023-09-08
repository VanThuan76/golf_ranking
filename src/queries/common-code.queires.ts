import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponse } from "src/schemas/baseResponse.type"
import { ICommonCode } from "src/schemas/common-code.table.type"

const QUERY_KEY = "CommonCodeQuery"
export const useGetListCommonCode = (options?: Partial<UseQueryOptions>) => {
    return useQuery({
        queryKey: [QUERY_KEY, 'get-all'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<ICommonCode[]>>('/common-code'),
        select(data) {
            return data.data
        },
        enabled: options?.enabled
    })
}
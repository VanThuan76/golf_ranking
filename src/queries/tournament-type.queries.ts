import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponse } from "src/schemas/baseResponse.type"
import { ITournamentType } from "src/schemas/tournament-type.table.type"

const QUERY_KEY = "TournamentTypeQuery"
export const useGetListTournamentType = (options?: Partial<UseQueryOptions>) => {
    return useQuery({
        queryKey: [QUERY_KEY, 'get-all'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<ITournamentType[]>>('/tournaments-type'),
        select(data) {
            return data.data
        },
        enabled: options?.enabled
    })
}
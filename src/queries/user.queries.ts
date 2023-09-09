import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { axiosInstanceNoAuth } from "src/https.config"
import { IAuthResponse } from "src/schemas/auth.type"
import { IBaseResponse } from "src/schemas/baseResponse.type"
import { login } from "src/shared/stores/appSlice"

const QUERY_KEY = "UserQuery"
export const useGetUserById = (id: React.Key, options?: Partial<UseQueryOptions>) => {
    const dispatch = useDispatch()
    return useQuery({
        queryKey: [QUERY_KEY, 'get-all'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<IAuthResponse>>(`/api/user/${id}`),
        select(data) {
            if (!data) return
            dispatch(login(data.data))
            return data.data
        },
        enabled: options?.enabled
    })
}
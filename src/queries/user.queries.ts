import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { useDispatch } from "react-redux"
import { axiosInstanceNoAuth } from "src/https.config"
import { IAuthResponse } from "src/schemas/auth.type"
import { IBaseResponse } from "src/schemas/baseResponse.type"
import { APP_SAVE_KEY } from "src/shared/constants"
import { login } from "src/shared/stores/appSlice"

const QUERY_KEY = "UserQuery"
export const useGetUserById = (options?: Partial<UseQueryOptions>) => {
    const dispatch = useDispatch()
    const id = getCookie(APP_SAVE_KEY.USER_ID)
    if(!id) return
    return useQuery({
        queryKey: [QUERY_KEY, 'get-by-id'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<IAuthResponse>>(`/user/${id}`),
        select(data) {
            if (!data) return
            dispatch(login(data.data))
            return data.data
        },
        enabled: options?.enabled
    })
}
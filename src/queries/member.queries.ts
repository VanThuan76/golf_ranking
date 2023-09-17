import usePagination from "../shared/hooks/usePagination"
import { Filter } from "../shared/utils/typeSearchParams"
import { axiosInstanceNoAuth } from "src/https.config"
import { IBaseResponse, IBaseResponseWithCount } from "src/schemas/baseResponse.type"
import { IMember, IMemberRegister } from "src/schemas/member.table.type"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
import { useToast } from "../shared/components/ui/use-toast"

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
export const useRegisterMember = (onSuccessHandle?: () => void) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: (body: IMemberRegister) => axiosInstanceNoAuth.post<IBaseResponse<IMemberRegister>>('/register-member', body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            if (onSuccessHandle) onSuccessHandle()
            toast({
                variant: 'success',
                title: "Đăng ký thành viên thành công",
            })
        },
        onError: (err: any) => {
            console.log(err)
            toast({
                variant: 'destructive',
                title: err?.data?.data || "Đăng ký thành viên thất bại",
            })
        }
    })
}
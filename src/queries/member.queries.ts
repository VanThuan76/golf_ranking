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
        apiFn: (params) => axiosInstanceNoAuth.post<IBaseResponseWithCount<IMember[]>>('/members/search', { ...params }),
        defaultParams: {
            page: 1,
            size: 15,
            filters: defaultFilter,
            sorts: [{ field: "current_rank", direction: "ASC" }]
        }
    })
}
export const useGetListNationality = (options?: Partial<UseQueryOptions>) => {
    return useQuery({
        queryKey: [QUERY_KEY, 'get-all'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<string[]>>('/nationality-members'),
        select(data) {
            return data.data
        },
        enabled: options?.enabled
    })
}
export const useRegisterMember = (onSuccessHandle?: () => void) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: (body: IMemberRegister) => axiosInstanceNoAuth.post<IBaseResponse<IMemberRegister>>('/first-register-member', body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            if (onSuccessHandle) onSuccessHandle()
            toast({
                variant: 'success',
                title: "Đăng ký thành viên thành công. Vui lòng chờ Ban tổ chức phê duyệt.",
            })
        },
        onError: (err: any) => {
            const errorMessages = err?.response?.data.errors
            const firstKey = Object.keys(errorMessages)[0];
            const firstValue = errorMessages[firstKey][0];
            toast({
                variant: 'destructive',
                title: firstValue || "Đăng ký thành viên thất bại",
            });
        }
    })
}
export const useUpdateMember = (memberId: number, onSuccessHandle?: () => void) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: (body: IMemberRegister) => axiosInstanceNoAuth.put<IBaseResponse<IMemberRegister>>(`/first-update-register-member/${memberId}`, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            if (onSuccessHandle) onSuccessHandle()
            toast({
                variant: 'success',
                title: "Cập nhật thành viên thành công. Vui lòng chờ Ban tổ chức phê duyệt.",
            })
        },
        onError: (err: any) => {
            const errorMessages = err?.response?.data.errors
            const firstKey = Object.keys(errorMessages)[0];
            const firstValue = errorMessages[firstKey][0];
            toast({
                variant: 'destructive',
                title: firstValue || "Cập nhật thành viên thất bại",
            });
        }
    })
}
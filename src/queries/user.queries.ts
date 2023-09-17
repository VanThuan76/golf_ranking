import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { axiosInstanceNoAuth } from "src/https.config";
import { IAuthResponse } from "src/schemas/auth.type";
import { IBaseResponse } from "src/schemas/baseResponse.type";
import { APP_SAVE_KEY } from "src/shared/constants";
import { login } from "src/shared/stores/appSlice";
import { useEffect } from "react";
import { useToast } from "../shared/components/ui/use-toast";
import { IResetPassword } from "../schemas/user.table.type";
const QUERY_KEY = "UserQuery";

export const useGetUserById = (options?: Partial<UseQueryOptions>) => {
    const dispatch = useDispatch();
    const id = getCookie(APP_SAVE_KEY.USER_ID)
    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            const response = await axiosInstanceNoAuth.get<IBaseResponse<IAuthResponse>>(`/user/${id}`);
            if (response.data) {
                dispatch(login(response.data));
            }
        };

        fetchData();
    }, [dispatch, id]);
    return useQuery({
        queryKey: [QUERY_KEY, 'get-by-id'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<IAuthResponse>>(`/user/${id}`),
        enabled: options?.enabled,
    });
};
export const useResetPassword = (onSuccessHandle?: () => void) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: (body: IResetPassword) => axiosInstanceNoAuth.post<IBaseResponse<[]>>('/reset-password', body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            if (onSuccessHandle) onSuccessHandle()
            toast({
                variant: 'success',
                title: "Cập nhật thành công",
            })
        },
        onError: (err: any) => {
            console.log(err)
            toast({
                variant: 'destructive',
                title: err?.data?.data || "Cập nhật thất bại",
            })
        }
    })
}
export const useVerifyEmail = (onSuccessHandle?: () => void) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: (body: {email:string}) => axiosInstanceNoAuth.post<IBaseResponse<[]>>('/check-email-exists', body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            if (onSuccessHandle) onSuccessHandle()
            toast({
                variant: 'success',
                title: "Xác nhận thành công",
            })
        },
        onError: (err: any) => {
            console.log(err)
            toast({
                variant: 'destructive',
                title: err?.data?.data || "Xác nhận thất bại",
            })
        }
    })
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { axiosInstanceNoAuth } from "src/https.config";
import { IAuthResponse } from "src/schemas/auth.type";
import { IBaseResponse } from "src/schemas/baseResponse.type";
import { APP_SAVE_KEY } from "src/shared/constants";
import { login } from "src/shared/stores/appSlice";
import { useToast } from "../shared/components/ui/use-toast";
import { IResetPassword } from "../schemas/user.table.type";
import { useSession } from "next-auth/react";
import { useAppSelector } from "../shared/hooks/useRedux";
const QUERY_KEY = "UserQuery";

export const useGetUserByRegisterMember = () => {
    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state.appSlice)
    return useQuery({
        queryKey: [QUERY_KEY, 'get-by-register-member'],
        queryFn: () => axiosInstanceNoAuth.post<IBaseResponse<IAuthResponse>>('first-register-member', { email: user?.user?.email }),
        onSuccess(data) {
            if (data.data) {
                dispatch(login(data.data));
            }
        },
        enabled: !!user?.user?.email
    });
};

export const useGetUserById = () => {
    const dispatch = useDispatch();
    const id = getCookie(APP_SAVE_KEY.USER_ID)
    return useQuery({
        queryKey: [QUERY_KEY, 'get-by-id'],
        queryFn: () => axiosInstanceNoAuth.get<IBaseResponse<IAuthResponse>>(`/user/${id}`),
        onSuccess(data) {
            if (data.data) {
                dispatch(login(data.data));
            }
        },
        enabled: id !== undefined
    });
};
export const useGetUserByEmail = () => {
    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state.appSlice)
    const { data: session } = useSession();
    return useQuery(
        ['get-by-email', session?.user?.email || user?.user?.email],
        async () => {
            const email = session?.user?.email || user?.user?.email;
            if (!email) {
                return null;
            }
            const response = await axiosInstanceNoAuth.get<IBaseResponse<IAuthResponse>>(`/userEmail/${email}`);
            return response.data;
        },
        {
            enabled: !!session?.user?.email || !!user?.user?.email,
            onSuccess: (data) => {
                if (data) {
                    dispatch(login(data));
                }
            },
        }
    );
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
        mutationFn: (body: { email: string }) => axiosInstanceNoAuth.post<IBaseResponse<[]>>('/check-email-exists', body),
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

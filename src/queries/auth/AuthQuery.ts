import { useMutation } from "@tanstack/react-query";
import { IAuth } from "src/schemas/user.table.type";
import { authService } from "src/services/authentication.service";

export const authQuery = (onSuccess?: (data: any) => void) => {
  return useMutation({
    mutationFn: (body: IAuth) => {
      return authService.authenticated(body)
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (!data.data.token) return;
    },
    onError(error, variables, context) {
      throw Error('Login Fail');
    },
  });
};

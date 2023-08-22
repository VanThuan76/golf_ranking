import { useRouter } from 'next/router';
import { useAppDispatch } from "@/hooks/useRedux";

import { IAuth } from 'src/schemas/user.table.type';
import { authQuery } from './AuthQuery';

export interface IAuthRepository {
  authenticated: (body: IAuth) => void;
}

export class AuthRepository implements IAuthRepository {
  authenticated(body: IAuth): void {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const auth = authQuery((data) => {
      if (data) {
        // notification.success({ message: 'Login success' })
        // setCookie(APP_SAVE_KEY.TOKEN_KEY, data.data.token)
        // setCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY, data.data.refreshToken)
        // setCookie(APP_SAVE_KEY.LOGIN_STATUS, 'true')
        // dispatch(login(data.data))
        router.push('/success-route');
      }
    });
    auth.mutate(body);
  }
}



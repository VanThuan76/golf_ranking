import { AxiosResponse } from 'axios';
import { httpsNoToken } from './https.config';


class AuthService {
    authenticated(body: { username: string; password: string }): Promise<AxiosResponse<any>> {
        return httpsNoToken.post('/Account/Login', body)
    }
    register(body: any): Promise<AxiosResponse> {
        return httpsNoToken.post('/Account/Register', body)
    }
    resetPassword(body: { accountId: number, password: string }): Promise<AxiosResponse> {
        return httpsNoToken.post('/ResetPassword', body)
    }
    forgetPassword(body: { email: string }): Promise<AxiosResponse> {
        return httpsNoToken.post('/Forget', body)
    }
}

export const authService = new AuthService()

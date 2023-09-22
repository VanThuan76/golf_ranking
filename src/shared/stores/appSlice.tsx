import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from 'cookies-next';
import { IAuthResponse } from 'src/schemas/auth.type';
import { APP_SAVE_KEY } from '../constants';

type APPSTATE = {
  user: IAuthResponse | undefined;
  isLogined: boolean;
  isRegister: boolean;
  isRouteLoading: boolean;
};

const user: any = JSON.parse(getCookie(APP_SAVE_KEY.USER_DATA) as string || '{}')
const initialState: APPSTATE = {
  user: user || undefined,
  isLogined: false,
  isRegister: false,
  isRouteLoading: false,
};
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any | undefined>) => {
      state.user = action.payload;
      state.isLogined = true;
    },
    register: (state, action: PayloadAction<any | undefined>) => {
      state.user = action.payload;
      state.isRegister = true;
    },
    logout: state => {
      state.user = undefined;
      state.isLogined = false;
      deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
      deleteCookie(APP_SAVE_KEY.LOGIN_STATUS);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isRouteLoading = action.payload;
    },
  },
});
export const { login, register, logout, setLoading } = appSlice.actions;
export default appSlice.reducer;

import { setCookie } from 'cookies-next';
import { NextAuthOptions } from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { axiosInstanceNoAuth } from './https.config';
import { IBaseResponse } from './schemas/baseResponse.type';
import { IUser } from './schemas/user.table.type';
import { APP_SAVE_KEY } from './shared/constants';

const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const response = await axiosInstanceNoAuth.post<IBaseResponse<[]>>("/check-email-exists", { email: profile?.email });
      if (response && Number(response.message) === 400) {
        const body = {
          name: profile?.name,
          email: profile?.email,
          password: profile?.name,
          password_confirmation: profile?.name
        };
        const result = await axiosInstanceNoAuth.post<IBaseResponse<IUser>>('/register', body)
        setCookie(APP_SAVE_KEY.USER_ID, result.data.id)
        return true;
      } else {
        return true;
      }
    },
    async jwt({ token }) {
      return token
    },
    async session({ session, token, user }) {
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production"
};
export default authConfig
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions } from 'next-auth/core/types';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import nookies from 'nookies';
import { axiosInstanceNoAuth } from './https.config';
import { IBaseResponse } from './schemas/baseResponse.type';
import { IUser } from './schemas/user.table.type';
import { APP_SAVE_KEY } from './shared/constants';
type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => AuthOptions
const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
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
      async signIn({ profile }) {
        const response = await axiosInstanceNoAuth.post<IBaseResponse<[]>>("/check-email-exists", { email: profile?.email });
        if (response && Number(response.statusCode) === 200) {
          const body = {
            name: profile?.name,
            email: profile?.email,
            password: profile?.name,
            password_confirmation: profile?.name
          };
          await axiosInstanceNoAuth.post<IBaseResponse<IUser>>('/register', body).then((response) => {
            const user = response.data
            nookies.set({ res }, APP_SAVE_KEY.USER_ID, JSON.stringify(user.id), {
              maxAge: 2 * 24 * 60 * 60,
              path: "/",
              httpOnly: true,
            });
            return user
          }).catch((error) => {
            console.log(error)
          })
          return true;
        } else {
          return true;
        }
      },
      async jwt({ token }) {
        return token
      },
      async session({ session, token }) {
        const user = token;
        session.user = user;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV !== "production"
  }
};
export default nextAuthOptions
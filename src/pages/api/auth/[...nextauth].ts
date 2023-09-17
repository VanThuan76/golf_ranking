import NextAuth from "next-auth/next"
import authConfig from "@/src/auth.config"
const handler = NextAuth(authConfig)
export default handler


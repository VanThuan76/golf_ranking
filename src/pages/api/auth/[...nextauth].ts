import NextAuth from "next-auth/next"
import nextAuthOptions from "@/src/auth.config"
import { NextApiRequest, NextApiResponse } from "next"
export default (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}


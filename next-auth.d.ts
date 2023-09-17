import { NextAuthOptions as DefaultNextAuthOptions } from 'next-auth';
declare module 'next-auth' {
    export interface NextAuthOptions extends DefaultNextAuthOptions {
    }
    export function useSession(): [Session | null, boolean];
}

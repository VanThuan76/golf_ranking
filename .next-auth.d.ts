declare module 'next-auth' {
    export interface User {
        id: string;
        email: string;
        image: string;
    }

    export interface Session {
        user: User;
        expires: any;
    }

    export function useSession(): [Session | null, boolean];
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_SAVE_KEY } from './shared/constants';

export default function middleware(request: NextRequest) {
    try {
        const userData = request.cookies.get(APP_SAVE_KEY.USER_DATA);
        if (userData !== undefined) {
            const user = JSON.parse(userData.value as string)
            if (user) return NextResponse.next({});
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (e) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

}

export const config = {
    matcher: []
}
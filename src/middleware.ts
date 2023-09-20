import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_SAVE_KEY } from './shared/constants';

export default function middleware(request: NextRequest) {
    try {
        const userId = request.cookies.get(APP_SAVE_KEY.USER_ID);
        console.log(request)
        if (userId !== undefined) {
            return NextResponse.next({});
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
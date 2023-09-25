export const APP_SAVE_KEY = {
    LOCALE: process.env.NEXT_PUBLIC_APP_NAME + "::locale",
    ROLE: process.env.NEXT_PUBLIC_APP_NAME + '::role',
    TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + '::token_key',
    LOGIN_STATUS: process.env.NEXT_PUBLIC_APP_NAME + '::login_status',
    USER_DATA: process.env.NEXT_PUBLIC_APP_NAME + ':user_data',
    USER_ID: process.env.NEXT_PUBLIC_APP_NAME + ':user_id',
}
export const URL_SYSTEMS = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: "/profile",
    MEMBER_REGISTER: "/member/register",
    FORGOT_PASSWORD: "/forgot-password",
    RANK: "/rank",
    TOURNAMENT: "/tournament",
    GROUP_TOURNAMENT: "/tournament/group",
    DETAIL_TOURNAMENT: "/tournament/detail",
    TO_BE_UPDATE: "/update-soon"
}
export const SOCIAL_BUSINESS = {
    FACEBOOK: 'https://www.facebook.com/vietnamgolfassociation/?locale=vi_VN'
}
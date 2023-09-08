import dayjs from "dayjs";

export function calculateAge(date: string) {
    const birthday = dayjs(date);
    const now = dayjs();
    const age = now.diff(birthday, 'year');
    return age
}
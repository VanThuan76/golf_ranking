import dayjs from "dayjs";

export function convertStringDate(date: string) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
}
import dayjs from "dayjs";

export function convertStringDate(date: string) {
    const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm:ss");
    return formattedDate;
}
export function convertStringDay(date: string) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return formattedDate;
}
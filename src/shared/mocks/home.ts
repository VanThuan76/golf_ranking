import imageBanner from "../../../public/static/images/Banner.jpg"
export const sectionBanner = {
    title: "Bảng xếp hạng quốc gia",
    description: "Vietnam Junior Golf Raking",
    image: imageBanner
}
// export const sectionBanner = {
//     title: "Bảng xếp hạng quốc gia",
//     description: "Vietnam Junior Golf Raking",
//     image: "https://photos.google.com/photo/AF1QipMiZVnk0zRJ4ZbK1X3znNW_nNKdH1RcPiEljz0"
// }
export interface ISectionBannerRank {
    title: string;
    description: string;
    image: string;
}

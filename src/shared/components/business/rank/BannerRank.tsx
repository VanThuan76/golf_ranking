import { PreImage } from "@/components/customization/PreImage";
import { ISectionBannerRank } from "src/shared/mocks/home";

interface Props {
  data: ISectionBannerRank;
}
const BannerRank = ({ data }: Props) => {
  return (
    <section id='BannerRank' className='w-full h-[500px]'>
      <div className='absolute right-0 w-full flex-shrink-0 snap-start'>
        <PreImage
          src={data.image}
          height={400}
          width={1980}
          layer={true}
          alt='Banner'
          className='relative w-full object-cover rounded-b-lg'
        />
        <div className="absolute top-14 left-24 flex-col-start gap-4 text-white">
            <h2 className="text-3xl">{data.title}</h2>
            <h1 className="w-full lg:w-[60%] text-xl md:text-3xl lg:text-6xl font-bold">{data.description}</h1>
        </div>
      </div>
    </section>
  );
};

export default BannerRank;

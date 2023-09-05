import { PreImage } from "@/components/customization/PreImage";

interface Props {
  data: any;
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
          alt={'Banner'}
          className='relative w-full object-cover rounded-lg'
        />
        <div className="absolute top-24 left-24 flex-col-start gap-4">
            <h2>{data.title}</h2>
            <h1 className="text-xl md:text-2xl lg:text-3xl">{data.description}</h1>
        </div>
      </div>
    </section>
  );
};

export default BannerRank;

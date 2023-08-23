import { PreImage } from '@/components/customization/preImage';

interface Props {
  image: string;
}
const HomeBanner = ({ image }: Props) => {
  return (
    <section id='HomeBanner' className='w-full h-[500px]'>
      <div className='absolute right-0 w-full flex-shrink-0 snap-start'>
        <PreImage
          src={image}
          height={400}
          width={1980}
          layer={true}
          alt={'Banner'}
          className='relative w-full object-cover rounded-lg'
        />
      </div>
    </section>
  );
};

export default HomeBanner;

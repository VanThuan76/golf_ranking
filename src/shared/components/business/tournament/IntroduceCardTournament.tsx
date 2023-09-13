import { PreImage } from '@/shared/components/customization/PreImage';
import { useRouter } from 'next/router';
import { ITournament } from 'src/schemas/tournament.table.type';
import { URL_SYSTEMS } from 'src/shared/constants';

interface Props {
  data: Partial<ITournament>;
  className?: string;
  size?: number;
}
const IntroduceCardTournament = ({ data, className, size }: Props) => {
  const router = useRouter();
  return (
    <section id='IntroduceCardTournament' className={`relative w-full text-white rounded-lg shadow-lg ${className}`}>
      <PreImage
        src={data.image as string}
        height={size || 160}
        width={1980}
        layer={true}
        alt={'News'}
        className='w-full h-full rounded-lg object-cover'
      />
      <div className='absolute bottom-0 w-full flex flex-col justify-center items-center gap-3 p-5'>
        <h2 className='text-lg lg:text-xl'>{data.name}</h2>
        <button
          className='font-semibold py-2 px-4 border-2 border-white rounded-md cursor-pointer shadow-2xl hover:bg-slate-300 transition-all duration-300'
          onClick={() => router.push(`${URL_SYSTEMS.GROUP_TOURNAMENT}/${data.id}`)}
        >
          Xem các giải đấu
        </button>
      </div>
    </section>
  );
};

export default IntroduceCardTournament;

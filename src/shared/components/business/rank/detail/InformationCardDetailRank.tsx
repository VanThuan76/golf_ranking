import CountryFlag from '@/src/shared/components/customization/CountryFlag';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import useTrans from '@/src/shared/hooks/useTrans';
import { calculateAge } from '@/src/shared/utils/business/calculateAge';
import { ChevronDown, Dot, Tag } from 'lucide-react';
import { useState } from 'react';
import { IMember } from 'src/schemas/member.table.type';
import { imageRankDetail } from 'src/shared/mocks/rank';

interface Props {
  data: IMember;
}
const CustomizeCard = ({ title, value, desc }: { title: string; value: string | number; desc: string }) => {
  return (
    <div className='mt-2 p-2 flex-col-start rounded-lg border-[var(--main-color)] border-2'>
      <h2 className='text-sm md:text-lg font-bold'>{title}</h2>
      <div className='flex-row-end'>
        <p className='text-lg md:text-xl lg:text-2xl'>{value}</p>
        <p className='text-xs ml-1'>{desc}</p>
      </div>
    </div>
  );
};
export function InformationCardDetailRank({ data }: Props) {
  const { trans } = useTrans();
  const [trigger, setTrigger] = useState(false);
  return (
    <section
      id='InformationCardDetailRank'
      className='relative w-full mt-4 p-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-5 z-30'>
        <div className='flex-col-start gap-2'>
          <div className='flex-row-center gap-2'>
            <CountryFlag countryCode={data.nationality} />
            <h1 className='text-2xl text-center font-semibold'>{data.name}</h1>
          </div>
          <div className='flex-row-center gap-2 text-xs md:text-base'>
            <p className='py-1 px-2 rounded-md border-[var(--main-color)] border-2'>{data.vjgr_code}</p>
            <p className='py-1 px-2 rounded-md border-[var(--main-color)] border-2'>{data.handicap_vga}</p>
            <div className='flex-row-center gap-1'>
              <Tag size={16} />
              <p>{data.gender === 'Nam' ? trans.common.male : trans.common.female}</p>
              <Dot size={24} />
              <p>U{calculateAge(data.date_of_birth)}</p>
            </div>
          </div>
        </div>
        <div className='flex-row-between-center text-xs md:text-base'>
          <div
            className='flex-row-center gap-1 flex md:hidden hover:text-slate-700 cursor-pointer'
            onClick={() => setTrigger(!trigger)}
          >
            <p>{trigger ? trans.common.collapse : trans.common.seeMore}</p>
            <ChevronDown size={12} className={`${trigger ? '' : 'rotate-180'}`} />
          </div>
          <div></div>
          <div className='flex-col-end gap-2'>
            <p>{trans.common.rewardPoint}</p>
            <p className='font-semibold text-base md:text-2xl text-center'>{data.points}</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          trigger ? 'grid' : 'hidden'
        } w-full md:w-[90%] md:grid grid-cols-2 lg:grid-cols-4 z-30 gap-1 md:gap-5 transition-all ease-in-out duration-75`}
      >
        <CustomizeCard title={trans.rank.currentRating} value={data.current_rank || 0} desc='' />
        <CustomizeCard title={trans.rank.highestRating} value={data.best_rank || 0} desc='' />
        <CustomizeCard title={trans.common.join} value={data.counting_tournament} desc={trans.common.tournament} />
        <CustomizeCard title={trans.rank.champion} value={data.number_of_wins} desc='' />
      </div>
      <div className='absolute top-0 left-0 w-full rounded-lg'>
        <PreImage
          src={imageRankDetail}
          height={400}
          width={1980}
          layer={true}
          alt={'Banner'}
          className='relative w-full object-center rounded-b-lg'
        />
      </div>
    </section>
  );
}

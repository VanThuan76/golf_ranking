import CountryFlag from '@/shared/components/customization/CountryFlag';
import { PreImage } from '@/shared/components/customization/PreImage';
import { calculateAge } from '@/shared/utils/business/calculateAge';
import { Dot, Tag } from 'lucide-react';
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
  return (
    <section
      id='InformationCardDetailRank'
      className='relative w-full mt-4 p-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div className='w-full flex-col-between-center md:flex-row gap-5 z-30'>
        <div className='flex-col-center md:flex-row gap-2'>
          <div className='flex-row-center gap-2'>
            <CountryFlag countryCode={data.nationality} />
            <h1 className='text-2xl text-center'>{data.name}</h1>
          </div>
          <div className='flex-row-center gap-2'>
            <p className='py-1 px-2 rounded-md border-[var(--main-color)] border-2'>{data.vjgr_code}</p>
            <p className='py-1 px-2 rounded-md border-[var(--main-color)] border-2'>{data.handicap_vga}</p>
            <div className='flex-row-center gap-1'>
              <Tag size={16} />
              <p>{data.gender}</p>
              <Dot size={24} />
              <p>U{calculateAge(data.date_of_birth)}</p>
            </div>
          </div>
        </div>
        <div className='flex-col-center gap-2'>
          <p>Điểm thưởng</p>
          <p className='font-bold text-2xl text-center'>{data.points}</p>
        </div>
      </div>
      <div className='w-full md:w-[90%] grid grid-cols-2 md:grid-cols-4 z-30 gap-1 md:gap-5'>
        <CustomizeCard title='Xếp hạng hiện tại' value={data.current_rank || 0} desc='' />
        <CustomizeCard title='Xếp hạng cao nhất' value={data.best_rank || 0} desc='' />
        <CustomizeCard title='Tham gia' value={data.counting_tournament} desc='giải đấu' />
        <CustomizeCard title='Vô địch' value={data.number_of_wins} desc='' />
      </div>
      <div className='absolute top-0 left-0 w-full object-center rounded-lg'>
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

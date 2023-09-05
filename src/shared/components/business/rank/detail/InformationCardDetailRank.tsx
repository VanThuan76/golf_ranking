import CountryFlag from '@/components/customization/CountryFlag';
import BackgroundInforCardDetailRank from '@/components/icons/rank/BackgroundInforCardDetailRank';
import { Tag } from 'lucide-react';
import { IRankUser } from 'src/schemas/user.table.type';

interface Props {
  data: IRankUser;
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
    <section id='InformationCardDetailRank' className='relative w-full mt-4 flex-col-between-start rounded-lg overflow-hidden'>
      <div className='w-full flex-col-between-center md:flex-row gap-5 z-30'>
        <div className='flex-col-center md:flex-row gap-2'>
          <div className='flex-row-center gap-2'>
            <CountryFlag countryCode={data.country} />
            <h1 className='text-2xl text-center'>{data.name_member}</h1>
          </div>
          <div className='flex-row-center gap-2'>
            <p className='py-1 px-2 rounded-md border-[var(--main-color)] border-2'>{data.code_vjgr}</p>
            <div className='flex-row-center gap-1'>
              <p>{data.age}</p>
              <Tag size={16} />
            </div>
          </div>
        </div>
        <div className='flex-col-center gap-2'>
          <p>Điểm thưởng</p>
          <p className='font-bold text-2xl text-center'>{data.point}</p>
        </div>
      </div>
      <div className='w-full md:w-[90%] grid grid-cols-2 md:grid-cols-4 z-30 gap-1 md:gap-5'>
        <CustomizeCard title='Xếp hạng hiện tại' value={data.rank} desc='' />
        <CustomizeCard title='Xếp hạng cao nhất' value={data.rank} desc='' />
        <CustomizeCard title='Tham gia' value={data.entry} desc='giải đấu' />
        <CustomizeCard title='Vô địch' value={data.win} desc='' />
      </div>
      {/* <BackgroundInforCardDetailRank className='hidden md:block absolute top-0 left-0 w-full object-center rounded-lg' /> */}
    </section>
  );
}

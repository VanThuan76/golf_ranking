import CountryFlag from '@/components/customization/CountryFlag';
import { PreImage } from '@/components/customization/PreImage';
import { MapPin, Dot, Tag } from 'lucide-react';
import { IRankUser } from 'src/schemas/user.table.type';
import { imageGroupDetail } from 'src/shared/mocks/tournament';

interface Props {
  data: IRankUser;
}
const CustomizeInfoCard = ({ title, value, desc }: { title: string; value: string | number; desc: string }) => {
  return (
    <div className='w-[200px] mt-4 flex-col-start p-4 rounded-lg'>
      <h2 className='font-thin'>{title}</h2>
      <div className='flex-row-end'>
        <p className='text-lg md:text-xl lg:text-2xl'>{value}</p>
        <p className='text-xs ml-1'>{desc}</p>
      </div>
    </div>
  );
};
export function InformationCardDetailTournament({ data }: Props) {
  return (
    <section
      id='InformationCardDetailTournament'
      className='relative w-full mt-4 p-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div className='w-full flex-row-between-start gap-5 z-30'>
        <div className='w-full flex-row-start gap-3'>
          <CountryFlag className='text-7xl' countryCode={data.country} />
          <div className='flex-col-start gap-2'>
            <h1 className='text-2xl text-center'>{data.name_member}</h1>
            <div className='flex-row-start gap-10'>
              <div className='flex-row-center gap-1'>
                <MapPin size={24} />
                <p>{data.age}</p>
                <div className='flex-row-center'>
                  <Dot size={24} />
                  <p>{data.age}</p>
                </div>
              </div>
              <div className='flex-row-center'>
                <Tag size={16} />
                <p>{data.age}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex-col-end gap-2'>
          <p>Nhà tổ chức</p>
          <p className='font-bold text-2xl text-center'>{data.point}</p>
        </div>
      </div>
      <div className='w-full grid grid-cols-2 md:grid-cols-5 z-30'>
        <CustomizeInfoCard title='Thời gian' value={data.rank} desc='' />
        <CustomizeInfoCard title='Loại giải đấu' value={data.rank} desc='' />
        <CustomizeInfoCard title='Số vòng đấu' value={data.entry} desc='' />
        <CustomizeInfoCard title='Thể thức' value={data.win} desc='' />
        <CustomizeInfoCard title='Trạng thái' value={data.win} desc='' />
      </div>
      <div className='absolute top-0 left-0 w-full object-center rounded-lg'>
        <PreImage
          src={imageGroupDetail}
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

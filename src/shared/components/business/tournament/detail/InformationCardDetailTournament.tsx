import CountryFlag from '@/src/shared/components/customization/CountryFlag';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import { MapPin, Dot, Tag } from 'lucide-react';
import { IGroup } from 'src/schemas/group.table.type';
import { ITournament } from 'src/schemas/tournament.table.type';
import { imageGroupDetail } from 'src/shared/mocks/tournament';

interface Props {
  groups: IGroup[];
  tournamentInfor: ITournament;
}
const CustomizeInfoCard = ({ title, value, desc }: { title: string; value: string | number; desc: string }) => {
  return (
    <div className='w-[200px] mt-4 flex-col-start p-4 rounded-lg'>
      <h2 className='font-thin'>{title}</h2>
      <div className='flex-row-end'>
        <p className='text-sm'>{value}</p>
        <p className='text-xs ml-1'>{desc}</p>
      </div>
    </div>
  );
};
export function InformationCardDetailTournament({ groups, tournamentInfor }: Props) {
  return (
    <section
      id='InformationCardDetailTournament'
      className='relative w-full mt-4 p-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div className='w-full flex-row-between-start gap-5 z-30'>
        <div className='w-full flex-row-start gap-3'>
          <CountryFlag className='text-7xl' countryCode={tournamentInfor.country} />
          <div className='w-full flex-col-start gap-2'>
            <h1 className='text-2xl text-center'>{tournamentInfor.name}</h1>
            <div className='flex-row-center gap-10'>
              <div className='flex-row-center gap-1'>
                <MapPin size={24} />
                <p>{tournamentInfor.city}</p>
                <div className='flex-row-center'>
                  <Dot size={24} />
                  <p>{tournamentInfor.region}</p>
                </div>
              </div>
              <div className='flex-row-end'>
                <Tag size={16} />
                {groups &&
                  groups.map(group => (
                    <div key={group.id} className='flex-row-end'>
                      <Dot size={16} />
                      <p className='text-xs'>{group.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 flex-col-end gap-2'>
          <p>Nhà tổ chức</p>
          <p className='text-2xl text-center font-semibold'>{tournamentInfor.organiser.name}</p>
        </div>
      </div>
      <div className='w-full grid grid-cols-2 md:grid-cols-5 z-30'>
        <CustomizeInfoCard
          title='Thời gian'
          value={`${tournamentInfor.from_date} - ${tournamentInfor.to_date}`}
          desc=''
        />
        <CustomizeInfoCard title='Loại giải đấu' value={tournamentInfor.tournament_type.name} desc='' />
        <CustomizeInfoCard title='Số vòng đấu' value={tournamentInfor.number_round} desc='vòng' />
        <CustomizeInfoCard title='Thể thức' value={tournamentInfor.format} desc='' />
        <CustomizeInfoCard title='Trạng thái' value={tournamentInfor.status} desc='' />
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

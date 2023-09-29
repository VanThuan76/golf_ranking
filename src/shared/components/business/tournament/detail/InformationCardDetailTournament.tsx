import CountryFlag from '@/src/shared/components/customization/CountryFlag';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import useTrans from '@/src/shared/hooks/useTrans';
import { convertStringDay } from '@/src/shared/utils/business/convertStringDate';
import { MapPin, Dot, Tag, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { IGroup } from 'src/schemas/group.table.type';
import { ITournament } from 'src/schemas/tournament.table.type';
import { imageGroupDetail } from 'src/shared/mocks/tournament';

interface Props {
  groups: IGroup[];
  tournamentInfor: ITournament;
}
const CustomizeInfoCard = ({ title, value, desc }: { title: string; value: string | number; desc: string }) => {
  return (
    <div className='w-full md:w-[200px] mt-4 grid grid-cols-2 md:grid-cols-1 justify-start items-start md:p-4 rounded-lg'>
      <h2 className='text-xs md:text-sm font-normal'>{title}</h2>
      <div className='flex-row-start'>
        <p className='text-sm font-medium'>{value}</p>
        <p className='text-xs ml-1 font-medium'>{desc}</p>
      </div>
    </div>
  );
};
export function InformationCardDetailTournament({ groups, tournamentInfor }: Props) {
  const { trans } = useTrans();
  const [trigger, setTrigger] = useState(false);
  console.log(groups)
  return (
    <section
      id='InformationCardDetailTournament'
      className='relative w-full mt-4 p-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-5 z-30'>
        <div className='md:col-span-2 flex-row-start gap-3'>
          <CountryFlag className='text-3xl md:text-7xl rounded-lg' countryCode={tournamentInfor.country} />
          <div className='w-full flex-col-start gap-2 text-xs md:text-base'>
            <h1 className='text-2xl text-center font-semibold'>{tournamentInfor.name}</h1>
            <div className='flex-row-center gap-10'>
              <div className='flex-row-center gap-1'>
                <MapPin size={24} />
                <p>{tournamentInfor.city}</p>
                <div className='flex-row-center'>
                  <Dot size={24} />
                  <p>{tournamentInfor.region}</p>
                </div>
              </div>
              <div className='flex-row-center'>
                <Tag size={16} />
                {groups &&
                  groups.map(group => (
                    <div key={group.id} className='flex-row-end'>
                      <Dot size={16} />
                      <p className='text-xs'>
                        {group.name.split(' ')[1] === 'Nam'
                          ? group.name.split(' ')[0] + ' ' + trans.common.male
                          : group.name.split(' ')[0] + ' ' + trans.common.female}
                      </p>
                    </div>
                  ))}
              </div>
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
            <p>{trans.common.organizer}</p>
            <p className='text-base md:text-2xl text-end font-semibold'>{tournamentInfor.organiser.name}</p>
          </div>
        </div>
      </div>
      <div className={`${trigger ? 'hidden' : 'grid'} w-full grid-cols-1 md:grid-cols-5 z-30`}>
        <CustomizeInfoCard
          title={trans.common.time}
          value={`${convertStringDay(tournamentInfor.from_date)} - ${convertStringDay(tournamentInfor.to_date)}`}
          desc=''
        />
        <CustomizeInfoCard title={trans.common.tournamentType} value={tournamentInfor.tournament_type.name} desc='' />
        <CustomizeInfoCard
          title={trans.tournament.numberOfRound}
          value={tournamentInfor.number_round}
          desc={trans.tournament.round}
        />
        <CustomizeInfoCard title={trans.common.formula} value={tournamentInfor.format} desc='' />
        <CustomizeInfoCard title={trans.common.status} value={tournamentInfor.status} desc='' />
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

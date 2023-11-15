import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/tabs';
import { URL_SYSTEMS } from '@/src/shared/constants';
import useTrans from '@/src/shared/hooks/useTrans';
import { useRouter } from 'next/router';
import { IGroup } from 'src/schemas/group.table.type';
import { ITournamentDetail } from 'src/schemas/tournament-detail.table.type';
import TableDetailTournament from './TableDetailTournament';

type Props = {
  onChangeSearchParams: any;
  groups: IGroup[];
  tournamentDetail: ITournamentDetail[];
  tableConfig: any;
};
const TabsDetailTournament = ({ groups, tournamentDetail, tableConfig, onChangeSearchParams }: Props) => {
  const { trans } = useTrans();
  const router = useRouter();
  return (
    <section id='TabsDetailTournament' className='w-full mt-5'>
      <Tabs defaultValue='mix' className='w-full'>
        <div className='w-full overflow-hidden overflow-x-scroll'>
          <TabsList>
            <TabsTrigger
              onClick={() =>
                router.push({
                  pathname: URL_SYSTEMS.DETAIL_TOURNAMENT,
                  query: { page: 1 },
                })
              }
              value='mix'
            >
              {trans.rank.tableSummary}
            </TabsTrigger>
            {groups &&
              groups.map(group => (
                <TabsTrigger
                  onClick={() => onChangeSearchParams({ field: 'group_id', value: group.id })}
                  key={group.id}
                  value={`group-${group.id}`}
                >
                  {trans.common.table}{' '}
                  {group.name.split(' ')[1] === 'Nam'
                    ? group.name.split(' ')[0] + ' ' + trans.common.male
                    : group.name.split(' ')[1] === 'Nữ'
                    ? group.name.split(' ')[0] + ' ' + trans.common.female
                    : group.name.split(' ')[0] + ' ' + trans.common.total}
                </TabsTrigger>
              ))}
          </TabsList>
        </div>
        <TabsContent value='mix'>
          <TableDetailTournament tournamentDetail={tournamentDetail || []} tableConfig={tableConfig} />
        </TabsContent>
        {groups &&
          groups.map(group => (
            <TabsContent key={group.id} value={`group-${group.id}`}>
              <TableDetailTournament tournamentDetail={tournamentDetail || []} tableConfig={tableConfig} />
            </TabsContent>
          ))}
      </Tabs>
    </section>
  );
};

export default TabsDetailTournament;

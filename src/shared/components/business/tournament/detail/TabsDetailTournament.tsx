import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/tabs';
import useTrans from '@/src/shared/hooks/useTrans';
import { IGroup } from 'src/schemas/group.table.type';
import { ITournamentDetail } from 'src/schemas/tournament-detail.table.type';
import TableDetailTournament from './TableDetailTournament';

type Props = {
  groups: IGroup[],
  tournamentDetail: ITournamentDetail[];
  tableConfig: any;
};
const TabsDetailTournament = ({ groups, tournamentDetail, tableConfig }: Props) => {
  const {trans} = useTrans()
  return (
    <section id='TabsDetailTournament' className='w-full mt-5'>
      <Tabs defaultValue='mix' className='w-full'>
        <div className='w-full overflow-hidden overflow-x-scroll'>
          <TabsList>
            <TabsTrigger value='mix'>{trans.rank.tableSummary}</TabsTrigger>
            {groups &&
              groups.map(group => (
                <TabsTrigger key={group.id} value={`group-${group.id}`}>
                  {trans.common.table} {" "}
                  {group.name.split(' ')[1] === 'Nam'
                    ? group.name.split(' ')[0] + ' ' + trans.common.male
                    : group.name.split(' ')[0] + ' ' + trans.common.female}
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
              <TableDetailTournament
                tournamentDetail={tournamentDetail.filter(tournament => tournament.member.group_id === group.id) || []}
                tableConfig={tableConfig}
              />
            </TabsContent>
          ))}
      </Tabs>
    </section>
  );
};

export default TabsDetailTournament;

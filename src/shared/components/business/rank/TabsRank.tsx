import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useGetListGroup } from 'src/queries/group.queires';
import { useGetListMemberBySearch } from 'src/queries/member.queries';
import SearchRank from './SearchRank';
import TableRank from './TableRank';

type Props = {
  searchDefault: {
    name: string;
    vjgr_code: string;
    nationality: string;
  };
};
const TabsRank = ({ searchDefault }: Props) => {
  const { data: groups } = useGetListGroup();
  const { data: members, tableConfig, getFieldValueOnSearchParam, onChangeSearchArrayParams } = useGetListMemberBySearch();
  return (
    <section id='TabsRank' className='w-full'>
      <SearchRank searchDefault={searchDefault} onChangeSearchArrayParams={onChangeSearchArrayParams} />
      <Tabs defaultValue='mix' className='w-full'>
      <div className='w-full overflow-hidden overflow-x-scroll'>
        <TabsList>
          <TabsTrigger value='mix'>Bảng tổng hợp</TabsTrigger>
          {groups &&
            groups.map(group => (
              <TabsTrigger key={group.id} value={`group-${group.id}`}>
                Bảng {group.name}
              </TabsTrigger>
            ))}
        </TabsList>
        </div>
        <TabsContent value='mix'>
          <TableRank
            members={members?.content || []}
            tableConfig={tableConfig}
            getFieldValueOnSearchParam={getFieldValueOnSearchParam}
          />
        </TabsContent>
        {groups &&
          groups.map(group => (
            <TabsContent key={group.id} value={`group-${group.id}`}>
              <TableRank
                members={members?.content.filter(member => member.group_id === group.id) || []}
                tableConfig={tableConfig}
                getFieldValueOnSearchParam={getFieldValueOnSearchParam}
              />
            </TabsContent>
          ))}
      </Tabs>
    </section>
  );
};

export default TabsRank;

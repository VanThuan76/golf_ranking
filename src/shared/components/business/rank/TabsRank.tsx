import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/tabs';
import useTrans from '@/src/shared/hooks/useTrans';
import { useEffect, useState } from 'react';
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
  const { trans } = useTrans();
  const { data: groups } = useGetListGroup();
  const {
    data: members,
    tableConfig,
    getFieldValueOnSearchParam,
    onChangeSearchArrayParams,
    onChangeSearchParams,
  } = useGetListMemberBySearch();
  return (
    <section id='TabsRank' className='w-full'>
      <SearchRank searchDefault={searchDefault} onChangeSearchArrayParams={onChangeSearchArrayParams} />
      <Tabs defaultValue='mix' className='w-full'>
        <div className='w-full overflow-hidden overflow-x-scroll'>
          <TabsList>
            <TabsTrigger value='mix'>{trans.rank.tableSummary}</TabsTrigger>
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
                members={members?.content || []}
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

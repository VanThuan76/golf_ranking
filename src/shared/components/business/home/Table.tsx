import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MoveUp } from 'lucide-react';

import DataTableColumnHeader from '@/components/customization/table/dataTableColumnHeader';
import DataTable from '@/components/customization/table/dataTable';
import { IRankUser } from 'src/schemas/user.table.type';
import { dataTable } from 'src/shared/mocks/table';

export function HomeTable() {
  const router = useRouter();
  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>({});
  const TABLE_NAME = 'Ranking';
  // const { data, tableConfig, getFieldValueOnSearchParam } = useGetListNews();
  const columnNews: ColumnDef<IRankUser>[] = [
    {
      id: 'rank',
      accessorKey: 'rank',
      cell(props) {
        return (
          <>
          <p>{props.cell.row.original.rank}</p>
            {collapseStates[props.cell.row.id] ? (
              <div className='flex-col-start p-4 rounded-lg border-slate-200 border-2'>
                <h2>Xếp hạng cao nhất</h2>
                {/* <p>{props.}</p> */}
              </div>
            ) : (
              <p>{props.cell.row.original.rank}</p>
            )}
          </>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Xếp hạng'
          // defaultFilter={getFieldValueOnSearchParam('rank')}
        />
      ),
    },
    {
      id: 'code_vjgr',
      accessorKey: 'code_vjgr',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Mã VJGR'
          // defaultFilter={getFieldValueOnSearchParam('code_vjgr')}
        />
      ),
    },
    {
      id: 'name_member',
      accessorKey: 'name_member',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Thành viên'
          // defaultFilter={getFieldValueOnSearchParam('name_member')}
        />
      ),
    },
    {
      id: 'age',
      accessorKey: 'age',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Độ tuổi'
          // defaultFilter={getFieldValueOnSearchParam('age')}
        />
      ),
    },
    {
      id: 'up' || 'down',
      accessorKey: 'up' || 'down',
      cell(props) {
        return <MoveUp />;
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tăng/giảm' />,
    },
    {
      id: 'point',
      accessorKey: 'point',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Điểm thưởng'
          // defaultFilter={getFieldValueOnSearchParam('point')}
        />
      ),
    },
  ];
  return (
    <section className='w-full space-y-4'>
      <div className='flex justify-between'>
        <div className='text-2xl font-bold'>{TABLE_NAME}</div>
      </div>
      <DataTable
        data={dataTable || []}
        columns={columnNews}
        tableName={TABLE_NAME}
        isLoading={false}
        pageSize={0}
        pageIndex={0}
        pageCount={0}
        collapseStates={collapseStates}
        setCollapseStates={setCollapseStates}
        handChangePagination={function (value: number, type: 'Page_change' | 'Size_change'): void {
          throw new Error('Function not implemented.');
        }}
      />
    </section>
  );
}
export default HomeTable;

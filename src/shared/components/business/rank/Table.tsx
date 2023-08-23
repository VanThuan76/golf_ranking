import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { ArrowRight, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';

import DataTableColumnHeader from '@/components/customization/table/dataTableColumnHeader';
import DataTable from '@/components/customization/table/dataTable';
import CountryFlag from '@/components/customization/CountryFlag';
import { IRankUser } from 'src/schemas/user.table.type';
import { dataTable } from 'src/shared/mocks/table';

const CustomizeCell = ({
  id,
  collapseStates,
  title,
  value,
  desc,
}: {
  id: number | string,
  collapseStates: Record<string, boolean>;
  title: string;
  value: string | number;
  desc: string;
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key={id}
      className='w-[200px] mt-4 flex-col-start p-4 rounded-lg border-slate-200 border-2'
      initial='hidden'
      animate={'visible'}
      variants={collapseStates[id] ? containerVariants : {}}
    >
      <h2 className='font-bold'>{title}</h2>
      <div className='flex-row-end'>
        <motion.p className='text-lg md:text-xl lg:text-2xl' variants={collapseStates[id] ? containerVariants : {}}>
          {value}
        </motion.p>
        <motion.p className='text-xs ml-1' variants={collapseStates[id] ? containerVariants : {}}>
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
};

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
          <React.Fragment>
            <div className='min-w-[50px] h-[20px] flex-row-between-center gap-2'>
              {collapseStates[props.cell.row.id] ? <ChevronDown /> : <ChevronUp />}
              <p className='text-center'>{props.cell.row.original.rank}</p>
            </div>

            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Xếp hạng cao nhất'
                value={props.cell.row.original.rank}
                desc=''
              />
            )}
          </React.Fragment>
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
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.code_vjgr}</p>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Tham gia'
                value={props.cell.row.original.entry}
                desc='giải đấu'
              />
            )}
          </React.Fragment>
        );
      },
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
      cell(props) {
        return (
          <React.Fragment>
            <div className='min-w-[150px] h-[20px] flex-row-center gap-2'>
              <CountryFlag countryCode={props.cell.row.original.country} />
              <p className='text-center'>{props.cell.row.original.name_member}</p>
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Vô địch'
                value={props.cell.row.original.win}
                desc='lần'
              />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={'Thành viên'}
          // defaultFilter={getFieldValueOnSearchParam('name_member')}
        />
      ),
    },
    {
      id: 'age',
      accessorKey: 'age',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.age}</p>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Giới tính'
                value={props.cell.row.original.gender === 0 ? 'Nữ' : 'Nam'}
                desc=''
              />
            )}
          </React.Fragment>
        );
      },
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
        return (
          <React.Fragment>
            <div className='flex-row-center'>
              <ArrowUp className='text-center' />
            </div>
            {collapseStates[props.cell.row.id] && (
              <div className='relative w-[100px] h-full'>
                <p className='absolute top-5 flex-row-center gap-1 px-2 rounded-lg hover:bg-slate-400 cursor-pointer'>
                  Xem thêm
                  <ArrowRight size={12} />
                </p>
              </div>
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tăng/giảm' />,
    },
    {
      id: 'point',
      accessorKey: 'point',
      cell(props) {
        return <p className='text-center'>{props.cell.row.original.point}</p>;
      },
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
      <DataTable
        data={dataTable || []}
        columns={columnNews}
        tableName={TABLE_NAME}
        isLoading={false}
        pageSize={0}
        pageIndex={0}
        pageCount={0}
        setCollapseStates={setCollapseStates}
        handChangePagination={function (value: number, type: 'Page_change' | 'Size_change'): void {
          throw new Error('Function not implemented.');
        }}
      />
    </section>
  );
}
export default HomeTable;

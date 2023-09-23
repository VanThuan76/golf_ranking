import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { ArrowRight, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';

import DataTableColumnHeader from '@/src/shared/components/customization/table/DataTableColumnHeader';
import DataTable from '@/src/shared/components/customization/table/DataTable';
import CountryFlag from '@/src/shared/components/customization/CountryFlag';
import { URL_SYSTEMS } from 'src/shared/constants';
import { IMember } from 'src/schemas/member.table.type';
import { calculateAge } from '@/src/shared/utils/business/calculateAge';

type Props = {
  members: IMember[];
  tableConfig: any;
  getFieldValueOnSearchParam: any;
};
const CustomizeCell = ({
  id,
  collapseStates,
  title,
  value,
  desc,
}: {
  id: number | string;
  collapseStates: Record<string, boolean>;
  title: string;
  value: string | number | null;
  desc: string;
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key={id}
      className='w-[200px] mt-4 flex-col-start p-4 rounded-lg border-[var(--main-color)] border-2'
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

export function TableRank({ members, tableConfig, getFieldValueOnSearchParam }: Props) {
  const router = useRouter();
  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>({});
  const TABLE_NAME = 'Ranking';
  const columnNews: ColumnDef<IMember>[] = [
    {
      id: 'best_rank',
      accessorKey: 'best_rank',
      cell(props) {
        return (
          <React.Fragment>
            <div className='min-w-[50px] h-[20px] flex-row-between-center gap-2'>
              {collapseStates[props.cell.row.id] ? <ChevronDown /> : <ChevronUp />}
              <p className='text-center'>
                {props.cell.row.original.best_rank ? props.cell.row.original.best_rank : 'Không'}
              </p>
            </div>

            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Xếp hạng cao nhất'
                value={props.cell.row.original.best_rank ? props.cell.row.original.best_rank : 0}
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
          defaultFilter={getFieldValueOnSearchParam('best_rank')}
        />
      ),
    },
    {
      id: 'vjgr_code',
      accessorKey: 'vjgr_code',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.vjgr_code}</p>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Tham gia'
                value={props.cell.row.original.counting_tournament}
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
          defaultFilter={getFieldValueOnSearchParam('vjgr_code')}
        />
      ),
    },
    {
      id: 'name',
      cell(props) {
        return (
          <React.Fragment>
            <div className='min-w-[150px] h-[20px] flex-row-start gap-2'>
              <CountryFlag countryCode={props.cell.row.original.nationality} />
              <p className='text-center'>{props.cell.row.original.name}</p>
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Vô địch'
                value={props.cell.row.original.number_of_wins}
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
          defaultFilter={getFieldValueOnSearchParam('vjgr_code')}
        />
      ),
    },
    {
      id: 'date_of_birth',
      accessorKey: 'date_of_birth',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{calculateAge(props.cell.row.original.date_of_birth)}</p>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                title='Giới tính'
                value={props.cell.row.original.gender}
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
          defaultFilter={getFieldValueOnSearchParam('date_of_birth')}
        />
      ),
    },
    {
      id: 'up-down',
      cell(props) {
        return (
          <React.Fragment>
            <div className='flex-row-center'>
              <ArrowUp color='#35B155' className='text-center' />
            </div>
            {collapseStates[props.cell.row.id] && (
              <div
                className='relative w-[100px] h-full'
                onClick={() => router.push(`${URL_SYSTEMS.RANK}/${props.cell.row.original.id}`)}
              >
                <p className='absolute top-5 flex-row-center gap-1 rounded-lg opacity-70 hover:opacity-100 cursor-pointer'>
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
      id: 'points',
      accessorKey: 'points',
      cell(props) {
        return <p className='text-center'>{props.cell.row.original.points}</p>;
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Điểm thưởng'
          defaultFilter={getFieldValueOnSearchParam('points')}
        />
      ),
    },
  ];
  return (
    <section className='w-full space-y-4'>
      {members && (
        <DataTable
          setCollapseStates={setCollapseStates}
          data={members}
          columns={columnNews}
          tableName={TABLE_NAME}
          {...tableConfig}
        />
      )}
    </section>
  );
}
export default TableRank;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

import DataTableColumnHeader from '@/components/customization/table/DataTableColumnHeader';
import DataTable from '@/components/customization/table/DataTable';
import CountryFlag from '@/components/customization/CountryFlag';
import { URL_SYSTEMS } from 'src/shared/constants';
import { ITournamentSummary } from 'src/schemas/tournament-summary.table.type';

type Props = {
  tournamentSummary: ITournamentSummary[];
  tableConfig: any;
};
const CustomizeCell = ({
  id,
  collapseStates,
  data,
}: {
  id: number | string;
  collapseStates: Record<string, boolean>;
  data: { title: string; value: string }[];
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key={id}
      className='w-full mt-4 p-4 flex-row-around-center '
      initial='hidden'
      animate='visible'
      variants={collapseStates[id] ? containerVariants : {}}
    >
      {data.map((item, idx) => (
        <div key={idx} className='w-full flex-col-start'>
          <p>{item.title}</p>
          <p className='font-semibold'>{item.value}</p>
        </div>
      ))}
    </motion.div>
  );
};

export function TableDetailRank({ tournamentSummary, tableConfig }: Props) {
  const router = useRouter();
  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>({});
  const TABLE_NAME = 'Detail Ranking';
  const columnNews: ColumnDef<ITournamentSummary>[] = [
    {
      id: 'time',
      accessorKey: 'time',
      cell(props) {
        const dataCustomizeCell = [
          {
            title: 'Khu vực',
            value: props.cell.row.original.tournament.region,
          },
          {
            title: 'Tỉnh/TP',
            value: props.cell.row.original.tournament.city,
          },
        ];
        return (
          <React.Fragment>
            <div className='min-w-[50px] h-[20px] flex-row-around-center'>
              {collapseStates[props.cell.row.id] ? <ChevronDown /> : <ChevronUp />}
              <p className='text-center'>{props.cell.row.original.tournament.from_date} - {props.cell.row.original.tournament.to_date}</p>
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell id={props.cell.row.id} collapseStates={collapseStates} data={dataCustomizeCell} />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Thời gian'
        />
      ),
    },
    {
      id: 'tournament_name',
      cell(props) {
        return (
          <React.Fragment>
            <div className='min-w-[150px] h-[20px] flex-row-center gap-2'>
              <CountryFlag countryCode={props.cell.row.original.tournament.country} />
              <p className='text-center'>{props.cell.row.original.tournament.name}</p>
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                data={[
                  {
                    title: 'Loại giải đấu',
                    value: props.cell.row.original.tournament.tournament_type.name,
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Giải đấu'
        />
      ),
    },
    {
      id: 'member_best_rank',
      accessorKey: 'member_best_rank',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.member.best_rank ? props.cell.row.original.member.best_rank : 0 }</p>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                data={[
                  {
                    title: 'Thể thức',
                    value: props.cell.row.original.tournament.format
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Xếp hạng'
        />
      ),
    },
    {
      id: 'total_score',
      accessorKey: 'total_score',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.total_score}</p>
            {collapseStates[props.cell.row.id] && (
              <div className='relative w-[100px] h-[50px] flex items-center justify-center' onClick={() => router.push(`${URL_SYSTEMS.DETAIL_TOURNAMENT}/${props.cell.row.id}`)}>
                <p className='absolute flex-row-center gap-1 mt-8 rounded-lg opacity-70 hover:opacity-100 cursor-pointer text-center'>
                  Xem thêm
                  <ArrowRight size={12} />
                </p>
              </div>
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Điểm số'
          // defaultFilter={getFieldValueOnSearchParam('age')}
        />
      ),
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
    <section id='TableDetailRank' className='w-full mt-4 space-y-4'>
      <DataTable
        setCollapseStates={setCollapseStates}
        data={tournamentSummary}
        columns={columnNews}
        tableName={TABLE_NAME}
        {...tableConfig}
      />
    </section>
  );
}
export default TableDetailRank;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { URL_SYSTEMS } from 'src/shared/constants';
import { ITournamentSummary } from 'src/schemas/tournament-summary.table.type';
import DataTableColumnHeader from '@/src/shared/components/customization/table/DataTableColumnHeader';
import DataTable from '@/src/shared/components/customization/table/DataTable';
import CountryFlag from '@/src/shared/components/customization/CountryFlag';
import useTrans from '@/src/shared/hooks/useTrans';
import { ITournamentDetail } from '@/src/schemas/tournament-detail.table.type';
import { Filter } from '@/src/shared/utils/typeSearchParams';
import { useGetListTournamentDetail } from '@/src/queries/tournament-detail.queires';

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
      className='w-full mt-4 p-4 flex-row-around-center'
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
const CustomizeTournamentDetail = ({ tournament_id, tournamentSummary }: {tournament_id: number, tournamentSummary:ITournamentSummary}) => {
  const { trans } = useTrans();
  const filterDetailTournament = [
    {
      field: 'tournament_id',
      value: tournament_id,
    },
    {
      field: 'member_id',
      value: tournamentSummary?.member?.id || '',
    },
  ]
  const { data: tournamentDetail } = useGetListTournamentDetail(filterDetailTournament);
  if (!tournamentDetail) return;
  for (let i = 1; i <= tournamentDetail?.content[0].tournament.number_round; i++) {
    const scoreByRound = tournamentDetail?.content.map(item => item.score).filter(item => String(item) !== '');
    const toParByRound = tournamentDetail?.content.map(item => item.to_par).filter(item => String(item) !== '');
      return (
        <div className='flex-row-start gap-4'>
          {scoreByRound.map((item, idx) => {
            return (
              <div key={idx} className='w-full mt-4 flex flex-col justify-start items-start gap-2'>
                <p>
                  {trans.tournament.round} {idx + 1}
                </p>
                <p className='font-semibold'>{item}</p>
              </div>
            );
          })}
          <div className='w-full mt-4 flex flex-col justify-start items-start gap-2'>
            <p>To par</p>
            <p className='font-semibold'>{toParByRound[i - 1]}</p>
          </div>
        </div>
      );
  }
}

export function TableDetailRank({ tournamentSummary, tableConfig }: Props) {
  const { trans } = useTrans();
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
            title: trans.common.area,
            value: props.cell.row.original.tournament.region,
          },
          {
            title: trans.common.provinceCity,
            value: props.cell.row.original.tournament.city,
          },
        ];
        return (
          <React.Fragment>
            <div className='min-w-[200px] h-[20px] flex-row-around-center'>
              {collapseStates[props.cell.row.id] ? <ChevronDown /> : <ChevronUp />}
              <p className='text-center'>
                {props.cell.row.original.tournament.from_date} - {props.cell.row.original.tournament.to_date}
              </p>
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell id={props.cell.row.id} collapseStates={collapseStates} data={dataCustomizeCell} />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title={trans.common.time} />,
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
                    title: trans.common.tournamentType,
                    value: props.cell.row.original.tournament.tournament_type.name,
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title={trans.common.tournament} />,
    },
    {
      id: 'finish',
      accessorKey: 'finish',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.finish ? props.cell.row.original.finish : 0}</p>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell
                id={props.cell.row.id}
                collapseStates={collapseStates}
                data={[
                  {
                    title: trans.common.formula,
                    value: props.cell.row.original.tournament.format,
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title={trans.common.rating} />,
    },
    {
      id: 'total_score',
      accessorKey: 'total_score',
      cell(props) {
        //Todo
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.total_score}</p>
            {collapseStates[props.cell.row.id] && <>{CustomizeTournamentDetail}</>}
          </React.Fragment>
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={trans.common.score}
          // defaultFilter={getFieldValueOnSearchParam('age')}
        />
      ),
    },
    {
      id: 'point',
      accessorKey: 'point',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{props.cell.row.original.point}</p>
            {collapseStates[props.cell.row.id] && (
              <div
                className='relative h-[50px] flex items-center justify-center'
                onClick={() => router.push(`${URL_SYSTEMS.DETAIL_TOURNAMENT}/${props.cell.row.original.tournament.id}`)}
              >
                <p className='absolute flex-row-center gap-1 mt-8 rounded-lg opacity-70 hover:opacity-100 cursor-pointer text-center'>
                  {trans.common.seeMore}
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
          title={trans.common.rewardPoint}
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

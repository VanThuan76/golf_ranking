import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

import DataTableColumnHeader from '@/src/shared/components/customization/table/DataTableColumnHeader';
import DataTable from '@/src/shared/components/customization/table/DataTable';
import CountryFlag from '@/src/shared/components/customization/CountryFlag';
import { URL_SYSTEMS } from 'src/shared/constants';
import { SearchGroupTournament } from './SearchGroupTournament';
import { IGroupTournamentSearch, ITournament } from 'src/schemas/tournament.table.type';
import { IBaseResponseWithCount } from 'src/schemas/baseResponse.type';
import useTrans from '@/src/shared/hooks/useTrans';
import { convertStringDay } from '@/src/shared/utils/business/convertStringDate';

type Props = {
  searchDefault: IGroupTournamentSearch;
  onChangeSearchArrayParams: any;
  titleGroupTournament: string;
  bannerGroupTournament: string;
  tournaments: IBaseResponseWithCount<ITournament[]>;
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

export function TableGroupTournament({
  searchDefault,
  onChangeSearchArrayParams,
  titleGroupTournament,
  bannerGroupTournament,
  tournaments,
  tableConfig,
}: Props) {
  const router = useRouter();
  const { trans } = useTrans();
  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>({});
  const TABLE_NAME = 'GroupTournament';
  const columnNews: ColumnDef<ITournament>[] = [
    {
      id: 'time',
      accessorKey: 'time',
      cell(props) {
        const dataCustomizeCell = [
          {
            title: trans.common.area,
            value: props.cell.row.original.region,
          },
          {
            title: trans.common.provinceCity,
            value: props.cell.row.original.city,
          },
        ];
        return (
          <React.Fragment>
            <div className='min-w-[200px] h-[20px] flex-row-around-center'>
              {collapseStates[props.cell.row.id] ? <ChevronDown /> : <ChevronUp />}
              <p className='text-center'>
                {convertStringDay(props.cell.row.original.from_date)} - {convertStringDay(props.cell.row.original.to_date)}
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
      accessorKey: 'tournament_name',
      cell(props) {
        const dataCustomizeCell = [
          {
            title: trans.common.tournamentType,
            value: props.cell.row.original.tournament_type.name,
          },
          {
            title: trans.tournament.numberOfRound,
            value: `${props.cell.row.original.number_round} ${trans.tournament.round}`,
          },
        ];
        return (
          <React.Fragment>
            <div className='min-w-[150px] h-[20px] flex-row-center gap-2'>
              <CountryFlag countryCode={props.cell.row.original.country} />
              <p className='text-center'>{props.cell.row.original.name}</p>
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell id={props.cell.row.id} collapseStates={collapseStates} data={dataCustomizeCell} />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title={trans.common.tournament} />,
    },
    {
      id: 'member_best_rank',
      accessorKey: 'member_best_rank',
      cell(props) {
        const dataCustomizeCell = [
          {
            title: trans.common.formula,
            value: props.cell.row.original.format,
          },
          {
            title: trans.common.organizer,
            value: props.cell.row.original.organiser.name,
          },
        ];
        return (
          <React.Fragment>
            <div className='relative min-w-[150px] h-[20px] flex-row-start gap-2'>
              {props.cell.row.original.member && (
                <CountryFlag countryCode={props.cell.row.original.member.nationality} />
              )}
              <p className='text-center'>{props.cell.row.original.member?.name ?? trans.table.nothing}</p>
              {props.cell.row.original.member && (
                <p
                  className='absolute left-1/2 -translate-x-2/3 top-1/2 translate-y-1/2 text-[12px] flex-row-center gap-1 rounded-lg opacity-70 hover:opacity-100 cursor-pointer'
                  onClick={() => router.push(`${URL_SYSTEMS.RANK}/${props.cell.row.original.member.id}`)}
                >
                  {trans.common.seeMore}
                  <ArrowRight size={12} />
                </p>
              )}
            </div>
            {collapseStates[props.cell.row.id] && (
              <CustomizeCell id={props.cell.row.id} collapseStates={collapseStates} data={dataCustomizeCell} />
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title={trans.tournament.championAthlete} />,
    },
    {
      id: 'point',
      accessorKey: 'point',
      cell(props) {
        return (
          <React.Fragment>
            <p className='text-center'>{trans.common.complete}</p>
            {collapseStates[props.cell.row.id] && (
              <div className='relative w-[100px] h-[50px] flex items-center justify-center'>
                <p
                  className='absolute flex-row-center gap-1 mt-8 rounded-lg opacity-70 hover:opacity-100 cursor-pointer text-center'
                  onClick={() => router.push(`${URL_SYSTEMS.DETAIL_TOURNAMENT}/${props.cell.row.original.id}`)}
                >
                  {trans.common.seeMore}
                  <ArrowRight size={12} />
                </p>
              </div>
            )}
          </React.Fragment>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title={trans.common.status} />,
    },
  ];
  return (
    <section id='TableGroupTournament' className='w-full mt-4 space-y-4'>
      <SearchGroupTournament
        searchDefault={searchDefault}
        titleGroupTournament={titleGroupTournament}
        bannerGroupTournament={bannerGroupTournament}
        onChangeSearchArrayParams={onChangeSearchArrayParams}
      />
      <DataTable
        setCollapseStates={setCollapseStates}
        data={tournaments.content}
        columns={columnNews}
        tableName={TABLE_NAME}
        {...tableConfig}
      />
    </section>
  );
}
export default TableGroupTournament;

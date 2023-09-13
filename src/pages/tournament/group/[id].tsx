import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useGetListTournament } from 'src/queries/tournament.queires';
import { Filter } from '@/src/shared/utils/typeSearchParams';
import { tournamentGroupData } from 'src/shared/mocks/tournament';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import TableGroupTournament from '@/src/shared/components/business/tournament/group/TableGroupTournament';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import { URL_SYSTEMS } from 'src/shared/constants';

const ScrollRevealWrapper = dynamic(() => import('@/src/shared/components/customization/ScrollRevealWrapper'), { ssr: false });
type Props = {
  name: string;
  nationality: string;
  tournament_type_id: number;
  from_date: string;
  to_date: string;
  status: number;
};

const GroupTournament = ({ name, nationality, tournament_type_id, from_date, to_date, status }: Props) => {
  const { query } = useRouter();
  const searchDefault = {
    name: name,
    nationality: nationality,
    tournament_type_id: tournament_type_id,
    from_date: from_date,
    to_date: to_date,
    status: status,
  };
  const filterGroupTournament: Filter[] = [
    {
      field: 'tournament_group_id',
      value: query.id,
    },
  ];
  const tournamentGroup = tournamentGroupData.find(item => item.id === Number(query.id));
  const { data: tournaments, tableConfig, onChangeSearchArrayParams } = useGetListTournament(filterGroupTournament);
  if (!tournaments) return <React.Fragment></React.Fragment>;
  return (
    <React.Fragment>
      <Head>
        <title>Hệ thống Vietnam Golf Association</title>
        <meta name='description' content='Hệ thống Vietnam Golf Association' />
        <meta name='keywords' content='Hệ thống Vietnam Golf Association' />
      </Head>
      <Breadcrumb title={`Quay lại Danh sách hệ thống giải đấu`} url={URL_SYSTEMS.TOURNAMENT} />
      <ScrollRevealWrapper>
        <TableGroupTournament
          searchDefault={searchDefault}
          onChangeSearchArrayParams={onChangeSearchArrayParams}
          titleGroupTournament={tournamentGroup?.name || ''}
          bannerGroupTournament={tournamentGroup?.image || ''}
          tournaments={tournaments}
          tableConfig={tableConfig}
        />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};

GroupTournament.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default GroupTournament;

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      name: parseInt(ctx.query['name'] as string),
      nationality: (ctx.query['nationality'] as string) || '',
      tournament_type_id: (ctx.query['tournament_type_id'] as string) || '',
      from_date: parseInt(ctx.query['from_date'] as string),
      to_date: parseInt(ctx.query['from_date'] as string),
      status: (ctx.query['status'] as string) || '',
    },
  };
};

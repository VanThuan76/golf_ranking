import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import { useRouter } from 'next/router';
import { dataTable } from 'src/shared/mocks/table';
import { InformationCardDetailTournament } from '@/components/business/tournament/detail/InformationCardDetailTournament';
import { Filter } from '@/utils/typeSearchParams';
import { useGetListTournamentDetail } from 'src/queries/tournament-detail.queires';
import TableDetailTournament from '@/components/business/tournament/detail/TableDetailTournament';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

const DetailTournament = () => {
  const { query } = useRouter();
  const filterDetailTournament: Filter[] = [{
    field: 'tournament_id',
    value: query.id,
  }];
  const { data: tournamentDetail, tableConfig } = useGetListTournamentDetail(filterDetailTournament);
  if (!tournamentDetail) return <React.Fragment></React.Fragment>;
  return (
    <React.Fragment>
      <Head>
        <title>Hệ thống Vietnam Golf Association</title>
        <meta name='description' content='Hệ thống Vietnam Golf Association' />
        <meta name='keywords' content='Hệ thống Vietnam Golf Association' />
      </Head>
      <ScrollRevealWrapper>
        <InformationCardDetailTournament data={dataTable[1]} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TableDetailTournament tournamentDetail={tournamentDetail?.content || []} tableConfig={tableConfig}  />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};

DetailTournament.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailTournament;

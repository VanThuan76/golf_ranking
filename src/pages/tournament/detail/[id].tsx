import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import { useRouter } from 'next/router';
import { InformationCardDetailTournament } from '@/components/business/tournament/detail/InformationCardDetailTournament';
import { Filter } from '@/utils/typeSearchParams';
import { useGetListTournamentDetail } from 'src/queries/tournament-detail.queires';
import { useGetListGroupByTournament } from 'src/queries/group.queires';
import { URL_SYSTEMS } from 'src/shared/constants';
import TabsDetailTournament from '@/components/business/tournament/detail/TabsDetailTournament';
import Breadcrumb from '@/components/customization/Breadcrumb';
import HintConditionDetailTournament from '@/components/business/tournament/detail/HintConditionDetailTournament';
import { StatusTournamentString } from 'src/schemas/tournament.table.type';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

const DetailTournament = () => {
  const { query } = useRouter();
  const filterDetailTournament: Filter[] = [
    {
      field: 'tournament_id',
      value: query.id,
    },
  ];
  const { data: tournamentDetail, tableConfig } = useGetListTournamentDetail(filterDetailTournament);
  const { data: groups } = useGetListGroupByTournament(query.id as React.Key);
  if (!tournamentDetail) return <React.Fragment></React.Fragment>;
  return (
    <React.Fragment>
      <Head>
        <title>Hệ thống Vietnam Golf Association</title>
        <meta name='description' content='Hệ thống Vietnam Golf Association' />
        <meta name='keywords' content='Hệ thống Vietnam Golf Association' />
      </Head>
      <Breadcrumb title={`Quay lại ${tournamentDetail.content[0].tournament.tournament_group.name}`} url={`${URL_SYSTEMS.GROUP_TOURNAMENT}/${query.id}`} />
      <ScrollRevealWrapper>
        <InformationCardDetailTournament
          groups={groups || []}
          tournamentInfor={tournamentDetail?.content[0].tournament || []}
        />
      </ScrollRevealWrapper>
      <HintConditionDetailTournament status={tournamentDetail.content[0].tournament.status as StatusTournamentString} />
      <ScrollRevealWrapper>
        <TabsDetailTournament
          groups={groups || []}
          tournamentDetail={tournamentDetail?.content || []}
          tableConfig={tableConfig}
        />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};

DetailTournament.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailTournament;

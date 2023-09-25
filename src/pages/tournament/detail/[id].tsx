import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import { useRouter } from 'next/router';
import { InformationCardDetailTournament } from '@/src/shared/components/business/tournament/detail/InformationCardDetailTournament';
import { Filter } from '@/src/shared/utils/typeSearchParams';
import { useGetListTournamentDetail } from 'src/queries/tournament-detail.queires';
import { useGetListGroupByTournament } from 'src/queries/group.queires';
import { URL_SYSTEMS } from 'src/shared/constants';
import TabsDetailTournament from '@/src/shared/components/business/tournament/detail/TabsDetailTournament';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import HintConditionDetailTournament from '@/src/shared/components/business/tournament/detail/HintConditionDetailTournament';
import { StatusTournamentString } from 'src/schemas/tournament.table.type';
import useTrans from '@/src/shared/hooks/useTrans';

const ScrollRevealWrapper = dynamic(() => import('@/src/shared/components/customization/ScrollRevealWrapper'), { ssr: false });

const DetailTournament = () => {
  const {trans} = useTrans()
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
        <title>{trans.tournament.titleDetail}</title>
        <meta name='description' content={trans.tournament.titleDetail} />
        <meta name='keywords' content='Vietnam Golf Association' />
      </Head>
      <Breadcrumb title={`${trans.common.return} ${tournamentDetail.content[0].tournament.tournament_group.name}`} url={`${URL_SYSTEMS.GROUP_TOURNAMENT}/${query.id}`} />
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

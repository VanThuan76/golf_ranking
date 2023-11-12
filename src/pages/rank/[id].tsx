import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
import { InformationCardDetailRank } from '@/src/shared/components/business/rank/detail/InformationCardDetailRank';
import { IMember } from 'src/schemas/member.table.type';
import { IBaseResponse } from 'src/schemas/baseResponse.type';
import { useGetListTournamentSummary } from 'src/queries/tournament-summary.queires';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import TableDetailRank from '@/src/shared/components/business/rank/detail/TableDetailRank';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import { URL_SYSTEMS } from 'src/shared/constants';
import useTrans from '@/src/shared/hooks/useTrans';
import { GetStaticPaths, GetStaticProps } from 'next/types';

const ScrollRevealWrapper = dynamic(() => import('@/src/shared/components/customization/ScrollRevealWrapper'), {
  ssr: false,
});
type Props = {
  member: IBaseResponse<IMember>;
};
const DetailRanking = ({ member }: Props) => {
  const { trans } = useTrans();
  const { query } = useRouter();
  const {
    data: tournamentSummary,
    tableConfig,
  } = useGetListTournamentSummary(query && Number(query.id));

  if (!member) return <React.Fragment></React.Fragment>;
  return (
    <React.Fragment>
      <Head>
        <title>{trans.rank.titleDetail}</title>
        <meta name='description' content={trans.rank.titleDetail} />
        <meta name='keywords' content='Golf Achievement' />
      </Head>
      <Breadcrumb title={trans.rank.breadcrumb} url={URL_SYSTEMS.RANK} />
      <ScrollRevealWrapper>
        <InformationCardDetailRank data={member.data} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        {tournamentSummary && (
          <TableDetailRank tournamentSummary={tournamentSummary?.content || []} tableConfig={tableConfig} />
        )}
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};
DetailRanking.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailRanking;

export const getStaticProps: GetStaticProps = async ctx => {
  const id = ctx.params?.id;
  if (id) {
    try {
      const responseMember = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/members/${id}`);
      const member = await responseMember.json();
      return {
        props: {
          member,
        },
      };
    } catch (error) {
      return {
        props: {
          member: null,
          error: 'Failed to fetch member data',
        },
      };
    }
  } else {
    return {
      props: {},
      notFound: true,
    };
  }
};
export const getStaticPaths: GetStaticPaths = async _ctx => {
  return {
    paths: [],
    fallback: true,
  };
};

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

const ScrollRevealWrapper = dynamic(() => import('@/src/shared/components/customization/ScrollRevealWrapper'), { ssr: false });
type Props = {
  member: IBaseResponse<IMember>;
};
const DetailRanking = ({ member }: Props) => {
  const { query } = useRouter();
  const { data: tournamentSummary, tableConfig, getFieldValueOnSearchParam } = useGetListTournamentSummary(query && Number(query.id));
  if (!member || !tournamentSummary) return <React.Fragment></React.Fragment>;
  return (
    <React.Fragment>
      <Head>
        <title>Bảng xếp hạng chi tiết Golf Achievement</title>
        <meta name='description' content='Bảng xếp hạng chi tiết Golf Achievement' />
        <meta name='keywords' content='Golf Achievement Công nghệ thông tin, Giải pháp số' />
      </Head>
      <Breadcrumb title={`Quay lại Bảng xếp hạng`} url={URL_SYSTEMS.RANK} />
      <ScrollRevealWrapper>
        <InformationCardDetailRank data={member.data} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TableDetailRank
          tournamentSummary={tournamentSummary?.content || []}
          tableConfig={tableConfig}
        />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const responseMember = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/members/${id}`);
  const member = await responseMember.json();
  return {
    props: {
      member,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
DetailRanking.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailRanking;

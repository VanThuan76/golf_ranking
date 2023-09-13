import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import BannerRank from '@/shared/components/business/rank/BannerRank';
import TabsRank from '@/shared/components/business/rank/TabsRank';
import { sectionBanner } from 'src/shared/mocks/home';
import { GetServerSideProps } from 'next';

const ScrollRevealWrapper = dynamic(() => import('@/shared/components/customization/ScrollRevealWrapper'), { ssr: false });
type Props = {
  name: string;
  vjgr_code: string;
  nationality: string;
};
export function Rank({ name, vjgr_code, nationality }: Props) {
  const searchDefault = {
    name: name,
    vjgr_code: vjgr_code,
    nationality: nationality,
  }
  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ Golf Ranking</title>
        <meta name='description' content='Trang chủ Golf Ranking' />
        <meta name='keywords' content='Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <BannerRank data={sectionBanner} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TabsRank searchDefault={searchDefault}/>
      </ScrollRevealWrapper>
    </React.Fragment>
  );
}
Rank.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Rank;

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      name: parseInt(ctx.query['name'] as string),
      vjgr_code: parseInt(ctx.query['vjgr_code'] as string),
      nationality: (ctx.query['nationality'] as string) || '',
    },
  };
};
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import BannerRank from '@/src/shared/components/business/rank/BannerRank';
import TabsRank from '@/src/shared/components/business/rank/TabsRank';
import { sectionBanner } from 'src/shared/mocks/home';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { login } from '@/src/shared/stores/appSlice';
import { useRegister } from '@/src/queries/auth/auth.queires';

const ScrollRevealWrapper = dynamic(() => import('@/src/shared/components/customization/ScrollRevealWrapper'), {
  ssr: false,
});
type Props = {
  name: string;
  vjgr_code: string;
  nationality: string;
};
function Rank({ name, vjgr_code, nationality }: Props) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const searchDefault = {
    name: name,
    vjgr_code: vjgr_code,
    nationality: nationality,
  };
  useEffect(() => {
    dispatch(
      login({
        user: session?.user,
        member: null,
      }),
    );
  }, []);
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
        <TabsRank searchDefault={searchDefault} />
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

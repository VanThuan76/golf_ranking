import Head from 'next/head';
import dynamic from 'next/dynamic';

import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import HomeBanner from '@/components/business/rank/Banner';
import HomeSearch from '@/components/business/rank/Search';
import HomeTabs from '@/components/business/rank/Tabs';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

export function Rank() {
  return (
    <>
      <Head>
        <title>Bảng xếp hạng Golf Ranking</title>
        <meta name='description' content='Bảng xếp hạng Golf Ranking' />
        <meta name='keywords' content='Golf Ranking Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <HomeBanner image={'/default.png'} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <HomeSearch />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <HomeTabs />
      </ScrollRevealWrapper>
    </>
  );
}
Rank.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Rank;

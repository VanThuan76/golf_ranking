import Head from 'next/head';
import dynamic from 'next/dynamic';

import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import BannerRank from '@/components/business/rank/BannerRank';
import SearchRank from '@/components/business/rank/SearchRank';
import TabsRank from '@/components/business/rank/TabsRank';
import { sectionBanner } from 'src/shared/mocks/home';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

export function Rank() {
  return (
    <>
      <Head>
        <title>Trang chủ Golf Ranking</title>
        <meta name='description' content='Trang chủ Golf Ranking' />
        <meta name='keywords' content='Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <BannerRank data={sectionBanner} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <SearchRank />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TabsRank />
      </ScrollRevealWrapper>
    </>
  );
}
Rank.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Rank;

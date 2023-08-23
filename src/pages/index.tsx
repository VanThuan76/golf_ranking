import Head from 'next/head';
import dynamic from 'next/dynamic';

import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import HomeBanner from '@/components/business/home/Banner';
import HomeSearch from '@/components/business/home/Search';
import HomeTabs from '@/components/business/home/Tabs';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

export function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ Golf Ranking</title>
        <meta name='description' content='Trang chủ Golf Ranking' />
        <meta name='keywords' content='Công nghệ thông tin, Giải pháp số' />
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
Home.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Home;

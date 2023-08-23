import Head from 'next/head';
import dynamic from 'next/dynamic';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import { useRouter } from 'next/router';

import { InformationCard } from '@/components/business/rank/detail/InformationCard';
import { dataTable } from 'src/shared/mocks/table';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

const DetailRanking = () => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>Bảng xếp hạng chi tiết Golf Ranking</title>
        <meta name='description' content='Bảng xếp hạng chi tiết Golf Ranking' />
        <meta name='keywords' content='Golf Ranking Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <InformationCard data={dataTable[1]} />
      </ScrollRevealWrapper>
    </>
  );
};

DetailRanking.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailRanking;

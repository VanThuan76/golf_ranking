import Head from 'next/head';
import dynamic from 'next/dynamic';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';

import { InformationCardDetailRank } from '@/components/business/rank/detail/InformationCardDetailRank';
import { dataTable } from 'src/shared/mocks/table';
import TableDetailRank from '@/components/business/rank/detail/TableDetailRank';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

const DetailRanking = () => {
  return (
    <>
      <Head>
        <title>Bảng xếp hạng chi tiết Golf Achievement</title>
        <meta name='description' content='Bảng xếp hạng chi tiết Golf Achievement' />
        <meta name='keywords' content='Golf Achievement Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <InformationCardDetailRank data={dataTable[1]} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TableDetailRank />
      </ScrollRevealWrapper>
    </>
  );
};

DetailRanking.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailRanking;

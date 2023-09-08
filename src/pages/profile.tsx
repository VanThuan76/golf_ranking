import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import TableDetailRank from '@/components/business/rank/detail/TableDetailRank';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });
const DetailProfile = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Bảng xếp hạng chi tiết Golf Achievement</title>
        <meta name='description' content='Bảng xếp hạng chi tiết Golf Achievement' />
        <meta name='keywords' content='Golf Achievement Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        {/* <TableDetailRank /> */}
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};
DetailProfile.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailProfile;

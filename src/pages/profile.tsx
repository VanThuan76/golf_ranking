import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import { useAppSelector } from '@/hooks/useRedux';
import ProfileUser from '@/components/business/user/ProfileUser';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });
const DetailProfile = () => {
  // const { user } = useAppSelector(state => state.appSlice);
  // const isLogin = user?.user !== undefined ? true : false;
  return (
    <React.Fragment>
      <Head>
        <title>Bảng xếp hạng chi tiết Golf Achievement</title>
        <meta name='description' content='Bảng xếp hạng chi tiết Golf Achievement' />
        <meta name='keywords' content='Golf Achievement Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <ProfileUser isLogin={false} />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};
DetailProfile.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailProfile;

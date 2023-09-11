import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import ProfileUser from '@/components/business/user/ProfileUser';
import ProfileMember from '@/components/business/user/ProfileMember';
import { useAppSelector } from '@/hooks/useRedux';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });
const DetailProfile = () => {
  const { user } = useAppSelector(state => state.appSlice);
  if(!user) return <></>
  return (
    <React.Fragment>
      <Head>
        <title>Thông tin người dùng Golf Achievement</title>
        <meta name='description' content='Thông tin người dùng Golf Achievement' />
        <meta name='keywords' content='Golf Achievement Công nghệ thông tin, Giải pháp số' />
      </Head>
      <ScrollRevealWrapper>
        <ProfileUser user={user.user && user.user} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <ProfileMember member={user.member && user.member} />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};
DetailProfile.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailProfile;

import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import ProfileUser from '@/src/shared/components/business/user/ProfileUser';
import ProfileMember from '@/src/shared/components/business/user/ProfileMember';
import { useAppSelector } from '@/src/shared/hooks/useRedux';
import useTrans from '@/src/shared/hooks/useTrans';


const ScrollRevealWrapper = dynamic(() => import('../shared/components/customization/ScrollRevealWrapper'), { ssr: false });
const DetailProfile = () => {
  const {trans} = useTrans()
  const { user } = useAppSelector(state => state.appSlice);
  if(!user) return <></>
  return (
    <React.Fragment>
      <Head>
        <title>{trans.user.title}</title>
        <meta name='description' content={trans.user.title} />
        <meta name='keywords' content='Golf Achievement' />
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

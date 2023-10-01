import React from 'react';
import FooterLayoutWebsite from './FooterLayoutWebsite';
import HeaderLayoutWebsite from './HeaderLayoutWebsite';
import { useAppSelector } from '@/src/shared/hooks/useRedux';
import { useGetUserByEmail, useGetUserById } from 'src/queries/user.queries';
interface Props {
  children: React.ReactNode;
}
const LayoutWebsite = ({ children }: Props) => {
  const { user } = useAppSelector(state => state.appSlice);
  const isLogin = user?.user !== undefined;
  const isMember = user?.member !== null;
  useGetUserByEmail()
  useGetUserById()
  return (
    <React.Fragment>
      <HeaderLayoutWebsite isLogin={isLogin ? true : false} isMember={isMember} />
      <main className='w-full min-h-screen dark:bg-[#141523] pb-4 md:pb-8 lg:pb-16 px-4 md:px-24'>
        {children}
      </main>
      <FooterLayoutWebsite />
    </React.Fragment>
  );
};

export default LayoutWebsite;

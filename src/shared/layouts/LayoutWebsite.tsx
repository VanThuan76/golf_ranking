import React from 'react';
import FooterLayoutWebsite from './FooterLayoutWebsite';
import HeaderLayoutWebsite from './HeaderLayoutWebsite';
import { useAppSelector } from '@/hooks/useRedux';
interface Props {
  children: React.ReactNode;
}

const LayoutWebsite = ({ children }: Props) => {
  const { user } = useAppSelector(state => state.appSlice);
  const isLogin = user?.user !== undefined ? true : false;
  return (
    <React.Fragment>
      <HeaderLayoutWebsite isLogin={isLogin ? true : false} />
      <main className='w-full min-h-screen dark:bg-[#141523] pb-4 md:pb-8 lg:pb-16 xl:pb-24 px-4 md:px-24 lg:px-32 xl:px-40'>
        {children}
      </main>
      <FooterLayoutWebsite />
    </React.Fragment>
  );
};

export default LayoutWebsite;

import Head from 'next/head';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import useTrans from '@/src/shared/hooks/useTrans';
import ImageUpdateSoon from '@/src/shared/components/icons/ImageUpdateSoon';
const UpdateSoon = () => {
  const { trans } = useTrans();
  return (
    <React.Fragment>
      <Head>
        <title>Golf Achievement</title>
        <meta name='description' content='Golf Achievement' />
        <meta name='keywords' content='Golf Achievement' />
      </Head>
      <div className='w-full h-screen mx-auto flex-col-center'>
        <h1 className='text-xl md:text-3xl font-semibold'>{trans.common.titleUpdateSoon}</h1>
        <ImageUpdateSoon />
      </div>
    </React.Fragment>
  );
};

UpdateSoon.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default UpdateSoon;

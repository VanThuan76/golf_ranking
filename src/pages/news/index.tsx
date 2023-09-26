import { useGetListNewsBySearch } from '@/src/queries/newsManagement.queries';
import { INewsSearch } from '@/src/schemas/news.type';
import HeaderNews from '@/src/shared/components/business/news/HeaderNews';
import ListNews from '@/src/shared/components/business/news/ListNews';
import useTrans from '@/src/shared/hooks/useTrans';
import LayoutWebsite from '@/src/shared/layouts/LayoutWebsite';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

const ScrollRevealWrapper = dynamic(() => import('@/src/shared/components/customization/ScrollRevealWrapper'), {
  ssr: false,
});
const News = () => {
  const { trans } = useTrans();
  const { data: news, tableConfig, getFieldValueOnSearchParam, onChangeSearchArrayParams } = useGetListNewsBySearch();
  if (!news) return <React.Fragment></React.Fragment>;
  return (
    <React.Fragment>
      <Head>
        <title>{trans.news.title}</title>
        <meta name='description' content={trans.news.title} />
        <meta name='keywords' content='Golf Ranking' />
      </Head>
      <ScrollRevealWrapper>
        <HeaderNews />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <ListNews data={news?.content as INewsSearch[]} />
      </ScrollRevealWrapper>
    </React.Fragment>
  );
};

News.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default News;

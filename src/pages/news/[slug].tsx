import { useGetListNewsBySearch } from '@/src/queries/newsManagement.queries';
import { INewsBySlug, INewsSearch } from '@/src/schemas/news.type';
import ListLastNews from '@/src/shared/components/business/news/ListLastNews';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import IconTime from '@/src/shared/components/icons/IconTime';
import IconUser from '@/src/shared/components/icons/IconUser';
import { URL_SYSTEMS } from '@/src/shared/constants';
import useTrans from '@/src/shared/hooks/useTrans';
import LayoutWebsite from '@/src/shared/layouts/LayoutWebsite';
import { convertStringDay } from '@/src/shared/utils/business/convertStringDate';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import React from 'react';

type Props = {
  data: INewsBySlug;
};
const DetailNews = ({ data }: Props) => {
  const { trans } = useTrans();
  const { data: news, tableConfig, getFieldValueOnSearchParam, onChangeSearchArrayParams } = useGetListNewsBySearch();
  const htmlContent = data && data.content;
  if (!htmlContent) return <React.Fragment></React.Fragment>;
  return (
    <section id='DetailNews' className='relative w-full'>
      <Breadcrumb title={trans.news.breadcrumb} url={URL_SYSTEMS.NEWS} className='mb-5' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-7 justify-start items-start gap-8'>
        <div className='md:col-span-4 w-full flex flex-col justify-start items-start gap-8'>
          <h1 className='text-lg md:text-2xl font-semibold'>{data.title}</h1>
          <div className='mt-5 flex justify-start items-start gap-3 self-end'>
            <div className='flex justify-center items-center gap-1 pr-3 border-r border-r-slate-300'>
              <IconUser className='text-base' />
              <p className='font-normal'>{data.author_name}</p>
            </div>
            <div className='flex justify-center items-center gap-1'>
              <IconTime className='text-base' />
              <p className='font-normal'>{convertStringDay(data.created_at)}</p>
            </div>
          </div>
          <div className='max-w-[100vw]' dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
        <div className='md:col-span-3 w-full min-h-[500px] flex flex-col justify-start items-start gap-8'>
          <h1 className='text-base md:text-xl font-semibold'>{trans.news.titleLastNews}</h1>
          <ListLastNews data={news?.content.filter(article => article.slug !== data.slug) as INewsSearch[]} />
        </div>
      </div>
    </section>
  );
};

DetailNews.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailNews;

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params?.slug;
  if (slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/news/${slug}`);
    const result = await res.json();
    const data: INewsBySlug = result.data;
    return {
      props: { data },
    };
  } else {
    return {
      props: {},
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async _ctx => {
  return {
    paths: [],
    fallback: true,
  };
};

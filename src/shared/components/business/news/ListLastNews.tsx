import { INewsSearch } from '@/src/schemas/news.type';
import React, { useState } from 'react';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import { useRouter } from 'next/router';
import { convertStringDay } from '@/src/shared/utils/business/convertStringDate';
import IconTime from '@/src/shared/components/icons/IconTime';
import IconUser from '@/src/shared/components/icons/IconUser';
import useBreakpoint from '@/src/shared/hooks/useBreakpoint';

type Props = {
  data: INewsSearch[];
  className?: string;
};
const ListLastNews = ({ className, data }: Props) => {
  const router = useRouter();
  const currentBreakpoint = useBreakpoint();
  const [isHover, setIsHover] = useState<INewsSearch | undefined>(undefined);
  if (!data) return <React.Fragment></React.Fragment>;
  return (
    <section id='ListLastNews' className={`mt-10 relative w-full rounded-lg ${className}`}>
      <div className='w-full grid grid-cols-1 justify-start items-start gap-8'>
        {data.map((article, idx) => {
          return (
            <div
              key={idx}
              className={`w-full max-h-[190px] grid grid-cols-1 md:grid-cols-2 justify-between items-start rounded-lg gap-4 ${
                isHover === article && 'bg-slate-200'
              }`}
            >
              <PreImage
                src={article.image as string}
                height={190}
                width={currentBreakpoint === "md" || currentBreakpoint === "sm" ? 1980 : 400}
                layer={true}
                alt={article.title}
                className='w-full max-h-[190px] rounded-lg object-cover object-bottom'
              />
              <div
                className='w-full h-full py-5 flex flex-col justify-start items-start gap-2 cursor-pointer'
                onClick={() => router.push(`/news/${article.slug}`)}
                onMouseEnter={() => setIsHover(article)}
                onMouseLeave={() => setIsHover(undefined)}
              >
                <h1 className='text-base font-medium'>{article.title}</h1>
                <div className='mt-5 w-full flex justify-start items-start gap-3'>
                  <div className='flex justify-center items-center gap-1 pr-1 border-r border-r-slate-300'>
                    <IconUser className='text-xs' />
                    <p className='font-normal text-xs'>{article.author_name}</p>
                  </div>
                  <div className='flex justify-center items-center gap-1'>
                    <IconTime className='text-xs' />
                    <p className='font-normal text-xs'>{convertStringDay(article.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ListLastNews;

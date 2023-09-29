import { INewsSearch } from '@/src/schemas/news.type';
import React, { useState } from 'react';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import { useRouter } from 'next/router';
import { convertStringDay } from '@/src/shared/utils/business/convertStringDate';
import IconTime from '@/src/shared/components/icons/IconTime';
import IconUser from '@/src/shared/components/icons/IconUser';

type Props = {
  data: INewsSearch[];
  className?: string;
};
const ListNews = ({ className, data }: Props) => {
  const router = useRouter();
  const [isHover , setIsHover] = useState<INewsSearch | undefined>(undefined)
  if (!data) return <React.Fragment></React.Fragment>;
  return (
    <section id='ListNews' className={`mt-10 relative w-full rounded-lg ${className}`}>
      <div className='w-full grid grid-cols-1 justify-start items-start gap-8'>
        {data.map((article, idx) => {
          const htmlDescription = article.description;
          return (
            <div key={idx} className={`w-full grid grid-cols-1 md:grid-cols-2 justify-between items-start rounded-lg gap-2 md:gap-4 ${isHover === article && "bg-slate-200"}`}>
              <PreImage
                src={article.image as string}
                height={300}
                width={800}
                layer={true}
                alt={article.title}
                className='w-full h-full rounded-l-lg object-cover object-bottom'
              />
              <div
                className='w-full h-full px-3 md:px-5 flex-col-start gap-2 cursor-pointer'
                onClick={() => router.push(`/news/${article.slug}`)}
                onMouseEnter={() => setIsHover(article)}
                onMouseLeave={() => setIsHover(undefined)}
              >
                <h1 className='text-lg md:text-2xl font-semibold'>{article.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: htmlDescription }}></div>
                <div className='mt-5 flex justify-start items-start gap-3 self-end'>
                  <div className='flex justify-center items-center gap-1 pr-3 border-r border-r-slate-300'>
                    <IconUser className='text-base'/>
                    <p className='font-normal'>{article.author_name}</p>
                  </div>
                  <div className='flex justify-center items-center gap-1'>
                    <IconTime className='text-base' />
                    <p className='font-normal'>{convertStringDay(article.created_at)}</p>
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

export default ListNews;

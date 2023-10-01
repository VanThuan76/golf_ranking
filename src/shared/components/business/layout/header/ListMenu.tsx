import React from 'react';
import { IMenuPath } from '@/src/shared/mocks/header';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IconCrown from '@/src/shared/components/icons/menu/IconCrown';
import IconTrophy from '@/src/shared/components/icons/menu/IconTrophy';
import IconNews from '@/src/shared/components/icons/menu/IconNews';
import useTrans from '@/src/shared/hooks/useTrans';

type Props = {
  menuPath: IMenuPath[];
  className?: string;
};
const ListMenu = ({ menuPath, className }: Props) => {
  const router = useRouter();
  const { trans } = useTrans();
  return (
    <React.Fragment>
      {menuPath.map((item, idx) => (
        <Link href={`/${item.path}`} key={idx}>
          <div className='relative w-full'>
            <div className='w-full flex-row-between-center gap-2'>
              {item.path === 'rank' ? <IconCrown /> : item.path === 'tournament' ? <IconTrophy /> : <IconNews />}
              <div>
                {item.path === 'rank'
                  ? trans.menu.rank
                  : item.path === 'tournament'
                  ? trans.menu.tournament
                  : trans.menu.news}
              </div>
            </div>
            {router.asPath.split('/')[1] === item.path ? (
              <motion.div
                className={`absolute bottom-[-20px] left-0 right-0 h-[4px] bg-white rounded-[8px] z-0 ${className}`}
                layoutId='underline'
              />
            ) : null}
          </div>
        </Link>
      ))}
    </React.Fragment>
  );
};

export default ListMenu;

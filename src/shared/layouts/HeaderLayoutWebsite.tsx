import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Menu, Radio } from 'lucide-react';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/src/shared/components/ui/sheet';
import { menuPath } from '@/src/shared/mocks/header';
import IconCrown from '@/src/shared/components/icons/menu/IconCrown';
import IconTrophy from '@/src/shared/components/icons/menu/IconTrophy';
import { Button } from '@/src/shared/components/ui/button';
import { useRouter } from 'next/router';
import ThemeModeToggle from '@/src/shared/components/customization/ToggleThemeMode';
import IconLogoLight from '@/src/shared/components/icons/IconLogoLight';
import AuthHeader from '@/src/shared/components/customization/AuthHeader';
import IconNews from '@/src/shared/components/icons/menu/IconNews';
import useTrans from '@/src/shared/hooks/useTrans';
import UseRouter from '@/src/shared/utils/function/UseRouter';
import { URL_SYSTEMS } from '@/src/shared/constants';
import SwitchLanguageMode from '../components/customization/switchLanguageMode';
interface Props {
  isLogin: boolean;
  isMember: boolean;
}
const HeaderLayoutWebsite = ({ isLogin, isMember }: Props) => {
  const router = useRouter();
  const { trans } = useTrans();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <motion.section
      initial={{ height: '100px' }}
      animate={{ height: isScrolled ? '80px' : '100px' }}
      transition={{ duration: 0.3 }}
      className={`w-full bg-[var(--main-color)] text-white top-0 z-50 flex-row-between-center gap-5 px-5 md:px-10 transition ${
        isScrolled
          ? 'sticky light:text-black border-b-[1px] border-opacity-50 border-black-300 inset-0 bg-opacity-10 backdrop-filter backdrop-blur duration-500 ease-in-out light:bg-[#141523]'
          : 'sticky bg-opacity-100 duration-500 ease-in-out'
      }`}
    >
      <div className='absolute left-5 flex-row-center gap-2'>
        <ul className='ml-10 hidden lg:flex justify-center items-center gap-10 dark:text-white'>
          {menuPath.map((item, idx) => (
            <Link href={`/${item.path}`} key={idx}>
              <div className='relative w-full'>
                <motion.div className='w-full flex-row-between-center gap-2'>
                  {item.path === 'rank' ? <IconCrown /> : item.path === 'tournament' ? <IconTrophy /> : <IconNews />}
                  <li>
                    {item.path === 'rank'
                      ? trans.menu.rank
                      : item.path === 'tournament'
                      ? trans.menu.tournament
                      : trans.menu.news}
                  </li>
                </motion.div>
                {router.asPath.split('/')[1] === item.path ? (
                  <motion.div
                    className='absolute bottom-[-20px] left-0 right-0 h-[4px] bg-white rounded-[8px] z-0'
                    layoutId='underline'
                  />
                ) : null}
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div className='w-full flex-row-center gap-5 cursor-pointer'>
        <IconLogoLight color='#fff' onClick={() => router.push('/')} />
      </div>
      <div className='absolute right-5 flex-row-center gap-2'>
        <div className='w-full flex-row-center gap-4'>
          {/* ///Auth Menu */}
          <UseRouter url={URL_SYSTEMS.TO_BE_UPDATE}>
            <button className='border border-bg-white dark:text-white font-bold py-2 px-4 rounded-full cursor-pointer hidden lg:block'>
              Livescore
            </button>
          </UseRouter>
          {!isMember && (
            <Button
              onClick={() => router.push('/member/register')}
              className='bg-white text-black cursor-pointer hidden lg:block hover:bg-slate-300'
            >
              {trans.common.registerMember}
            </Button>
          )}
          {isLogin ? (
            <AuthHeader />
          ) : (
            <div className='w-full flex gap-2'>
              <UseRouter url={URL_SYSTEMS.LOGIN}>
                <button className='dark:text-white font-bold py-2 px-4 cursor-pointer hidden lg:block'>
                  {trans.common.login}
                </button>
              </UseRouter>
              <UseRouter url={URL_SYSTEMS.REGISTER}>
                <Button className='hidden lg:block bg-white text-[#1B3864]'>{trans.common.register}</Button>
              </UseRouter>
            </div>
          )}
          {/* ///Options Menu */}
          <SwitchLanguageMode className='hidden md:block' />
          <ThemeModeToggle className='hidden md:block' />
          {/* ///Hamberger Menu */}
          <div className='lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Menu className='cursor-pointer' />
              </SheetTrigger>
              <SheetContent className='w-[220px] bg-[#1B3864] text-white' side={'left'}>
                <div className='w-full h-full flex-col-between-start'>
                  <div className='w-full h-full flex-col-start gap-4'>
                    {menuPath.map((item, idx) => (
                      <Link href={`/${item.path}`} key={idx}>
                        <SheetClose className='flex-row-between-center gap-2'>
                          {item.path === 'rank' ? (
                            <IconCrown />
                          ) : item.path === 'tournament' ? (
                            <IconTrophy />
                          ) : (
                            <IconNews />
                          )}
                          <div>
                            {item.path === 'rank'
                              ? trans.menu.rank
                              : item.path === 'tournament'
                              ? trans.menu.tournament
                              : trans.menu.news}
                          </div>
                        </SheetClose>
                      </Link>
                    ))}
                    <Link href='/update-soon'>
                      <SheetClose className='flex-row-between-center gap-2'>
                        <Radio />
                        <div>Livescore</div>
                      </SheetClose>
                    </Link>
                  </div>
                  {!isMember && (
                    <Button
                      onClick={() => router.push('/member/register')}
                      className='bg-white text-black cursor-pointer hidden lg:block hover:bg-slate-300'
                    >
                      {trans.common.registerMember}
                    </Button>
                  )}
                  {isLogin ? (
                    <AuthHeader className='!block' />
                  ) : (
                    <div className='w-full flex-col-center gap-4'>
                      <UseRouter url={URL_SYSTEMS.LOGIN}>
                        <Button className='w-full bg-white text-black cursor-pointer hover:bg-slate-300'>
                          {trans.common.login}
                        </Button>
                      </UseRouter>
                      <UseRouter url={URL_SYSTEMS.REGISTER}>
                        <Button className='w-full bg-white text-black cursor-pointer hover:bg-slate-300'>
                          {trans.common.register}
                        </Button>
                      </UseRouter>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeaderLayoutWebsite;

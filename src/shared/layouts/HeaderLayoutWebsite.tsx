import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import IconLogo from '@/components/icons/IconLogo';
import { menu } from '../mocks/header';
import IconCrown from '@/components/icons/menu/IconCrown';
import IconTrophy from '@/components/icons/menu/IconTrophy';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import ThemeModeToggle from '@/components/customization/toggleThemeMode';

const HeaderLayoutWebsite = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 150 && !isScrolled) {
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
      className={`w-full top-0 z-50 flex-row-between-center gap-5 px-5 md:px-10 transition ${
        isScrolled
          ? 'sticky light:text-black border-b-[1px] border-opacity-50 border-black-300 inset-0 bg-opacity-10 backdrop-filter backdrop-blur duration-500 ease-in-out light:bg-[#141523]'
          : 'sticky dark:bg-[#141523] bg-opacity-100 duration-500 ease-in-out'
      }`}
    >
      <div className='absolute left-5 flex-row-center gap-2'>
        <ul className='ml-10 hidden lg:flex justify-center items-center gap-10 dark:text-white'>
          {menu.map((item, idx) => (
            <Link href={`/${item.path}`} key={idx}>
              <div className='relative w-full'>
                <motion.div
                  className='w-full flex-row-between-center gap-2'
                >
                  {item.path === 'rank' ? <IconCrown /> : <IconTrophy />}
                  <li>{item.title}</li>
                </motion.div>
                {router.asPath.split('/')[1] === item.path ? (
                  <motion.div
                    className='absolute bottom-[-20px] left-0 right-0 h-[4px] bg-[#262D3A] rounded-[8px] z-0'
                    layoutId='underline'
                  />
                ) : null}
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div className='w-full flex-row-center gap-5 cursor-pointer'>
        <IconLogo onClick={() => router.push('/')} />
      </div>
      <div className='absolute right-5 flex-row-center gap-2'>
        <div
          id='dropdown'
          className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
        >
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Dashboard
              </a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Settings
              </a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Earnings
              </a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Sign out
              </a>
            </li>
          </ul>
        </div>
        <div className='flex-row-center gap-2'>
          <ThemeModeToggle />
          <button className='dark:text-white font-bold py-2 px-4 rounded cursor-pointer hidden lg:block'>
            Đăng nhập
          </button>
          <Button className='cursor-pointer hidden lg:block'>Đăng ký thành viên</Button>
          {/* ///Hamberger Menu */}
          <div className='lg:hidden xl:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <Menu />
                </div>
              </SheetTrigger>
              <SheetContent className='w-[220px]' side={'left'}>
                <div className='flex-col-start gap-4'>
                  {menu.map((item, idx) => (
                    <Link href={`/${item.path}`} key={idx}>
                      <div className='flex-row-between-center gap-2'>
                        {item.path === 'rank' ? <IconCrown /> : <IconTrophy />}
                        <li className='list-none'>{item.title}</li>
                      </div>
                    </Link>
                  ))}
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

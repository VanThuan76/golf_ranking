import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { Menu, Radio } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/src/shared/components/ui/sheet';
import { menuPath } from '@/src/shared/mocks/header';
import { Button } from '@/src/shared/components/ui/button';
import { URL_SYSTEMS } from '@/src/shared/constants';
import useTrans from '@/src/shared/hooks/useTrans';
import IconLogoLight from '@/src/shared/components/icons/IconLogoLight';
import AuthHeader from '@/src/shared/components/customization/AuthHeader';
import UseRouter from '@/src/shared/utils/function/UseRouter';
import SwitchLanguageMode from '@/src/shared/components/customization/switchLanguageMode';
import ListMenu from './ListMenu';

type Props = {
  isLogin: boolean;
  isMember: boolean;
};
const HambergerMenu = ({ isLogin, isMember }: Props) => {
  const router = useRouter();
  const { trans } = useTrans();
  return (
    <div className='lg:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className='cursor-pointer' />
        </SheetTrigger>
        <SheetContent className='w-full bg-[#1B3864] text-white' side={'top'}>
          <div className='w-full h-full flex-col-between-start'>
            <div className='-mt-5 w-full grid grid-cols-3 justify-between items-center gap-5 cursor-pointer'>
              <div></div>
              <IconLogoLight className='w-[120px] h-[40px]' color='#fff' onClick={() => router.push('/')} />
              <SwitchLanguageMode className='w-full flex justify-end items-end md:hidden' />
            </div>
            <div className='mt-5 w-full h-full flex-col-start gap-4'>
              <ListMenu menuPath={menuPath} className='!bottom-0 !-left-3 !w-[2px] !h-[25px]' />
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
              <div className='mt-5 w-full flex-row-center gap-4'>
                <UseRouter url={URL_SYSTEMS.LOGIN}>
                  <Button className='w-full bg-transparent text-white border border-gray-50 cursor-pointer hover:bg-slate-700'>
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
  );
};

export default HambergerMenu;

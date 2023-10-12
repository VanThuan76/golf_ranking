import * as React from 'react';
import { ChevronDown, ChevronRight, LogOut, Settings, Trophy, User2, User2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/src/shared/components/ui/dropdown-menu';
import { useAppSelector } from '@/src/shared/hooks/useRedux';
import { useRouter } from 'next/router';
import { APP_SAVE_KEY, URL_SYSTEMS } from 'src/shared/constants';
import TriggerDialogForm from './dialog/TriggerDialogForm';
import { FormResetPassword } from '@/src/shared/modules/auth/FormResetPassword';
import { ConfirmDialog } from './ConfirmDialog';
import { signOut } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { IResetPassword } from '@/src/schemas/user.table.type';
import { useResetPassword } from '@/src/queries/user.queries';
import { formResetPasswordSchema } from '@/src/shared/modules/auth/ForgotPasswordModule';
import useTrans from '@/src/shared/hooks/useTrans';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { logout } from "src/shared/stores/appSlice";

type Props = {
  className?: string;
};
const RowAuthHeader = ({
  title,
  icon,
  url,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  url?: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => url !== '' && router.push(url || '')}
      className={`w-[200px] flex-row-between-center ${className}`}
    >
      <div className='flex-row-center gap-1'>
        {icon}
        <p>{title}</p>
      </div>
      <ChevronRight size={12} />
    </div>
  );
};

const AuthHeader = ({ className }: Props) => {
  const dispatch = useDispatch()
  const { user } = useAppSelector(state => state.appSlice);
  const { trans } = useTrans();
  const router = useRouter();
  const doResetPassword = useResetPassword(() => router.push('/profile'));
  const handlerLogout = () => {
    router.push('/login');
    dispatch(logout())
    signOut({ redirect: false });
    deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
    deleteCookie(APP_SAVE_KEY.LOGIN_STATUS);
    deleteCookie(APP_SAVE_KEY.USER_ID);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <div className={`hidden lg:flex flex-row-center gap-8 ${className}`}>
          {user && user.member !== null ? (
            <React.Fragment>
              {user.member.vjgr_code && <p className='pr-4 border-r-2 border-r-white'>{user.member.vjgr_code}</p>}
              <div className='flex-row-end gap-4'>
                <div className='flex-col-end gap-2'>
                  <p>{trans.common.member}</p>
                  <p>{user.member.name}</p>
                </div>
                <ChevronDown />
              </div>
            </React.Fragment>
          ) : (
            <div className='w-full flex-col-start gap-5'>
              <div className='w-full flex-row-start gap-2'>
                <User2Icon size={18} />
                <p className='block md:hidden'>{trans.common.account}</p>
              </div>
              <Button
                onClick={() => router.push('/member/register')}
                className='bg-white text-black cursor-pointer hover:bg-slate-300 block md:hidden'
              >
                {trans.common.registerMember}
              </Button>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <RowAuthHeader icon={<User2 size={12} />} title='Tài khoản của tôi' url={`${URL_SYSTEMS.PROFILE}`} />
        </DropdownMenuItem>
        <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
          <TriggerDialogForm
            className='w-full'
            titleDialog='Thay đổi mật khẩu'
            trigger={
              <RowAuthHeader
                icon={<Settings size={12} />}
                className='pb-2 border-b-2 border-slate-100'
                title='Thay đổi mật khẩu'
              />
            }
            form={
              <FormResetPassword
                formSchema={formResetPasswordSchema}
                onSubmit={function (value: Partial<IResetPassword>) {
                  if (value.old_password && value.password_confirmation && value.new_password) {
                    const bodyRequest = {
                      user_id: user?.user.id || 0,
                      old_password: value.old_password,
                      new_password: value.new_password,
                      password_confirmation: value.password_confirmation,
                    };
                    doResetPassword.mutate(bodyRequest);
                  } else {
                    console.error('Thiếu giá trị trong form');
                  }
                }}
              />
            }
          />
        </div>
        {user && user.member !== null && (
          <DropdownMenuItem>
            <RowAuthHeader
              icon={<Trophy size={12} />}
              title='Thành tích'
              url={`${URL_SYSTEMS.RANK}/${user.member.id}`}
            />
          </DropdownMenuItem>
        )}
        <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
          <ConfirmDialog
            triggerCpn={
              <div className='w-[200px] flex-row-between-center'>
                <div className='flex-row-center gap-1'>
                  <LogOut size={12} />
                  <p>Đăng xuất</p>
                </div>
                <ChevronRight size={12} />
              </div>
            }
            title='Xác nhận đăng xuất'
            content='Bạn chắc chắn muốn đăng xuất'
            onOk={() => handlerLogout()}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthHeader;

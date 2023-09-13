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
import { URL_SYSTEMS } from 'src/shared/constants';
import TriggerDialogForm from './dialog/TriggerDialogForm';
import { FormResetPassword } from '@/src/shared/modules/auth/FormResetPassword';
import { z } from 'zod';

const formSchema = z.object({
  current_password: z
    .string({ required_error: 'Vui lòng nhập họ tên của bạn' })
    .min(1, { message: 'Vui lòng nhập họ tên của bạn' }),
});

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
    <div onClick={() => url !== "" && router.push(url || "")} className={`w-[200px] flex-row-between-center ${className}`}>
      <div className='flex-row-center gap-1'>
        {icon}
        <p>{title}</p>
      </div>
      <ChevronRight size={12} />
    </div>
  );
};
const AuthHeader = () => {
  const { user } = useAppSelector(state => state.appSlice);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <div className='hidden lg:flex flex-row-center gap-8'>
          {user && user.member !== null ? (
            <React.Fragment>
              {user.member.vjgr_code && <p className='pr-4 border-r-2 border-r-white'>{user.member.vjgr_code}</p>}
              <div className='flex-row-end gap-4'>
                <div className='flex-col-end gap-2'>
                  <p>Thành viên</p>
                  <p>{user.member.name}</p>
                </div>
                <ChevronDown />
              </div>
            </React.Fragment>
          ) : (
            <User2Icon size={18} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <RowAuthHeader icon={<User2 size={12} />} title='Tài khoản của tôi' url={`${URL_SYSTEMS.PROFILE}`} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TriggerDialogForm
            className='min-w-[1080px]'
            titleDialog='Chỉnh sửa ảnh'
            trigger={
              <RowAuthHeader
                icon={<Settings size={12} />}
                className='pb-2 border-b-2 border-slate-100'
                title='Thay đổi mật khẩu'
              />
            }
            form={
              <FormResetPassword
                formSchema={formSchema}
                onSubmit={function (value: Partial<any>): void {
                  throw new Error('Function not implemented.');
                }} // data={data}
                // onSubmit={function (value: Partial<any>): void {
                //   throw new Error('Function not implemented.');
                // }}
              />
            }
          />
        </DropdownMenuItem>
        {user && user.member !== null && (
          <DropdownMenuItem>
            <RowAuthHeader
              icon={<Trophy size={12} />}
              title='Thành tích'
              url={`${URL_SYSTEMS.RANK}/${user.member.id}`}
            />
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <RowAuthHeader icon={<LogOut size={12} />} title='Đăng xuất' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthHeader;

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IResgister } from 'src/schemas/user.table.type';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import InputText from '@/components/customization/form/InputText';
import InputPassword from '@/components/customization/form/InputPassword';
import IconLogoFacebook from '@/components/icons/IconLogoFacebook';
import IconLogoGoogle from '@/components/icons/IconLogoGoogle';
import { ConfirmDialog } from '@/components/customization/ConfirmDialog';
import { API_SSO_FACEBOOK, API_SSO_GOOGLE, URL_SYSTEMS } from 'src/shared/constants';

type Props = {
  formSchema: z.Schema<IResgister>;
  onSubmit: (value: Partial<IResgister>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<IResgister>;
  className?: string;
};

export function FormRegister({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<IResgister>>(defaultValue || {});
  const [type, setType] = useState('');
  const router = useRouter();
  const redirectURL = (type: string) => {
    if (type === 'facebook') {
      return window.open(API_SSO_FACEBOOK, '_blank');
    } else {
      return window.open(API_SSO_GOOGLE, '_blank');
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (defaultValue) {
      setInitialValues(defaultValue);
      for (const [key, value] of Object.entries(defaultValue)) {
        form.setValue(key as any, value, {
          // shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [defaultValue, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onError={e => {
          new Error(`Error ${e}`);
        }}
        className={`w-full space-y-8 ${className}`}
      >
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
          <InputText form={form} fieldName='fullName' label='Họ và tên*' placeHolder='Nhập họ tên của bạn' />
          <InputText form={form} fieldName='email' label='Email*' placeHolder='Nhập email của bạn' />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
          <InputPassword
            form={form}
            fieldName='password'
            label='Mật khẩu*'
            placeHolder='Nhập mật khẩu của bạn'
            inputProps={{ type: 'password' }}
          />
          <InputPassword
            form={form}
            fieldName='passwordConfirm'
            label='Xác nhận mật khẩu*'
            placeHolder='Nhập lại mật khẩu'
            inputProps={{ type: 'passwordConfirm' }}
          />
        </div>
        <div className='flex-col-center gap-2'>
          <Button className='w-full' type='submit'>
            {isLoading && <Loader2 size={16} className='animate-spin' />}Đăng ký
          </Button>
          <p className='text-sm'>
            Bạn đã có tài khoản thành viên? <strong className='cursor-pointer' onClick={() => router.push(URL_SYSTEMS.LOGIN)}>Đăng nhập</strong>
          </p>
        </div>
        <ConfirmDialog
          triggerCpn={
            <div className='relative w-full pt-4 flex-row-center gap-2 border-slate-200 border-t-2'>
              <p className='absolute -top-6 p-2 bg-white text-sm'>Hoặc đăng nhập với</p>
              <div className='w-full py-2 flex items-center justify-center rounded-lg border-slate-200 border-2 cursor-pointer hover:bg-slate-200'>
                <IconLogoFacebook onClick={() => setType('facebook')} />
              </div>
              <div className='w-full py-2 flex items-center justify-center rounded-lg border-slate-200 border-2 cursor-pointer hover:bg-slate-200'>
                <IconLogoGoogle onClick={() => setType('google')} />
              </div>
            </div>
          }
          title='Xác nhận chuyển hướng'
          content='Chắc chắn tiếp tục?'
          onOk={() => redirectURL(type)}
        />
      </form>
    </Form>
  );
}

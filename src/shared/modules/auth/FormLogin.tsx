import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { Loader2 } from 'lucide-react';
import { ConfirmDialog } from '@/shared/components/customization/ConfirmDialog';
import { API_SSO_FACEBOOK, API_SSO_GOOGLE, URL_SYSTEMS } from 'src/shared/constants';
import { ILogin } from 'src/schemas/auth.type';
import InputText from '@/shared/components/customization/form/InputText';
import InputPassword from '@/shared/components/customization/form/InputPassword';
import IconLogoFacebook from '@/shared/components/icons/IconLogoFacebook';
import IconLogoGoogle from '@/shared/components/icons/IconLogoGoogle';

type Props = {
  formSchema: z.Schema<ILogin>;
  onSubmit: (value: Partial<ILogin>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<ILogin>;
  className?: string;
};

export function FormLogin({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<ILogin>>(defaultValue || {});
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
        <InputText form={form} fieldName='email' label='Email*' placeHolder='Nhập email của bạn - @gmail.com' />
        <InputPassword
          form={form}
          fieldName='password'
          label='Mật khẩu*'
          placeHolder='Nhập mật khẩu của bạn'
          inputProps={{ type: 'password' }}
        />
        <div className='flex-row-end !my-[10px] cursor-pointer'
        onClick={() => router.push(URL_SYSTEMS.FORGOT_PASSWORD)}
        >
          <Button
            variant='link'
            type='button'
            disabled
            className='p-0 h-[10px]'
          >
            Quên mật khẩu?
          </Button>
        </div>
        <div className='flex-col-center gap-2'>
          <Button className='w-full' type='submit'>
            {isLoading && <Loader2 size={16} className='animate-spin' />}Đăng nhập
          </Button>
          <p className='text-sm'>
            Bạn chưa có tài khoản thành viên?{' '}
            <strong className='cursor-pointer' onClick={() => router.push(URL_SYSTEMS.REGISTER)}>
              Đăng ký
            </strong>
          </p>
        </div>
        <ConfirmDialog
          triggerCpn={
            <div className='relative w-full pt-4 flex-row-center gap-2 border-slate-200 border-t-2'>
              <p className='text-sm absolute -top-6 p-2 bg-white'>Hoặc đăng nhập với</p>
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

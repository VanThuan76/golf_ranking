import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import InputText from '@/components/customization/form/InputText';
import IconLogoFacebook from '@/components/icons/IconLogoFacebook';
import IconLogoGoogle from '@/components/icons/IconLogoGoogle';
import { ConfirmDialog } from '@/components/customization/ConfirmDialog';
import { API_SSO_FACEBOOK, API_SSO_GOOGLE } from 'src/shared/constants';

type Props = {
  formSchema: z.Schema<{email: string}>;
  onSubmit: (value: Partial<{email: string}>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<{email: string}>;
  className?: string;
};

export function FormForgotPassword({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<{email: string}>>(defaultValue || {});
  const [type, setType] = useState('');
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

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IAuth } from 'src/schemas/user.table.type';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import InputText from '@/components/customization/form/inputText';
import InputPassword from '@/components/customization/form/InputPassword';
import IconLogoFacebook from '@/components/icons/IconLogoFacebook';
import IconLogoGoogle from '@/components/icons/IconLogoGoogle';

type Props = {
  formSchema: z.Schema<IAuth>;
  onSubmit: (value: Partial<IAuth>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<IAuth>;
  className?: string;
};

export function FormLogin({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<IAuth>>(defaultValue || {});
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
        <div className='flex-row-end my-2'>
          <Button variant='link' type='button' disabled className='p-0 h-auto'>
            Quên mật khẩu?
          </Button>
        </div>
        <div className='flex-col-center gap-2'>
          <Button className='w-full' type='submit'>
            {isLoading && <Loader2 size={16} className='animate-spin' />}Đăng nhập
          </Button>
          <p>
            Bạn chưa có tài khoản thành viên? <strong>Đăng ký</strong>
          </p>
        </div>
        <div className='relative w-full pt-4 flex-row-center gap-2 border-slate-200 border-t-2'>
          <p className='absolute -top-6 p-2 bg-white'>Hoặc đăng nhập với</p>
          <div className='w-full py-2 flex items-center justify-center rounded-lg border-slate-200 border-2'>
            <IconLogoFacebook />
          </div>
          <div className='w-full py-2 flex items-center justify-center rounded-lg border-slate-200 border-2'>
            <IconLogoGoogle />
          </div>
        </div>
      </form>
    </Form>
  );
}

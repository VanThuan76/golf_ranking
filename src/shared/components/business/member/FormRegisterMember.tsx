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

type Props = {
  formSchema: z.Schema<IResgister>;
  onSubmit: (value: Partial<IResgister>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<IResgister>;
  className?: string;
};

export function FormRegisterMember({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<IResgister>>(defaultValue || {});
  const router = useRouter();
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
        <Button className='w-full' type='submit'>
          {isLoading && <Loader2 size={16} className='animate-spin' />}Đăng ký
        </Button>
      </form>
    </Form>
  );
}

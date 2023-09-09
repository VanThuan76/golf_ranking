import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import InputPassword from '@/components/customization/form/InputPassword';

type Props = {
  formSchema: z.Schema<any>;
  onSubmit: (value: Partial<any>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<any>;
  className?: string;
};

export function FormResetPassword({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<any>>(defaultValue || {});
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
        <InputPassword
          form={form}
          fieldName='current_password'
          label='Mật khẩu hiện tại*'
          placeHolder='Nhập mật khẩu hiện tại'
          inputProps={{ type: 'current_password' }}
        />
        <InputPassword
          form={form}
          fieldName='new_password'
          label='Mật khẩu mới*'
          placeHolder='Nhập mật khẩu mới'
          inputProps={{ type: 'new_password' }}
        />{' '}
        <InputPassword
          form={form}
          fieldName='new_password_confirm'
          label='Xác nhận mật khẩu*'
          placeHolder='Nhập lại mật khẩu mới'
          inputProps={{ type: 'new_password_confirm' }}
        />
      </form>
    </Form>
  );
}

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/src/shared/components/ui/form';
import InputPassword from '@/src/shared/components/customization/form/InputPassword';
import { Loader2 } from 'lucide-react';
import { Button } from '@/src/shared/components/ui/button';
import useTrans from '@/src/shared/hooks/useTrans';

type Props = {
  formSchema: z.Schema<any>;
  onSubmit: (value: Partial<any>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<any>;
  className?: string;
};

export function FormResetPassword({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const {trans} = useTrans()
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
          fieldName='old_password'
          label={trans.auth.currentPassword}
          placeHolder={trans.common.fillIn + " " + trans.auth.currentPassword}
          inputProps={{ type: 'old_password' }}
        />
        <InputPassword
          form={form}
          fieldName='new_password'
          label={trans.auth.newPassword}
          placeHolder={trans.common.fillIn + " " + trans.auth.newPassword}
          inputProps={{ type: 'new_password' }}
        />
        <InputPassword
          form={form}
          fieldName='password_confirmation'
          label={trans.auth.passwordConfirm}
          placeHolder={trans.common.fillIn + " " + trans.auth.passwordConfirm}
          inputProps={{ type: 'password_confirmation' }}
        />
        <Button className='w-full' type='submit'>
          {isLoading && <Loader2 size={16} className='animate-spin' />}{trans.common.update}
        </Button>
      </form>
    </Form>
  );
}

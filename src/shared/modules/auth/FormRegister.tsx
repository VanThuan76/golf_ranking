import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/src/shared/components/ui/button';
import { Form } from '@/src/shared/components/ui/form';
import { Loader2 } from 'lucide-react';
import InputText from '@/src/shared/components/customization/form/InputText';
import InputPassword from '@/src/shared/components/customization/form/InputPassword';
import { URL_SYSTEMS } from 'src/shared/constants';
import { IRegister } from 'src/schemas/auth.type';
import FacebookSignButton from './FacebookSignButton';
import GoogleSignButton from './GoogleSignButton';
import useTrans from '@/src/shared/hooks/useTrans';

type Props = {
  formSchema: z.Schema<IRegister>;
  onSubmit: (value: Partial<IRegister>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<IRegister>;
  className?: string;
};

export function FormRegister({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const { trans } = useTrans();
  const [initialValues, setInitialValues] = useState<Partial<IRegister>>(defaultValue || {});
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
          <InputText
            form={form}
            fieldName='name'
            label={trans.auth.firstLastName}
            placeHolder={trans.common.fillIn + ' ' + trans.auth.firstLastName}
          />
          <InputText form={form} fieldName='email' label='Email*' placeHolder={trans.common.fillIn + ' ' + 'email'} />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
          <InputPassword
            form={form}
            fieldName='password'
            label={trans.auth.password}
            placeHolder={trans.common.fillIn + ' ' + trans.auth.password}
            inputProps={{ type: 'password' }}
          />
          <InputPassword
            form={form}
            fieldName='password_confirmation'
            label={trans.auth.passwordConfirm}
            placeHolder={trans.common.fillIn + ' ' + trans.auth.passwordConfirm}
            inputProps={{ type: 'password_confirmation' }}
          />
        </div>
        <div className='flex-col-center gap-2'>
          <Button className='w-full' type='submit'>
            {isLoading && <Loader2 size={16} className='animate-spin' />}
            {trans.common.register}
          </Button>
          <p className='text-sm'>
            {trans.auth.descriptionRegister}{' '}
            <strong className='cursor-pointer' onClick={() => router.push(URL_SYSTEMS.LOGIN)}>
              {trans.common.login}
            </strong>
          </p>
        </div>
        <div className='relative w-full pt-4 flex-row-center gap-2 border-slate-200 border-t-2'>
          <p className='text-sm absolute -top-6 p-2 bg-white'>{trans.auth.hintLogin}</p>
          <FacebookSignButton />
          <GoogleSignButton />
        </div>
      </form>
    </Form>
  );
}

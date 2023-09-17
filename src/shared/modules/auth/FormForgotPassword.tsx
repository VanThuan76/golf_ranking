import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/src/shared/components/ui/form';
import InputText from '@/src/shared/components/customization/form/InputText';
import FacebookSignButton from './FacebookSignButton';
import GoogleSignButton from './GoogleSignButton';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  formSchema: z.Schema<{ email: string }>;
  onSubmit: (value: Partial<{ email: string }>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<{ email: string }>;
  className?: string;
};

export function FormForgotPassword({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<{ email: string }>>(defaultValue || {});
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
        <Button className='w-full' type='submit'>
          {isLoading && <Loader2 size={16} className='animate-spin' />}Gửi
        </Button>
        <div className='relative w-full pt-4 flex-row-center gap-2 border-slate-200 border-t-2'>
          <p className='text-sm absolute -top-6 p-2 bg-white'>Hoặc đăng nhập với</p>
          <FacebookSignButton />
          <GoogleSignButton />
        </div>
      </form>
    </Form>
  );
}

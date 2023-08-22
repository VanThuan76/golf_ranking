import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IAuth } from 'src/schemas/user.table.type';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import InputText from '@/components/customization/form/inputText';

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
      setInitialValues(defaultValue)
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
        className={`space-y-8 ${className}`}
      >
        <InputText form={form} fieldName='username' label='Tên' />
        <InputText form={form} fieldName='password' label='Địa chỉ' />

        <Button type='submit'>{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Lưu</Button>
      </form>
    </Form>
  );
}

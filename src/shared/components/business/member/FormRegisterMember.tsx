import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { IMemberRegister } from 'src/schemas/member.table.type';
import InputText from '@/components/customization/form/InputText';

type Props = {
  formSchema: z.Schema<IMemberRegister>;
  onSubmit: (value: Partial<IMemberRegister>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<IMemberRegister>;
  className?: string;
};

export function FormRegisterMember({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const [initialValues, setInitialValues] = useState<Partial<IMemberRegister>>(defaultValue || {});
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
          <InputText form={form} fieldName='name' label='Họ và tên*' placeHolder='Nhập họ tên của bạn' />
          <InputText
            form={form}
            fieldName='handicap_vga'
            label='Handicap VGA'
            placeHolder='Nhập Handicap VGA của bạn'
          />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-2'>
          <InputText form={form} fieldName='gender' label='Giới tính*' placeHolder='Nhập Giới tính của bạn' />
          <InputText form={form} fieldName='date_of_birth' label='Ngày sinh*' placeHolder='Nhập ngày sinh của bạn' />
          <InputText form={form} fieldName='date_of_birth' label='Quốc tịch*' placeHolder='Nhập Quốc tịch của bạn' />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
          <InputText form={form} fieldName='email' label='Email' placeHolder='Nhập email của bạn' />
          <InputText
            form={form}
            fieldName='phone_number'
            label='Số điện thoại*'
            placeHolder='Nhập số điện thoại VGA của bạn'
          />
        </div>
        <div className='w-full'>
          <h1>Thông tin bảo trợ</h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
            <InputText form={form} fieldName='email' label='Email' placeHolder='Nhập email của bạn' />
            <InputText
              form={form}
              fieldName='phone_number'
              label='Số điện thoại*'
              placeHolder='Nhập số điện thoại VGA của bạn'
            />
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
            <InputText form={form} fieldName='email' label='Email' placeHolder='Nhập email của bạn' />
            <InputText
              form={form}
              fieldName='phone_number'
              label='Số điện thoại*'
              placeHolder='Nhập số điện thoại VGA của bạn'
            />
          </div>
        </div>
        <Button className='w-full' type='submit'>
          {isLoading && <Loader2 size={16} className='animate-spin' />}Đăng ký
        </Button>
      </form>
    </Form>
  );
}

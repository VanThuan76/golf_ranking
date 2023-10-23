import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/components/ui/button';
import { Form } from '@/src/shared/components/ui/form';
import { Loader2 } from 'lucide-react';
import { IMemberRegister } from 'src/schemas/member.table.type';
import InputSelect from '@/src/shared/components/customization/form/InputSelect';
import InputDatePicker from '@/src/shared/components/customization/form/InputDatePicker';
import InputNumber from '@/src/shared/components/customization/form/InputNumber';
import InputText from '@/src/shared/components/customization/form/InputText';
import UseRouter from '@/src/shared/utils/function/UseRouter';
import useTrans from '@/src/shared/hooks/useTrans';
import { useGetListCommonCode } from '@/src/queries/common-code.queires';
import { useAppSelector } from '@/src/shared/hooks/useRedux';

type Props = {
  formSchema: z.Schema<IMemberRegister>;
  onSubmit: (value: Partial<IMemberRegister>) => void;
  isLoading?: boolean;
  defaultValue?: Partial<IMemberRegister>;
  className?: string;
};

export function FormRegisterMember({ formSchema, onSubmit, isLoading, defaultValue, className }: Props) {
  const {data: commonCode} = useGetListCommonCode()
  const { trans } = useTrans();
  const defaultGender = [
    {
      value: 2,
      label: 'Nam',
    },
    {
      value: 1,
      label: 'Nữ',
    },
  ];
  const user = useAppSelector(state => state.appSlice.user)
  var isDisabled = false
  if(user){
    isDisabled = true
  }
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
        className={`w-full space-y-6 ${className}`}
      >
        <div className='w-full'>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
            <InputText form={form} fieldName='name' label='Họ và tên*' placeHolder='Nhập họ tên của bạn' />
            <InputText
              form={form}
              fieldName='handicap_vga'
              label='Handicap VGA*'
              placeHolder='Nhập Handicap VGA của bạn'
            />
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-2'>
            <InputSelect options={defaultGender} fieldName='gender' label='Giới tính*' form={form} placeHolder='Giới tính của bạn'></InputSelect>
            <InputDatePicker form={form} fieldName='date_of_birth' label='Ngày sinh*' placeHolder='Ngày sinh của bạn' />
          {/* <InputText form={form} fieldName='nationality' label='Quốc tịch*' placeHolder='Ví dụ: VN' /> */}
          <InputSelect
                options={
                  commonCode
                    ? commonCode
                        .filter(item => item.type === 'nationality')
                        .map(item => ({ value: item.description_vi, label: item.description_vi }))
                    : []
                }
                placeHolder="Chọn quốc tịch"
                fieldName='national'
                label={trans.common.nationality}
                form={form}
          ></InputSelect>
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
            <InputText form={form} fieldName='email' label='Email' placeHolder='Nhập email của bạn' disabled={isDisabled}/>
            <InputNumber
              form={form}
              fieldName='phone_number'
              label='Số điện thoại*'
              placeHolder='Nhập số điện thoại của bạn'
            />
          </div>
        </div>
        <div className='w-full'>
          <h1>Thông tin bảo trợ</h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
            <InputText form={form} fieldName='guardian_name' label='Người bảo trợ*' placeHolder='Nhập người bảo trợ' />
            <InputText
              form={form}
              fieldName='relationship'
              label='Mối quan hệ*'
              placeHolder='Nhập mối quan hệ bảo trợ'
            />
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2'>
            <InputText form={form} fieldName='guardian_email' label='Email*' placeHolder='Nhập email của bảo trợ' />
            <InputNumber
              form={form}
              fieldName='guardian_phone'
              label='Số điện thoại*'
              placeHolder='Nhập số điện thoại của bảo trợ'
            />
          </div>
        </div>
        {/* <InputCheckBox title="Tôi đồng ý với Điều kiện & điều khoản thành viên" form={form} fieldName='guardian_phone' /> */}
        <div className='w-full grid grid-cols-3 gap-4 md:gap-12'>
          <UseRouter url='/'>
            <Button type='button' className='w-full col-span-1'>
              {trans.common.skip}
            </Button>
          </UseRouter>
          <Button className='w-full col-span-2' type='submit'>
            {isLoading && <Loader2 size={16} className='animate-spin' />}
            {trans.common.register}
          </Button>
        </div>
      </form>
    </Form>
  );
}

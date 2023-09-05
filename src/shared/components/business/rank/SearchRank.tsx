import InputSelect from '@/components/customization/form/InputSelect';
import InputText from '@/components/customization/form/InputText';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

type InputSelectProps = {
  fieldName: string;
  form: any;
  label?: string;
  placeHolder?: string;
  userId?: React.Key;
  handleOnChange?: (value: any) => void;
};

const InputSelectCountry = (props: InputSelectProps) => {
  const fake = [
    { value: 1, label: 'VN' },
    { value: 2, label: 'UK' },
  ];
  return (
    <InputSelect
      fieldName={props.fieldName || 'country'}
      form={props.form}
      label={props.label}
      placeHolder={props.placeHolder || 'Chọn quốc gia'}
      options={fake}
      // handleOnChange={props.handleOnChange}
    />
  );
};

const SearchRank = () => {
  const form = useForm({
    defaultValues: {
      member: '',
      id_vjgr: '',
      country: 1,
    },
  });
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  return (
    <section id='SearchRank' className='w-full'>
      <div className='max-w-[950px] absolute inset-x-0 mx-auto top-96 bg-[#fff] shadow-lg rounded-lg'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onError={e => {
              console.log(e);
            }}
            className='w-full flex-col-between-start mt-5 p-5'
          >
            <div className='w-full flex-row-center gap-10'>
              <InputText
                placeHolder='Nhập họ tên thành viên'
                fieldName='member'
                label='Thành viên'
                form={form}
              ></InputText>
              <InputText placeHolder='Nhập mã VJGR' fieldName='id_vjgr' label='Mã VJGR' form={form}></InputText>
              <InputSelectCountry
                placeHolder='Tất cả'
                fieldName='country'
                label='Quốc tịch'
                form={form}
                // handleOnChange={value =>
                //   onChangeSearchParams({
                //     field: 'userId',
                //     fieldType: 'LONG',
                //     op: 'EQUAL',
                //     value: value,
                //   })
                // }
              ></InputSelectCountry>
            </div>
            <div className='block mt-2 ml-auto'>
              <Button className='bg-[var(--main-color)]' type='submit'>
                <Search className='mr-2 h-4 w-4' />
                Tìm kiếm
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SearchRank;

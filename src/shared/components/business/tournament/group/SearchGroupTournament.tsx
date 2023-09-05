import InputSelect from '@/components/customization/form/InputSelect';
import InputText from '@/components/customization/form/InputText';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PreImage } from '@/components/customization/PreImage';
import InputDatePicker from '@/components/customization/form/InputDatePicker';

export function SearchGroupTournament() {
  const form = useForm({
    defaultValues: {
      tournament: '',
      type: 1,
      country: 1,
      status: 1,
      fromDate: '07/06/2023',
      toDate: '24/11/2023',
    },
  });
  const onSubmit = () => {};
  return (
    <section id='SearchGroupTournament' className='relative w-full max-h-[340px] mt-4 flex-col-between-start rounded-lg overflow-hidden'>
      <div className='absolute top-0 left-0 bg-transparent w-full h-full p-12 flex-col-around-start gap-5 z-30'>
        <h1 className='text-2xl'>Hệ thống giải VGA Junior</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onError={e => {
              console.log(e);
            }}
            className='bg-white w-full p-4 flex-col-between-start rounded-lg z-30'
          >
            <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-5'>
              <InputText
                placeHolder='Nhập tên giải đấu'
                fieldName='tournament'
                label='Giải đấu'
                form={form}
                className='col-span-2'
              ></InputText>
              <InputSelect
                options={[
                  { value: 1, label: 'VN' },
                  { value: 2, label: 'UK' },
                ]}
                placeHolder='Tất cả'
                fieldName='country'
                label='Quốc tịch'
                form={form}
              ></InputSelect>
              <InputSelect
                options={[
                  { value: 1, label: 'Hoàn thành' },
                  { value: 2, label: 'Huỷ' },
                ]}
                placeHolder='Tất cả'
                fieldName='status'
                label='Trạng thái'
                form={form}
              ></InputSelect>
            </div>
            <div className='mt-2 w-full grid grid-cols-1 md:grid-cols-4 gap-5 justify-center items-center'>
              <InputSelect
                options={[
                  { value: 1, label: 'Đơn' },
                  { value: 2, label: 'Đôi' },
                ]}
                placeHolder='Tất cả'
                fieldName='type'
                label='Loại giải đấu'
                form={form}
                className='col-span-2'
              ></InputSelect>
              <InputDatePicker form={form} fieldName='fromDate' placeHolder='Ngày bắt đầu' label='Từ ngày' />
              <InputDatePicker form={form} fieldName='toDate' placeHolder='Ngày kết thúc' label='Đến ngày ngày' />
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
      <PreImage
        width={1150}
        height={350}
        alt='TournamentDetail'
        src='/default.png'
        className='w-full object-center rounded-lg'
      />
    </section>
  );
}

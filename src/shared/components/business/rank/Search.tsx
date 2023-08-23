import InputSelect from '@/components/customization/form/inputSelect';
import InputText from '@/components/customization/form/inputText';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  member: z.string(),
  id_vjgr: z.string(),
});
const HomeSearch = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = () => {};
  return (
    <section id='HomeSearch' className='w-full'>
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
              <InputSelect
                options={[
                  { value: 1, label: 'folder1' },
                  { value: 2, label: 'folder2' },
                ]}
                placeHolder='Tất cả'
                fieldName='country'
                label='Quốc tịch'
                form={form}
              ></InputSelect>
            </div>
            <div className='block mt-2 ml-auto'>
              <Button type='submit'>
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

export default HomeSearch;

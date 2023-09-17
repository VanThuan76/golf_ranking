import { useGetListMemberBySearch } from '@/src/queries/member.queries';
import InputSelect from '@/src/shared/components/customization/form/InputSelect';
import InputText from '@/src/shared/components/customization/form/InputText';
import { Button } from '@/src/shared/components/ui/button';
import { Form } from '@/src/shared/components/ui/form';
import { Filter } from '@/src/shared/utils/typeSearchParams';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { IMember, IMemberSearch } from 'src/schemas/member.table.type';

type InputSelectProps = {
  fieldName: string;
  form: any;
  label?: string;
  placeHolder?: string;
  userId?: React.Key;
  data: {value: string, label: string}[]
  handleOnChange?: (value: any) => void;
};
const InputSelectCountry = (props: InputSelectProps) => {
  return (
    <InputSelect
      fieldName={props.fieldName || 'country'}
      form={props.form}
      label={props.label}
      placeHolder={props.placeHolder || 'Chọn quốc gia'}
      options={props.data}
      // handleOnChange={props.handleOnChange}
    />
  );
};

type Props = {
  members: IMember[]
  searchDefault: {
    name: string;
    vjgr_code: string;
    nationality: string;
  };
  onChangeSearchArrayParams: any;
};

const SearchRank = ({ members, searchDefault, onChangeSearchArrayParams }: Props) => {
  const uniqueNationalities = Array.from(new Set(members.map(member => member.nationality)));
  const transformedNationalitySearch = uniqueNationalities.map((member) => ({
    value: member,
    label: member,
  }));
  
  const form = useForm({
    defaultValues: searchDefault,
  });
  const onSubmit = async (data: IMemberSearch) => {
    try {
      const filters: Filter[] = [
        { field: "name", value: data.name},
        { field: "vjgr_code", value: data.vjgr_code},
        { field: "nationality", value: data.nationality}
      ]
      onChangeSearchArrayParams(filters)
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            <InputText placeHolder='Nhập họ tên thành viên' fieldName='name' label='Thành viên' form={form}></InputText>
            <InputText placeHolder='Nhập mã VJGR' fieldName='vjgr_code' label='Mã VJGR' form={form}></InputText>
            <InputSelectCountry
              data={transformedNationalitySearch || []}
              placeHolder='Tất cả'
              fieldName='nationality'
              label='Quốc tịch'
              form={form}
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
  );
};

export default SearchRank;

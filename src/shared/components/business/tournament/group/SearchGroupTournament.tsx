import InputSelect from '@/src/shared/components/customization/form/InputSelect';
import InputText from '@/src/shared/components/customization/form/InputText';
import InputDatePicker from '@/src/shared/components/customization/form/InputDatePicker';
import { Button } from '@/src/shared/components/ui/button';
import { Form } from '@/src/shared/components/ui/form';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import { useGetListCommonCode } from 'src/queries/common-code.queires';
import { useGetListTournamentType } from 'src/queries/tournament-type.queries';
import { IGroupTournamentSearch } from 'src/schemas/tournament.table.type';
import { Filter } from '@/src/shared/utils/typeSearchParams';

type Props = {
  searchDefault: IGroupTournamentSearch
  onChangeSearchArrayParams: any;
  titleGroupTournament: string;
  bannerGroupTournament: string;
};
export function SearchGroupTournament({ searchDefault, onChangeSearchArrayParams, titleGroupTournament, bannerGroupTournament }: Props) {
  const form = useForm({
    defaultValues: searchDefault,
  });
  const { data: commonCode } = useGetListCommonCode();
  const { data: tournamentType } = useGetListTournamentType();
  const onSubmit = async (data: IGroupTournamentSearch) => {
    try {
      const filters: Filter[] = [
        { field: "name", value: data.name},
        { field: "nationality", value: data.nationality},
        { field: "tournament_type_id", value: data.tournament_type_id},
        { field: "from_date", value: data.from_date},
        { field: "to_date", value: data.to_date},
        { field: "status", value: data.status}
      ]
      onChangeSearchArrayParams(filters)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section
      id='SearchGroupTournament'
      className='relative w-full max-h-[340px] mt-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div className='absolute top-0 left-0 bg-transparent w-full h-full p-12 flex-col-around-start gap-5 z-30'>
        <h1 className='text-3xl text-white font-semibold'>{titleGroupTournament}</h1>
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
                fieldName='name'
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
                fieldName='nationality'
                label='Quốc tịch'
                form={form}
              ></InputSelect>
              <InputSelect
                options={
                  commonCode
                    ? commonCode
                        .filter(item => item.type === 'TournamentStatus')
                        .map(item => ({ value: item.id, label: item.description_vi }))
                    : []
                }
                placeHolder='Tất cả'
                fieldName='status'
                label='Trạng thái'
                form={form}
              ></InputSelect>
            </div>
            <div className='mt-2 w-full grid grid-cols-1 md:grid-cols-4 gap-5 justify-center items-center'>
              <InputSelect
                options={tournamentType?.map(item => ({ value: item.id, label: item.name })) || []}
                placeHolder='Tất cả'
                fieldName='tournament_type_id'
                label='Loại giải đấu'
                form={form}
                className='col-span-2'
              ></InputSelect>
              <InputDatePicker form={form} fieldName='from_date' placeHolder='Ngày bắt đầu' label='Từ ngày' />
              <InputDatePicker form={form} fieldName='to_date' placeHolder='Ngày kết thúc' label='Đến ngày' />
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
        height={650}
        alt='TournamentDetail'
        src={bannerGroupTournament}
        layer={true}
        className='w-full object-center rounded-lg'
      />
    </section>
  );
}

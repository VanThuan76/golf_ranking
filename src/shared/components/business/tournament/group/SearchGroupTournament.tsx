import InputSelect from '@/src/shared/components/customization/form/InputSelect';
import InputText from '@/src/shared/components/customization/form/InputText';
import InputDatePicker from '@/src/shared/components/customization/form/InputDatePicker';
import { Button } from '@/src/shared/components/ui/button';
import { Form } from '@/src/shared/components/ui/form';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PreImage } from '@/src/shared/components/customization/PreImage';
import { useGetListCommonCode } from 'src/queries/common-code.queires';
import { useGetListTournamentType } from 'src/queries/tournament-type.queries';
import { IGroupTournamentSearch } from 'src/schemas/tournament.table.type';
import { Filter } from '@/src/shared/utils/typeSearchParams';
import useTrans from '@/src/shared/hooks/useTrans';
import useBreakpoint from '@/src/shared/hooks/useBreakpoint';
import { useState } from 'react';

type Props = {
  searchDefault: IGroupTournamentSearch;
  onChangeSearchArrayParams: any;
  titleGroupTournament: string;
  bannerGroupTournament: string;
};
export function SearchGroupTournament({
  searchDefault,
  onChangeSearchArrayParams,
  titleGroupTournament,
  bannerGroupTournament,
}: Props) {
  const currentBreakpoint = useBreakpoint();
  const [trigger, setTrigger] = useState(false);
  const { trans } = useTrans();
  const form = useForm({
    defaultValues: searchDefault,
  });
  const { data: commonCode } = useGetListCommonCode();
  const { data: tournamentType } = useGetListTournamentType();
  const onSubmit = async (data: IGroupTournamentSearch) => {
    try {
      const filters: Filter[] = [
        { field: 'name', value: data.name },
        { field: 'nationality', value: data.nationality },
        { field: 'tournament_type_id', value: data.tournament_type_id },
        { field: 'from_date', value: data.from_date },
        { field: 'to_date', value: data.to_date },
        { field: 'status', value: data.status },
      ];
      onChangeSearchArrayParams(filters);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section
      id='SearchGroupTournament'
      className='relative w-full md:max-h-[340px] mt-4 flex-col-between-start rounded-lg overflow-hidden'
    >
      <div
        className={`${
          trigger ? 'flex' : 'hidden'
        } md:flex absolute top-0 left-0 bg-transparent w-full h-full p-4 md:p-12 flex-col-around-start gap-5 z-30`}
      >
        <h1 className='text-xl md:text-3xl text-white font-semibold'>{titleGroupTournament}</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onError={e => {
              console.log(e);
            }}
            className='relative bg-white w-full p-4 flex-col-between-start rounded-lg z-30'
          >
            <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-5'>
              <InputText
                placeHolder={trans.common.fillIn + ' ' + trans.common.tournament}
                fieldName='name'
                label={trans.common.tournament}
                form={form}
                className='md:col-span-2'
              ></InputText>
              <InputSelect
                options={[
                  { value: 1, label: 'VN' },
                  { value: 2, label: 'UK' },
                ]}
                placeHolder={trans.common.all}
                fieldName='nationality'
                label={trans.common.nationality}
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
                placeHolder={trans.common.all}
                fieldName='status'
                label={trans.common.status}
                form={form}
              ></InputSelect>
            </div>
            <div className='mt-2 w-full grid grid-cols-1 md:grid-cols-4 gap-5 justify-center items-center'>
              <InputSelect
                options={tournamentType?.map(item => ({ value: item.id, label: item.name })) || []}
                placeHolder={trans.common.all}
                fieldName='tournament_type_id'
                label={trans.common.tournamentType}
                form={form}
                className='md:col-span-2'
              ></InputSelect>
              <InputDatePicker
                form={form}
                fieldName='from_date'
                placeHolder={trans.common.startDay}
                label={trans.common.fromDate}
              />
              <InputDatePicker
                form={form}
                fieldName='to_date'
                placeHolder={trans.common.endDay}
                label={trans.common.toDate}
              />
            </div>
            <div className='block mt-2 ml-auto'>
              <Button className='bg-[var(--main-color)]' type='submit'>
                <Search className='mr-2 h-4 w-4' />
                {trans.common.search}
              </Button>
            </div>
            <X className='md:hidden absolute top-2 right-2 cursor-pointer' onClick={() => setTrigger(!trigger)}/>
          </form>
        </Form>
      </div>
      <div
        className={`${
          trigger ? 'hidden' : 'grid'
        } grid-cols-1 gap-2 md:hidden absolute top-0 left-0 bg-transparent w-full h-full p-4 z-30`}
      >
        <h1 className='text-xl text-white font-semibold'>{titleGroupTournament}</h1>
        <div className='ml-auto'>
          <Button className='bg-[var(--main-color)]' type='button' onClick={() => setTrigger(!trigger)}>
            <Search className='mr-2 h-4 w-4' />
            {trans.common.search}
          </Button>
        </div>
      </div>
      <PreImage
        width={currentBreakpoint === 'sm' ? 500 : 1980}
        height={trigger || currentBreakpoint !== 'sm' ? 650 : 100}
        alt='TournamentDetail'
        src={bannerGroupTournament}
        layer={true}
        className='w-full h-full object-cover object-top rounded-lg'
      />
    </section>
  );
}

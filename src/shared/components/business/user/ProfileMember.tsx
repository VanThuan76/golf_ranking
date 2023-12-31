import useTrans from '@/src/shared/hooks/useTrans';
import { convertStringDay } from '@/src/shared/utils/business/convertStringDate';
import UseRouter from '@/src/shared/utils/function/UseRouter';
import { IMember } from 'src/schemas/member.table.type';
import { Button } from '../../ui/button';

interface Props {
  member: IMember | null;
}

const ProfileMember = ({ member }: Props) => {
  const { trans } = useTrans();
  if (!member) return <></>;
  const CardProfile = ({ title, label }: { title: any; label: string }) => {
    return (
      <div className='flex-col-start'>
        <p className='text-xs md:text-base font-medium'>{label}</p>
        <h3>{title}</h3>
      </div>
    );
  };
  return (
    <section id='ProfileMember' className='relative w-full mt-4 p-4 flex-col-between-start overflow-hidden'>
      <div className='w-full flex justify-between items-start'>
        <h1 className='font-semibold text-2xl'>{trans.user.memberInfor}</h1>
        {member.status !== 'Hoạt động' && member.status !== 'Đã đăng ký' && (
            <UseRouter url={`/member/update/${member.id}`}>
              <Button className='bg-[#214271] hover:bg-[#506d94]'>{trans.common.edit}</Button>
            </UseRouter>
          )}
      </div>
      <div className='w-full p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-lg rounded-lg'>
        <CardProfile label='Mã VJGR' title={member.vjgr_code} />
        <CardProfile label='Handicap VGA' title={member.handicap_vga} />
        <CardProfile label='Quốc tịch' title={member.nationality} />
        <CardProfile label='Giới tính' title={member.gender} />
        <CardProfile label='Ngày sinh' title={convertStringDay(member.date_of_birth)} />
        <CardProfile label='Trạng thái' title={member.status} />
        {member.status === 'Từ chối' && <CardProfile label='Lý do từ chối' title={member.reason} />}
      </div>
      <h1 className='font-semibold text-2xl mt-4'>{trans.user.guardianInfor}</h1>
      <div className='w-full p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-lg rounded-lg'>
        <CardProfile label='Họ tên' title={member.guardian_name} />
        <CardProfile label='Email' title={member.guardian_email} />
        <CardProfile label='Số điện thoại' title={member.guardian_phone} />
      </div>
    </section>
  );
};

export default ProfileMember;

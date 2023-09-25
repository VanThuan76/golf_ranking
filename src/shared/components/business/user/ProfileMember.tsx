import useTrans from '@/src/shared/hooks/useTrans';
import { IMember } from 'src/schemas/member.table.type';

interface Props {
  member: IMember | null;
}

const ProfileMember = ({ member }: Props) => {
  const {trans} = useTrans()
  if (!member) return <></>;
  const CardProfile = ({ title, label }: { title: any; label: string }) => {
    return (
      <div className='flex-col-start'>
        <p className='text-xs font-thin'>{label}</p>
        <h3>{title}</h3>
      </div>
    );
  };
  return (
    <section id='ProfileMember' className='relative w-full mt-4 p-4 flex-col-between-start overflow-hidden'>
      <h1 className='font-semibold text-2xl'>{trans.user.memberInfor}</h1>
      <div className='w-full p-12 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-lg rounded-lg'>
        <CardProfile label='Mã VJGR' title={member.vjgr_code} />
        <CardProfile label='Handicap VGA' title={member.handicap_vga} />
        <CardProfile label='Quốc tịch' title={member.nationality} />
        <CardProfile label='Giới tính' title={member.gender} />
        <CardProfile label='Ngày sinh' title={member.date_of_birth} />
      </div>
      <h1 className='font-semibold text-2xl mt-4'>{trans.user.guardianInfor}</h1>
      <div className='w-full p-12 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-lg rounded-lg'>
        <CardProfile label='Họ tên' title={member.guardian_name} />
        <CardProfile label='Email' title={member.guardian_email} />
        <CardProfile label='Số điện thoại' title={member.guardian_phone} />
      </div>
    </section>
  );
};

export default ProfileMember;

import * as z from 'zod';

import { bannerLogin } from 'src/shared/mocks/login';
import BlankLayout from 'src/shared/layouts/BlankLayout';
import { URL_SYSTEMS } from 'src/shared/constants';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import { FormRegisterMember } from '@/src/shared/components/business/member/FormRegisterMember';
import IconLogoDark from '@/src/shared/components/icons/IconLogoDark';
import SliderFull from '@/src/shared/components/customization/SliderFull';
import { IMemberRegister } from '@/src/schemas/member.table.type';

const formSchema = z.object({
  user_id: z.number(),
  name: z
    .string({ required_error: 'Vui lòng nhập họ tên của bạn' })
    .min(1, { message: 'Vui lòng nhập họ tên của bạn' }),
  handicap_vga: z
    .string({ required_error: 'Vui lòng nhập handicap_vga' })
    .min(1, { message: 'Vui lòng nhập handicap_vga' }),
  gender: z.number({ required_error: 'Vui lòng chọn giới tính' }),
  date_of_birth: z.date({ required_error: 'Vui lòng nhập ngày sinh của bạn' }),
  nationality: z
    .string({ required_error: 'Vui lòng nhập quốc gia của bạn' })
    .min(1, { message: 'Vui lòng nhập quốc gia của bạn' }),
  email: z.string({ required_error: 'Vui lòng nhập email của bạn' }).min(1, { message: 'Vui lòng nhập email của bạn' }),
  phone_number: z
    .string({ required_error: 'Vui lòng nhập số điện thoại của bạn' })
    .min(1, { message: 'Vui lòng nhập số điện thoại của bạn' }),
  guardian_name: z
    .string({ required_error: 'Vui lòng nhập họ tên người bảo hộ của bạn' })
    .min(1, { message: 'Vui lòng nhập họ tên người bảo hộ của bạn' }),
  relationship: z
    .string({ required_error: 'Vui lòng nhập mối quan hệ với người bảo hộ của bạn' })
    .min(1, { message: 'Vui lòng nhập mối quan hệ với người bảo hộ của bạn' }),
  guardian_email: z
    .string({ required_error: 'Vui lòng nhập email người bảo hô của bạn' })
    .min(1, { message: 'Vui lòng nhập email người bảo hô của bạn' }),
  guardian_phone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại người bảo hộ của bạn' })
    .min(1, { message: 'Vui lòng nhập số điện thoại người bảo hộ của bạn' }),
});

const RegisterMember = () => {
  function onSubmit(value: Partial<IMemberRegister>) {
    if (value.name && value.handicap_vga && value.gender && value.date_of_birth) {
      const bodyRequest = {
        name: value.name,
        handicap_vga: value.handicap_vga,
        gender: value.gender,
        date_of_birth: value.date_of_birth,
      };
      console.log(bodyRequest)
      // doRegister.mutate(bodyRequest);
    } else {
      console.error('Thiếu giá trị trong form đăng ký');
    }
  }
  return (
    <div className='w-full min-h-screen flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
        <SliderFull slides={bannerLogin} />
      </div>
      <div className='w-full min-h-[700px] col-span-1 mx-auto'>
        <div className='w-full h-full flex-col-between-start space-y-6'>
          <IconLogoDark className='float-left' />
          <Breadcrumb title={`Quay lại Giải đấu`} url={URL_SYSTEMS.TOURNAMENT} />
          <div className='font-semibold text-2xl w-full text-black'>Đăng ký thành viên</div>
          <p>Đăng ký thành viên để tham gia giải đấu và bảng xếp hạng</p>
          <FormRegisterMember formSchema={formSchema} onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  );
};

RegisterMember.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default RegisterMember;

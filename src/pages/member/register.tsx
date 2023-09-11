import * as z from 'zod';

import { bannerLogin } from 'src/shared/mocks/login';
import SliderFull from '@/components/customization/SliderFull';
import IconLogo from '@/components/icons/IconLogoDark';
import BlankLayout from 'src/shared/layouts/BlankLayout';
import Breadcrumb from '@/components/customization/Breadcrumb';
import { FormRegisterMember } from '@/components/business/member/FormRegisterMember';
import { URL_SYSTEMS } from 'src/shared/constants';

const formSchema = z.object({
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
  return (
    <div className='w-full min-h-screen flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
        <SliderFull slides={bannerLogin} />
      </div>
      <div className='w-full min-h-[700px] col-span-1 mx-auto'>
        <div className='w-full h-full flex-col-between-start space-y-6'>
          <IconLogo className='float-left' />
          <Breadcrumb title={`Quay lại Giải đấu`} url={URL_SYSTEMS.TOURNAMENT} />
          <div className='font-semibold text-2xl w-full text-black'>Đăng ký thành viên</div>
          <p>Đăng ký thành viên để tham gia giải đấu và bảng xếp hạng</p>
          <FormRegisterMember formSchema={formSchema} />
        </div>
      </div>
    </div>
  );
};

RegisterMember.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default RegisterMember;

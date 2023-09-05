import * as z from 'zod';

import { bannerLogin } from 'src/shared/mocks/login';
import SliderFull from '@/components/customization/SliderFull';
import IconLogo from '@/components/icons/IconLogoDark';
import BlankLayout from 'src/shared/layouts/BlankLayout';
import { FormRegisterMember } from '@/components/business/member/FormRegisterMember';

const formSchema = z.object({
  fullName: z
    .string({ required_error: 'Vui lòng nhập họ tên của bạn' })
    .min(1, { message: 'Vui lòng nhập họ tên của bạn' }),
  email: z.string({ required_error: 'Vui lòng nhập email của bạn' }).min(1, { message: 'Vui lòng nhập email của bạn' }),
  password: z.string({ required_error: 'Vui lòng nhập mật khẩu' }).min(1, { message: 'Vui lòng nhập mật khẩu' }),
  passwordConfirm: z
    .string({ required_error: 'Vui lòng nhập lại mật khẩu' })
    .min(1, { message: 'Vui lòng nhập lại mật khẩu' }),
});

const RegisterMember = () => {
  return (
    <div className='w-full h-full flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
        <SliderFull slides={bannerLogin} />
      </div>
      <div className='w-full col-span-1 mx-auto'>
        <div className='w-full flex-col-start space-y-6'>
          <IconLogo className='float-left' />
          <div className='font-semibold text-2xl w-full text-black'>Đăng ký thành viên</div>
          <p>Đăng ký thành viên để tham gia giải đấu và bảng xếp hạng</p>
          <FormRegisterMember formSchema={formSchema} onSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};

RegisterMember.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default RegisterMember;

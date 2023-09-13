import * as z from 'zod';

import SliderFull from '@/src/shared/components/customization/SliderFull';
import IconLogo from '@/src/shared/components/icons/IconLogoDark';
import { bannerLogin } from 'src/shared/mocks/login';
import { FormForgotPassword } from './FormForgotPassword';
import { FormResetPassword } from './FormResetPassword';

const formForgotPasswordSchema = z.object({
  email: z.string({ required_error: 'Vui lòng điền tên đăng nhập' }).min(1, { message: 'Vui lòng điền tên đăng nhập' }),
});

const formResetPasswordSchema = z.object({
  current_password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu hiện tại' })
    .min(1, { message: 'Vui lòng nhập mật khẩu hiện tại' }),
  new_password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu mới' })
    .min(1, { message: 'Vui lòng nhập mật khẩu mới' }),
  new_password_confirm: z
    .string({ required_error: 'Vui lòng nhập lại mật khẩu mới' })
    .min(1, { message: 'Vui lòng nhập lại mật khẩu mới' }),
});

const ForgotPasswordModule = () => {
  const test = true;
  return (
    <div className='w-full h-full flex-col-start gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='w-full col-span-1 mx-auto'>
        <div className='w-full flex-col-start space-y-6'>
          <IconLogo className='float-left' />
          <div className='font-bold text-3xl w-full text-black'>Quên mật khẩu</div>
          {test ? (
            <FormResetPassword formSchema={formResetPasswordSchema} onSubmit={() => {}} />
          ) : (
            <FormForgotPassword formSchema={formForgotPasswordSchema} onSubmit={() => {}} />
          )}
        </div>
      </div>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
        <SliderFull slides={bannerLogin} />
      </div>
    </div>
  );
};

export default ForgotPasswordModule;

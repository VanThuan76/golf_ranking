import * as z from 'zod';

import SliderFull from '@/src/shared/components/customization/SliderFull';
import IconLogo from '@/src/shared/components/icons/IconLogoDark';
import { bannerLogin } from 'src/shared/mocks/login';
import { FormForgotPassword } from './FormForgotPassword';
import { FormResetPassword } from './FormResetPassword';
import { useVerifyEmail } from '@/src/queries/user.queries';
import { useState } from 'react';

const formForgotPasswordSchema = z.object({
  email: z.string({ required_error: 'Vui lòng điền tên đăng nhập' }).min(1, { message: 'Vui lòng điền tên đăng nhập' }),
});
export const formResetPasswordSchema = z.object({
  old_password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu hiện tại của bạn' })
    .min(1, { message: 'Vui lòng nhập mật khẩu hiện tại của bạn' }),
  new_password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu mới của bạn' })
    .min(1, { message: 'Vui lòng nhập mật khẩu mới của bạn' }),
  password_confirmation: z
    .string({ required_error: 'Vui lòng nhập mật khẩu mới của bạn' })
    .min(1, { message: 'Vui lòng nhập mật khẩu mới của bạn' }),
});
const ForgotPasswordModule = () => {
  const [isVerified, setIsVerified] = useState(false);
  const doVerifyEmail = useVerifyEmail();
  function onSubmit(value: Partial<{ email: string }>) {
    if (value.email) {
      const bodyRequest = {
        email: value.email,
      };
      doVerifyEmail.mutate(bodyRequest);
    } else {
      console.error('Thiếu giá trị trong form đăng ký');
    }
  }
  return (
    <div className='w-full h-full flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='w-full col-span-1 mx-auto'>
        <div className='w-full flex-col-start space-y-6'>
          <IconLogo className='float-left' />
          <div className='font-bold text-3xl w-full text-black'>Quên mật khẩu</div>
          {isVerified ? (
            <FormResetPassword formSchema={formResetPasswordSchema} onSubmit={onSubmit} />
          ) : (
            <FormForgotPassword formSchema={formForgotPasswordSchema} onSubmit={onSubmit} />
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

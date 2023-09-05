import * as z from 'zod';

import SliderFull from '@/components/customization/SliderFull';
import IconLogo from '@/components/icons/IconLogoDark';
import { bannerLogin } from 'src/shared/mocks/login';
import { FormLogin } from './FormLogin';

const formSchema = z.object({
  username: z
    .string({ required_error: 'Vui lòng điền tên đăng nhập' })
    .min(1, { message: 'Vui lòng điền tên đăng nhập' }),
  password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
});

const LoginModule = () => {
  return (
    <div className='w-full h-full flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='w-full col-span-1 mx-auto'>
        <div className='w-full flex-col-start space-y-6'>
          <IconLogo className='float-left' />
          <div className='font-bold text-3xl w-full text-black'>Đăng nhập</div>
          <FormLogin formSchema={formSchema} onSubmit={() => {}} />
        </div>
      </div>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
         <SliderFull slides={bannerLogin} />
      </div>
    </div>
  );
};

export default LoginModule;

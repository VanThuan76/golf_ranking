import * as z from 'zod';
import { useRouter } from 'next/router';
import { bannerLogin } from 'src/shared/mocks/login';
import { ILogin } from 'src/schemas/auth.type';
import { FormLogin } from './FormLogin';
import { useLogin } from 'src/queries/auth/auth.queires';
import SliderFull from '@/src/shared/components/customization/SliderFull';
import IconLogo from '@/src/shared/components/icons/IconLogoDark';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import useTrans from '@/src/shared/hooks/useTrans';
import { URL_SYSTEMS } from '@/src/shared/constants';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Vui lòng điền email' })
    .min(1, { message: 'Vui lòng điền email' }),
  password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
});

const LoginModule = () => {
  const {trans} = useTrans()
  const router = useRouter()
  const doLogin = useLogin(() => router.push('/'));
  function onSubmit(value: Partial<ILogin>) {
    if (value.email && value.password) {
      const bodyRequest = {
        email: value.email,
        password: value.password,
      };
      doLogin.mutate(bodyRequest);
    } else {
      console.error('Không tìm thấy tên đăng nhập và mật khẩu');
    }
  }
  return (
    <div className='w-full h-full flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='w-full col-span-1 mx-auto'>
        <div className='w-full flex-col-start space-y-6'>
          <IconLogo className='float-left' />
          <Breadcrumb title={trans.auth.breadcrumbLogin} url={URL_SYSTEMS.HOME} />
          <div className='font-bold text-3xl w-full text-black'>{trans.common.login}</div>
          <FormLogin formSchema={formSchema} onSubmit={onSubmit} />
        </div>
      </div>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
         <SliderFull slides={bannerLogin} />
      </div>
    </div>
  );
};

export default LoginModule;

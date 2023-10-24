import * as z from 'zod';
import { useRouter } from 'next/router';
import SliderFull from '@/src/shared/components/customization/SliderFull';
import IconLogo from '@/src/shared/components/icons/IconLogoDark';
import { bannerLogin } from 'src/shared/mocks/login';
import { FormRegister } from './FormRegister';
import { useRegister } from 'src/queries/auth/auth.queires';
import { IRegister } from 'src/schemas/auth.type';
import useTrans from '@/src/shared/hooks/useTrans';
import Breadcrumb from '@/src/shared/components/customization/Breadcrumb';
import { URL_SYSTEMS } from '@/src/shared/constants';
import { axiosInstanceNoAuth } from '@/src/https.config';
import { IBaseResponse } from '@/src/schemas/baseResponse.type';

const formSchema = z
  .object({
    name: z
      .string({ required_error: 'Vui lòng nhập họ tên của bạn' })
      .min(1, { message: 'Vui lòng nhập họ tên của bạn' }),
    email: z
      .string({ required_error: 'Vui lòng nhập email của bạn' })
      .min(1, { message: 'Vui lòng nhập email của bạn' })
      .email('Vui lòng điền đúng email')
      .refine(
        async email => {
          try {
            const checkEmail = await axiosInstanceNoAuth.post<IBaseResponse<[]>>('/check-email-exists', {
              email,
            });
            return checkEmail && true;
          } catch (error) {
            return false;
          }
        },
        { message: 'Email đã tồn tại trong hệ thống.' },
      ),
    password: z.string({ required_error: 'Vui lòng nhập mật khẩu' }).min(1, { message: 'Vui lòng nhập mật khẩu' }),
    password_confirmation: z
      .string({ required_error: 'Vui lòng nhập lại mật khẩu' })
      .min(1, { message: 'Vui lòng nhập lại mật khẩu' }),
  })
  .refine((data: any) => data.password === data.password_confirmation, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ["password_confirmation"],
  });

const RegisterModule = () => {
  const { trans } = useTrans();
  const router = useRouter();
  const doRegister = useRegister(() => router.push('/member/register'));
  const defaultValue: IRegister = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  function onSubmit(value: Partial<IRegister>) {
    {
      if (value.name && value.email && value.password && value.password_confirmation) {
        const bodyRequest = {
          name: value.name,
          email: value.email,
          password: value.password,
          password_confirmation: value.password_confirmation,
        };
        doRegister.mutate(bodyRequest);
      } else {
        console.error('Thiếu giá trị trong form đăng ký');
      }
    }
  }
  return (
    <div className='w-full h-full flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
        <SliderFull slides={bannerLogin} />
      </div>
      <div className='w-full col-span-1 mx-auto'>
        <div className='w-full flex-col-start space-y-6'>
          <IconLogo className='float-left' />
          <Breadcrumb title={trans.auth.breadcrumbLogin} url={URL_SYSTEMS.HOME} />
          <div className='font-semibold text-2xl w-full text-black'>{trans.auth.titleRegister}</div>
          <FormRegister formSchema={formSchema} onSubmit={onSubmit} defaultValue={defaultValue} />
        </div>
      </div>
    </div>
  );
};

export default RegisterModule;

import IconLogo from '@/components/icons/IconLogo';
import * as z from 'zod';
import { FormLogin } from './form';

const formSchema = z.object({
  username: z
    .string({ required_error: 'Vui lòng điền tên đăng nhập' })
    .min(1, { message: 'Vui lòng điền tên đăng nhập' }),
  password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
});

const LoginModule = () => {
  return (
    <div className='relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
      <div className='w-full h-full lg:px-8'>
        <IconLogo className='my-2 md:my-4 lg:my-8' />
        <div className='mx-auto w-full h-full flex-col-start space-y-6 sm:w-[450px]'>
          <div className='font-bold text-3xl w-full text-black'>Đăng nhập</div>
          <FormLogin formSchema={formSchema} onSubmit={() => {}} />
        </div>
      </div>
      <div className='relative md:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div
          className='absolute inset-0 login-background'
          style={{
            backgroundImage: `url("/bg-login.jpg")`,
            backgroundOrigin: 'initial',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backdropFilter: 'blur(3px)',
          }}
        />
        <div className={`bg-black absolute top-0 left-0 w-full h-full opacity-50`}></div>

        <div className='relative z-20 h-10 flex justify-start text-lg font-medium'>
          <b>COFFEE INFORMATION & SERVICE</b>
        </div>
        <div className='relative z-20 mt-auto'>
          <h1 className='text-4xl font-semibold tracking-tight'>
            <div className='text-yellow-400'>COFFEE</div>
            <div>INFORMATION & SERVICE</div>
          </h1>
          <p className='mt-4 text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nostrum architecto neque. Enim voluptas
            recusandae necessitatibus officia vero porro alias facere non atque aut, adipisci dolores sit libero
            asperiores explicabo.
          </p>
        </div>
        <div className='relative z-20 mt-auto'>
          <p className='text-lg'>Copyright &copy; Coffee Information&Service 2023</p>
        </div>
      </div>
    </div>
  );
};

export default LoginModule;

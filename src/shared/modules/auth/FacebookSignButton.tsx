import IconLogoFacebook from '../../components/icons/IconLogoFacebook';
import { signIn } from 'next-auth/react';

const FacebookSignButton = () => {
  const handleRedirect = () => {
    signIn('facebook', { callbackUrl: '/member/register' });
  };
  return (
    <div
      onClick={handleRedirect}
      className='w-full py-2 flex items-center justify-center rounded-lg border-slate-200 border-2 cursor-pointer hover:bg-slate-200'
    >
      <IconLogoFacebook />
    </div>
  );
};

export default FacebookSignButton;

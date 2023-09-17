import IconLogoGoogle from '../../components/icons/IconLogoGoogle';
import { signIn } from 'next-auth/react';
const GoogleSignButton = () => {
  const handleRedirect = () => {
    signIn('google', { callbackUrl: '/' });
  };
  return (
    <div
      onClick={handleRedirect}
      className='w-full py-2 flex items-center justify-center rounded-lg border-slate-200 border-2 cursor-pointer hover:bg-slate-200'
    >
      <IconLogoGoogle />
    </div>
  );
};

export default GoogleSignButton;

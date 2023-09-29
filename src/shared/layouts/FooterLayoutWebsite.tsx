import { footerContactData } from '../mocks/footer';
import IconLogo from '@/src/shared/components/icons/IconLogoDark';
import IconLocation from '@/src/shared/components/icons/footer/IconLocation';
import IconPhone from '@/src/shared/components/icons/footer/IconPhone';
import IconMail from '@/src/shared/components/icons/footer/IconMail';
import IconFacebook from '@/src/shared/components/icons/footer/IconFacebook';
import Link from 'next/link';
import { SOCIAL_BUSINESS } from '../constants';
import useTrans from '../hooks/useTrans';

const FooterLayoutWebsite = () => {
  const {trans} = useTrans()
  return (
    <section className='bg-[var(--main-color)] text-white font-thin md:padding-section'>
      <div className='container-layer flex-col-between-center gap-10 p-4 md:p-6 lg:p-12'>
        <div className='w-full mb-4 grid grid-cols-1 lg:grid-cols-3 justify-start items-start'>
          <div className='col-span-1 flex-col-start gap-5'>
            <IconLogo color='#fff' />
            <Link href={SOCIAL_BUSINESS.FACEBOOK} target="_blank">
              <IconFacebook />
            </Link>
          </div>
          <div className='col-span-2 w-full mt-5 lg:mt-0 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5'>
          <div className='flex-col-start gap-5'>
            <h2 className='font-bold'>{trans.footer.aboutUs}</h2>
            <p>{trans.footer.historyBegin}</p>
            <p>{trans.footer.visionMission}</p>
            <p>{trans.footer.termsConditions}</p>
          </div>
          <div className='flex-col-start gap-5'>
            <h2 className='font-bold'>{trans.footer.contact}</h2>
            <div className='flex-row-between-center gap-2'>
              <IconLocation />
              <p>{trans.footer.address}</p>
            </div>
            <div className='flex-row-between-center gap-2'>
              <IconPhone />
              <p>{trans.footer.phoneNumber}</p>
            </div>
            <div className='flex-row-between-center gap-2'>
              <IconMail />
              <p>Email: {footerContactData.email}</p>
            </div>
          </div>
          </div>
        </div>
        <div className='w-full py-5 flex-col-end md:flex-row border-t-2'>
          <p>{trans.footer.copyright}</p>
        </div>
      </div>
    </section>
  );
};

export default FooterLayoutWebsite;

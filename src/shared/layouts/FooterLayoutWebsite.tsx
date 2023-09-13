import { footerContactData } from '../mocks/footer';
import IconLogo from '@/shared/components/icons/IconLogoDark';
import IconLocation from '@/shared/components/icons/footer/IconLocation';
import IconPhone from '@/shared/components/icons/footer/IconPhone';
import IconMail from '@/shared/components/icons/footer/IconMail';
import IconFacebook from '@/shared/components/icons/footer/IconFacebook';
import Link from 'next/link';
import { SOCIAL_BUSINESS } from '../constants';

const FooterLayoutWebsite = () => {
  return (
    <section className='bg-[var(--main-color)] text-white font-thin padding-section'>
      <div className='container-layer flex-col-between-center gap-10 p-4 md:p-6 lg:p-12'>
        <div className='w-full mb-4 flex-col-between-start md:flex-row'>
          <div className='flex-col-start gap-5'>
            <IconLogo color='#fff' />
            <Link href={SOCIAL_BUSINESS.FACEBOOK} target="_blank">
              <IconFacebook />
            </Link>
          </div>
          <div className='flex-col-start gap-5'>
            <h2 className='font-bold'>Về chúng tôi</h2>
            <p>Lịch sử hình thành</p>
            <p>Tầm nhìn & Sứ mệnh</p>
            <p>Điều kiện & điều khoản</p>
          </div>
          <div className='flex-col-start gap-5'>
            <h2 className='font-bold'>Liên hệ</h2>
            <div className='flex-row-between-center gap-2'>
              <IconLocation />
              <p>Địa chỉ: {footerContactData.address}</p>
            </div>
            <div className='flex-row-between-center gap-2'>
              <IconPhone />
              <p>Số điện thoại: {footerContactData.phone}</p>
            </div>
            <div className='flex-row-between-center gap-2'>
              <IconMail />
              <p>Email: {footerContactData.email}</p>
            </div>
          </div>
        </div>
        <div className='w-full py-5 flex-col-end md:flex-row border-t-2'>
          <p>Bản quyền nội dung thuộc về Công ty Metaverse Vietnam</p>
        </div>
      </div>
    </section>
  );
};

export default FooterLayoutWebsite;

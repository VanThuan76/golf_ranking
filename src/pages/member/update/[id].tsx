import * as z from 'zod';

import { bannerLogin } from 'src/shared/mocks/login';
import BlankLayout from 'src/shared/layouts/BlankLayout';
import IconLogoDark from '@/src/shared/components/icons/IconLogoDark';
import SliderFull from '@/src/shared/components/customization/SliderFull';
import { IMember, IMemberRegister } from '@/src/schemas/member.table.type';
import { useUpdateMember } from '@/src/queries/member.queries';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/src/shared/hooks/useRedux';
import React from 'react';
import { convertStringDate } from '@/src/shared/utils/business/convertStringDate';
import { getCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/src/shared/constants';
import useTrans from '@/src/shared/hooks/useTrans';
import { FormUpdateMember } from '@/src/shared/components/business/member/FormUpdateMember';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { axiosInstanceNoAuth } from '@/src/https.config';
import { IBaseResponse } from '@/src/schemas/baseResponse.type';

const formSchema = z.object({
  name: z
    .string({ required_error: 'Vui lòng nhập họ tên của bạn' })
    .min(1, { message: 'Vui lòng nhập họ tên của bạn' }),
  vjgr_code: z
    .string({ required_error: 'Vui lòng nhập mã VJGR' })
    .min(1, { message: 'Vui lòng nhập mã VJGR' }),
  gender: z.number({ required_error: 'Vui lòng chọn giới tính' }),
  email: z.string(),
  handicap_vga: z
    .string()
    .nullable()
    .refine(
      async handicapVga => {
        try {
          const checkEmail = await axiosInstanceNoAuth.post<IBaseResponse<[]>>('/check-handicap-vga-exists', {
            handicapVga,
          });
          return checkEmail && true;
        } catch (error) {
          return false;
        }
      },
      { message: 'Mã Handicap VGA đã được đăng ký.' },
    ),
  date_of_birth: z.date({ required_error: 'Vui lòng nhập ngày sinh của bạn' }),
  nationality: z
    .string({ required_error: 'Vui lòng nhập quốc gia của bạn' })
    .min(1, { message: 'Vui lòng nhập quốc gia của bạn' }),
  phone_number: z
    .string({ required_error: 'Vui lòng nhập số điện thoại của bạn' })
    .min(1, { message: 'Vui lòng nhập số điện thoại của bạn' }),
  guardian_name: z
    .string({ required_error: 'Vui lòng nhập họ tên người bảo hộ của bạn' })
    .min(1, { message: 'Vui lòng nhập họ tên người bảo hộ của bạn' }),
  relationship: z
    .string({ required_error: 'Vui lòng nhập mối quan hệ với người bảo hộ của bạn' })
    .min(1, { message: 'Vui lòng nhập mối quan hệ với người bảo hộ của bạn' }),
  guardian_email: z
    .string({ required_error: 'Vui lòng nhập email người bảo hô của bạn' })
    .min(1, { message: 'Vui lòng nhập email người bảo hô của bạn' }),
  guardian_phone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại người bảo hộ của bạn' })
    .min(1, { message: 'Vui lòng nhập số điện thoại người bảo hộ của bạn' }),
});

type Props = {
  member: IMember;
};

const UpdateMember = ({ member }: Props) => {
  const { trans } = useTrans();
  const { user } = useAppSelector(state => state.appSlice);
  const userId = getCookie(APP_SAVE_KEY.USER_ID);
  const router = useRouter();
  const doUpdateMember = useUpdateMember(member && member.id, () => router.push('/profile'));
  const defaultValues: IMemberRegister = {
    name: member?.name,
    vjgr_code: member?.vjgr_code,
    handicap_vga: member?.handicap_vga,
    gender: member?.gender === 'Nam' ? 2 : 1,
    date_of_birth: member?.date_of_birth,
    nationality: member?.nationality,
    email: member?.email,
    phone_number: member?.phone_number,
    guardian_name: member?.guardian_name,
    relationship: member?.relationship,
    guardian_email: member?.guardian_email,
    guardian_phone: String(member?.guardian_phone) || '',
  };
  function onSubmit(value: Partial<IMemberRegister>) {
    if (
      value.name &&
      value.gender &&
      value.gender &&
      value.vjgr_code &&
      value.date_of_birth &&
      value.nationality &&
      value.phone_number &&
      value.guardian_name &&
      value.relationship &&
      value.guardian_email &&
      value.guardian_phone
    ) {
      const dateOfBirth = convertStringDate(value.date_of_birth as unknown as string);
      const bodyRequest = {
        user_id: user?.user && user.user.id !== null ? user?.user.id : Number(userId),
        name: value.name,
        vjgr_code: value.vjgr_code,
        handicap_vga: value.handicap_vga,
        gender: value.gender - 1, //Fix logic
        date_of_birth: dateOfBirth,
        nationality: value.nationality,
        email: value.email,
        phone_number: value.phone_number,
        guardian_name: value.guardian_name,
        relationship: value.relationship,
        guardian_email: value.guardian_email,
        guardian_phone: value.guardian_phone,
      };
      doUpdateMember.mutate(bodyRequest);
    } else {
      console.error('Thiếu giá trị trong form cập nhật');
    }
  }
  return (
    <React.Fragment>
      <div className='w-full min-h-screen flex-col-center gap-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden'>
        <div className='hidden md:block max-w-[450px] col-span-1 mx-auto bg-transparent rounded-lg'>
          <SliderFull slides={bannerLogin} />
        </div>
        <div className='mb-4 w-full min-h-[700px] col-span-1 mx-auto'>
          <div className='w-full h-full flex-col-between-start space-y-6'>
            <IconLogoDark className='float-left' />
            <div className='font-semibold text-2xl w-full text-black'>{trans.common.updateMember}</div>
            <p>{trans.formUpdateMember.description}</p>
            <FormUpdateMember formSchema={formSchema} onSubmit={onSubmit} defaultValue={defaultValues} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
UpdateMember.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default UpdateMember;

export const getStaticProps: GetStaticProps = async ctx => {
  const id = ctx.params?.id;
  if (id) {
    try {
      const responseMember = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/first-get-register-member/${id}`);
      if (!responseMember.ok) {
        throw new Error('Failed to fetch member data');
      }
      const data = await responseMember.json();
      const member: IMember = data.data;
      return {
        props: {
          member,
        },
      };
    } catch (error) {
      return {
        props: {
          member: null,
          error: 'Failed to fetch member data',
        },
      };
    }
  } else {
    return {
      props: {},
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async _ctx => {
  return {
    paths: [],
    fallback: true,
  };
};

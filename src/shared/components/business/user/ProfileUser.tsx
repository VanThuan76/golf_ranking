import useTrans from '@/src/shared/hooks/useTrans';
import React from 'react';
import { IUser } from 'src/schemas/user.table.type';

interface Props {
  user: IUser;
}

const ProfileUser = ({ user }: Props) => {
  const {trans} = useTrans()
  if (!user) return <></>;
  return (
    <section
      id='ProfileUser'
      className='relative w-full mt-4 p-4 flex-col-between-start overflow-hidden'
    >
      <h1 className='font-semibold text-2xl'>{trans.user.userInfo}</h1>
      <div className='w-full p-12 flex-col-start gap-5 md:flex-row md:justify-between shadow-lg rounded-lg'>
        <div className='flex-col-start'>
          <p className='text-xs font-thin'>{trans.user.fullName}</p>
          <h3>{user.name}</h3>
        </div>
        <div className='flex-col-start'>
          <p className='text-xs font-thin'>Email</p>
          <h3>{user.email}</h3>
        </div>
      </div>
    </section>
  );
};

export default ProfileUser;

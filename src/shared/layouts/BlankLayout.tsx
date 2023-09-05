import React from 'react';

function BlankLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-w-screen min-h-screen m-auto dark:bg-[#141523] flex-row-center px-4 md:px-24 lg:px-32 xl:px-40'>
      {children}
    </div>
  );
}

export default BlankLayout;

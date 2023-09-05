import Head from 'next/head';
import dynamic from 'next/dynamic';

import { SearchGroupTournament } from '@/components/business/tournament/group/SearchGroupTournament';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import TableGroupTournament from '@/components/business/tournament/group/TableGroupTournament';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });
const GroupTournament = () => {
  return (
    <>
      <Head>
        <title>Hệ thống Vietnam Golf Association</title>
        <meta name='description' content='Hệ thống Vietnam Golf Association' />
        <meta name='keywords' content='Hệ thống Vietnam Golf Association' />
      </Head>
      <ScrollRevealWrapper>
        <SearchGroupTournament />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TableGroupTournament />
      </ScrollRevealWrapper>
    </>
  );
};

GroupTournament.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default GroupTournament;
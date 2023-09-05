import Head from 'next/head';
import dynamic from 'next/dynamic';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';

import { dataTable } from 'src/shared/mocks/table';
import { InformationCardDetailTournament } from '@/components/business/tournament/detail/InformationCardDetailTournament';
import TableDetailTournament from '@/components/business/tournament/detail/TableDetailTournament';

const ScrollRevealWrapper = dynamic(() => import('@/components/customization/ScrollRevealWrapper'), { ssr: false });

const DetailTournament = () => {
  return (
    <>
      <Head>
        <title>Hệ thống Vietnam Golf Association</title>
        <meta name='description' content='Hệ thống Vietnam Golf Association' />
        <meta name='keywords' content='Hệ thống Vietnam Golf Association' />
      </Head>
      <ScrollRevealWrapper>
        <InformationCardDetailTournament data={dataTable[1]} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <TableDetailTournament />
      </ScrollRevealWrapper>
    </>
  );
};

DetailTournament.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default DetailTournament;

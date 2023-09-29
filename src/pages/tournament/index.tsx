import Head from 'next/head';
import React from 'react';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';
import IntroduceCardTournament from '@/src/shared/components/business/tournament/IntroduceCardTournament';
import useTrans from '@/src/shared/hooks/useTrans';
import { TournamentGroupData } from '@/src/shared/mocks/tournament';
import useBreakpoint from '@/src/shared/hooks/useBreakpoint';
export function Tournament() {
  const { trans } = useTrans();
  const tournamentGroupDataTrans = TournamentGroupData()
  const currentBreakpoint = useBreakpoint();
  return (
    <React.Fragment>
      <Head>
        <title>{trans.tournament.title}</title>
        <meta name='description' content={trans.tournament.title} />
        <meta name='keywords' content='Golf Ranking' />
      </Head>
      <div className='mt-10 w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
        <IntroduceCardTournament className='md:max-h-[500px]' size={currentBreakpoint === "sm" ? 160 : 340} data={tournamentGroupDataTrans[0]} />
        <div className='flex-col-start gap-5'>
          {tournamentGroupDataTrans.slice(1, 3).map((item, idx) => (
            <IntroduceCardTournament key={idx} data={item} />
          ))}
        </div>
      </div>
      <div className='mt-10 w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
        {tournamentGroupDataTrans.slice(3, 5).map((item, idx) => (
          <IntroduceCardTournament key={idx} data={item} />
        ))}
      </div>
      <div className='mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-5'>
        {tournamentGroupDataTrans.slice(5, 8).map((item, idx) => (
          <IntroduceCardTournament key={idx} data={item} />
        ))}
      </div>
    </React.Fragment>
  );
}
Tournament.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Tournament;

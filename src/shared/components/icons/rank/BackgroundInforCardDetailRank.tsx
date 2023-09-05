import React, { SVGProps } from 'react';

export default function BackgroundInforCardDetailRank({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width='1120' height='256' viewBox='0 0 1120 256' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path d='M560 256H1120L840 0H560H280L560 256Z' fill='#E6EAEF' />
      <path d='M280 0H0L280 256H560L280 0Z' fill='#BFC9D9' />
      <path d='M0 0V256H280L0 0Z' fill='#97A6BF' />
      <path d='M1120 256V0H840L1120 256Z' fill='#BFC9D9' />
    </svg>
  );
}

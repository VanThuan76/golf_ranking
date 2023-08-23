import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface Props {
  countryCode: string;
}
const CountryFlag = ({ countryCode }: Props) => {
  return <ReactCountryFlag className='w-full text-3xl rounded-lg' countryCode={countryCode} svg />;
};

export default CountryFlag;
